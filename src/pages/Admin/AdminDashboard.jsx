import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

const categories = ["Academic", "Examination", "Holiday", "Event", "Admission"];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic",
    date: new Date().toISOString().split('T')[0],
    pinned: false
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/admin/login");
      setUser(u);
    });

    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    const unsubData = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
      setLoading(false);
    });

    return () => { unsubAuth(); unsubData(); };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "notices", editId), formData);
        setEditId(null);
      } else {
        await addDoc(collection(db, "notices"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setFormData({ title: "", description: "", category: "Academic", date: new Date().toISOString().split('T')[0], pinned: false });
    } catch (err) {
      console.error(err);
      alert("Error saving notice.");
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      date: notice.date,
      pinned: notice.pinned || false
    });
    setEditId(notice.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      await deleteDoc(doc(db, "notices", id));
    }
  };

  const handleTogglePin = async (notice) => {
     await updateDoc(doc(db, "notices", notice.id), { pinned: !notice.pinned });
  };

  const handleLogout = () => signOut(auth).then(() => navigate("/admin/login"));

  if (loading) return <div className="min-h-screen bg-[#03092E] flex items-center justify-center text-white">Authenticating...</div>;

  return (
    <div className="min-h-screen bg-[#03092E] text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
          <div>
            <h1 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Admin <em className="text-amber-400">Dashboard</em></h1>
            <p className="text-xs text-white/40 uppercase tracking-widest">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="bg-rose-500/10 text-rose-500 px-6 py-2 rounded-xl border border-rose-500/20 text-xs font-bold hover:bg-rose-500/20 transition-all">Logout</button>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          {/* Form Section */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 h-fit sticky top-24">
            <h2 className="text-xl font-medium mb-6 text-amber-400">{editId ? "Edit Notice" : "Post New Notice"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Notice Title" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
              <select 
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400 appearance-none"
                 value={formData.category}
                 onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c} className="bg-navy-900">{c}</option>)}
              </select>
              <textarea 
                placeholder="Description" 
                rows="6"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400 resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
              />
              <label className="flex items-center gap-3 cursor-pointer p-2">
                <input 
                  type="checkbox" 
                  checked={formData.pinned}
                  onChange={e => setFormData({...formData, pinned: e.target.checked})}
                />
                <span className="text-sm">Pin to Top</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-amber-400 text-navy-900 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">
                  {editId ? "Update Notice" : "Publish Notice"}
                </button>
                {editId && <button onClick={() => {setEditId(null); setFormData({title:"", description:"", category:"Academic", date: new Date().toISOString().split('T')[0], pinned:false })}} className="bg-white/10 px-6 py-3 rounded-xl text-xs uppercase font-bold">Cancel</button>}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-6">Manage History</h2>
            {notices.map(n => (
              <div key={n.id} className="bg-white/3 border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-white/20 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">{n.category}</span>
                    <span className="text-[10px] text-white/30">{new Date(n.date).toLocaleDateString()}</span>
                    {n.pinned && <span className="text-xs">📌</span>}
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-amber-200 transition-colors line-clamp-1">{n.title}</h3>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <button onClick={() => handleTogglePin(n)} className={`p-2 rounded-lg border transition-all ${n.pinned ? 'bg-amber-400/20 border-amber-400/40 text-amber-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                    📌
                  </button>
                  <button onClick={() => handleEdit(n)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(n.id)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-rose-500/60 hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/40 transition-all">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
