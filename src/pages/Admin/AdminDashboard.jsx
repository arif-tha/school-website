import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Static config — unrelated to Firebase / data logic                */
/* ------------------------------------------------------------------ */

const categories = ["Academic", "Examination", "Holiday", "Event", "Admission"];

const categoryStyles = {
  Academic: "bg-blue-500/10 text-blue-300 border-blue-500/25",
  Examination: "bg-red-500/10 text-red-300 border-red-500/25",
  Admission: "bg-green-500/10 text-green-300 border-green-500/25",
  Holiday: "bg-purple-500/10 text-purple-300 border-purple-500/25",
  Event: "bg-orange-500/10 text-orange-300 border-orange-500/25",
};

const emptyForm = {
  title: "",
  description: "",
  category: "Academic",
  date: new Date().toISOString().split("T")[0],
  pinned: false,
};

/* ------------------------------------------------------------------ */
/*  Small inline icons (no extra dependency)                          */
/* ------------------------------------------------------------------ */

const Icon = {
  Notice: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6" strokeLinecap="round" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M12 17v5M8.5 3h7l.7 5.2c1.6.6 2.8 2 2.8 3.8H6c0-1.8 1.2-3.2 2.8-3.8L9.5 3Z" strokeLinejoin="round" />
    </svg>
  ),
  Today: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  Tag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M20 12.5 12.5 20a1.5 1.5 0 0 1-2.1 0L4 13.6a1.5 1.5 0 0 1 0-2.1L11.5 4H18a2 2 0 0 1 2 2v6.5Z" strokeLinejoin="round" />
      <circle cx="14.5" cy="8.5" r="1.2" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  ),
  Edit: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Logout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m16 17 5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Empty: (p) => (
    <svg viewBox="0 0 120 100" {...p}>
      <rect x="20" y="18" width="80" height="64" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M32 34h56M32 46h56M32 58h36" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="88" cy="76" r="16" fill="rgba(79,70,229,0.12)" stroke="rgba(79,70,229,0.35)" strokeWidth="1.5" />
      <path d="M81 76h14M88 69v14" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Alert: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  Spinner: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Reusable presentational pieces                                    */
/* ------------------------------------------------------------------ */

function StatCard({ icon, label, value, accent }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 flex items-center gap-4 hover:border-white/20 hover:bg-white/[0.06] transition-colors"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}22`, color: accent }}
      >
        {React.createElement(icon, { className: "w-5 h-5" })}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-semibold text-white leading-none tabular-nums">{value}</p>
        <p className="text-xs text-white/45 mt-1.5 truncate">{label}</p>
      </div>
    </motion.div>
  );
}

function FloatingField({ label, children }) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-white/50 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClasses =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/15 focus:bg-white/[0.06]";

const selectOptionClasses = "bg-[#0A2342] text-white";

function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${
        isError ? "bg-red-500/10 border-red-500/25 text-red-300" : "bg-[#0F2748]/95 border-white/10 text-white"
      }`}
    >
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
          isError ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
        }`}
      >
        {isError ? <Icon.Alert className="w-3.5 h-3.5" /> : <Icon.Check className="w-3.5 h-3.5" />}
      </span>
      <span className="text-sm font-medium">{toast.message}</span>
      <button onClick={onClose} className="ml-2 text-white/40 hover:text-white/70 text-sm">
        ✕
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form state — same shape / fields as before
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [pinningId, setPinningId] = useState(null);

  // Search / filter / sort — purely client-side, does not touch Firestore query
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [pinnedFilter, setPinnedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/admin/login");
      setUser(u);
    });

    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    const unsubData = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, [navigate]);

  const resetForm = () => {
    setEditId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editId) {
        await updateDoc(doc(db, "notices", editId), formData);
        showToast("Notice updated successfully.");
        setEditId(null);
      } else {
        await addDoc(collection(db, "notices"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        showToast("Notice published successfully.");
      }
      setFormData(emptyForm);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong while saving. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      date: notice.date,
      pinned: notice.pinned || false,
    });
    setEditId(notice.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notices", id));
      showToast("Notice deleted.");
    } catch (err) {
      console.error(err);
      showToast("Could not delete this notice. Please try again.", "error");
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleTogglePin = async (notice) => {
    setPinningId(notice.id);
    try {
      await updateDoc(doc(db, "notices", notice.id), { pinned: !notice.pinned });
      showToast(notice.pinned ? "Notice unpinned." : "Notice pinned to top.");
    } catch (err) {
      console.error(err);
      showToast("Could not update pin status.", "error");
    } finally {
      setPinningId(null);
    }
  };

  const handleLogout = () => signOut(auth).then(() => navigate("/admin/login"));

  /* -------------------------- derived data ------------------------- */

  const todayStr = new Date().toISOString().split("T")[0];

  const stats = useMemo(
    () => ({
      total: notices.length,
      pinned: notices.filter((n) => n.pinned).length,
      today: notices.filter((n) => n.date === todayStr).length,
      categories: categories.length,
    }),
    [notices, todayStr]
  );

  const filteredNotices = useMemo(() => {
    let list = [...notices];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((n) => n.title?.toLowerCase().includes(term));
    }
    if (categoryFilter !== "All") {
      list = list.filter((n) => n.category === categoryFilter);
    }
    if (pinnedFilter === "Pinned") {
      list = list.filter((n) => n.pinned);
    } else if (pinnedFilter === "Unpinned") {
      list = list.filter((n) => !n.pinned);
    }

    list.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    // pinned notices float to top, regardless of sort order
    list.sort((a, b) => (b.pinned === true) - (a.pinned === true));

    return list;
  }, [notices, searchTerm, categoryFilter, pinnedFilter, sortOrder]);

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  /* ------------------------------ render ----------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1424] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <Icon.Spinner className="w-7 h-7 animate-spin" />
          <p className="text-sm text-white/50">Authenticating…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1424] bg-[radial-gradient(ellipse_at_top,_rgba(29,78,216,0.10),_transparent_60%)]">
      {/* Toast stack */}
      <div className="fixed top-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm">
        <AnimatePresence>
          {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
        </AnimatePresence>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* NOTE: this header is intentionally NOT position:sticky/fixed.     */}
      {/* If your app already renders a global site navbar above every     */}
      {/* route (including /admin/dashboard), a sticky header here will    */}
      {/* stack/overlap with it. Keeping this static avoids that collision */}
      {/* regardless of your router/layout setup. If you want this header  */}
      {/* pinned to the very top instead, the real fix is to render        */}
      {/* AdminDashboard OUTSIDE your public site layout (i.e. don't wrap   */}
      {/* /admin/* routes with the public <Navbar />).                     */}
      {/* ---------------------------------------------------------------- */}
      <header className="bg-[#0A2342] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-[#C9A84C] font-serif text-lg leading-none">C</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">The Crescent School</p>
              <p className="text-xs text-white/45 truncate">Admin Dashboard</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-right">
            <div>
              <p className="text-xs text-white/35">Signed in as</p>
              <p className="text-sm font-medium text-white truncate max-w-[200px]">{user?.email}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-xs text-white/35">Today</p>
              <p className="text-sm font-medium text-white">{todayLabel}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 transition-colors shrink-0"
          >
            <Icon.Logout className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ------------------------- Stat cards ------------------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Icon.Notice} label="Total Notices" value={stats.total} accent="#60A5FA" />
          <StatCard icon={Icon.Pin} label="Pinned Notices" value={stats.pinned} accent="#C9A84C" />
          <StatCard icon={Icon.Today} label="Today's Notices" value={stats.today} accent="#818CF8" />
          <StatCard icon={Icon.Tag} label="Categories" value={stats.categories} accent="#34D399" />
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 items-start">
          {/* --------------------------- Form card -------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white/[0.04] rounded-2xl border border-white/10 p-6"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white">
                {editId ? "Edit Notice" : "Post New Notice"}
              </h2>
              <p className="text-xs text-white/45 mt-0.5">
                {editId ? "Update the details below and save your changes." : "Fill in the details to publish a new notice."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingField label="Notice Title">
                <input
                  type="text"
                  placeholder="e.g. Mid-term Examination Schedule"
                  className={inputClasses}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </FloatingField>

              <FloatingField label="Category">
                <select
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className={selectOptionClasses}>
                      {c}
                    </option>
                  ))}
                </select>
              </FloatingField>

              <FloatingField label="Description">
                <textarea
                  placeholder="Write the notice details here…"
                  rows="6"
                  className={`${inputClasses} resize-none`}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </FloatingField>

              <FloatingField label="Date">
                <input
                  type="date"
                  className={`${inputClasses} [color-scheme:dark]`}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </FloatingField>

              <label className="flex items-center gap-3 cursor-pointer select-none px-1 py-1">
                <span className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={formData.pinned}
                    onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                  />
                  <span className="w-5 h-5 rounded-md border-2 border-white/20 flex items-center justify-center transition-colors peer-checked:bg-[#C9A84C] peer-checked:border-[#C9A84C]">
                    {formData.pinned && <Icon.Check className="w-3.5 h-3.5 text-[#0A2342]" />}
                  </span>
                </span>
                <span className="text-sm text-white font-medium">Pin to top</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1D4ED8] to-[#4F46E5] text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-[#1D4ED8]/20 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Icon.Spinner className="w-4 h-4 animate-spin" />
                      {editId ? "Updating…" : "Publishing…"}
                    </>
                  ) : editId ? (
                    "Update Notice"
                  ) : (
                    "Publish Notice"
                  )}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-white/[0.04] border border-white/10 text-white/70 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* ----------------------- Notice management ---------------------- */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Manage Notices <span className="text-white/35 font-normal">({filteredNotices.length})</span>
              </h2>
            </div>

            {/* Search & filters */}
            <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-4 mb-5 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Icon.Search className="w-4 h-4 text-white/35 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/15 transition-all"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#1D4ED8] cursor-pointer"
              >
                <option value="All" className={selectOptionClasses}>All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c} className={selectOptionClasses}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={pinnedFilter}
                onChange={(e) => setPinnedFilter(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#1D4ED8] cursor-pointer"
              >
                <option value="All" className={selectOptionClasses}>All Notices</option>
                <option value="Pinned" className={selectOptionClasses}>Pinned Only</option>
                <option value="Unpinned" className={selectOptionClasses}>Unpinned Only</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#1D4ED8] cursor-pointer"
              >
                <option value="newest" className={selectOptionClasses}>Newest First</option>
                <option value="oldest" className={selectOptionClasses}>Oldest First</option>
              </select>
            </div>

            {/* Notice list */}
            {filteredNotices.length === 0 ? (
              <div className="bg-white/[0.04] rounded-2xl border border-white/10 py-16 flex flex-col items-center justify-center text-center">
                <Icon.Empty className="w-28 h-24 mb-4" />
                <p className="text-sm font-medium text-white">No notices available.</p>
                <p className="text-xs text-white/40 mt-1">
                  {notices.length === 0
                    ? "Published notices will appear here."
                    : "Try adjusting your search or filters."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {filteredNotices.map((n) => (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25 }}
                      className={`group rounded-2xl border p-5 transition-colors ${
                        n.pinned
                          ? "border-[#C9A84C]/40 bg-[#C9A84C]/[0.06] hover:border-[#C9A84C]/60"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      {n.pinned && (
                        <div className="flex items-center gap-1.5 text-[#C9A84C] text-[11px] font-semibold uppercase tracking-wide mb-2">
                          <Icon.Pin className="w-3.5 h-3.5" />
                          Featured Notice
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${categoryStyles[n.category] || "bg-white/5 text-white/60 border-white/15"}`}
                            >
                              {n.category}
                            </span>
                            <span className="text-xs text-white/35">
                              {n.date ? new Date(n.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}
                            </span>
                          </div>
                          <h3 className="text-[15px] font-semibold text-white mb-1 truncate">{n.title}</h3>
                          <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{n.description}</p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                          <button
                            onClick={() => handleTogglePin(n)}
                            disabled={pinningId === n.id}
                            title={n.pinned ? "Unpin notice" : "Pin notice"}
                            className={`p-2 rounded-lg border transition-colors disabled:opacity-50 ${
                              n.pinned
                                ? "bg-[#C9A84C]/15 border-[#C9A84C]/40 text-[#C9A84C]"
                                : "bg-white/[0.03] border-white/10 text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10"
                            }`}
                          >
                            {pinningId === n.id ? (
                              <Icon.Spinner className="w-4 h-4 animate-spin" />
                            ) : (
                              <Icon.Pin className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(n)}
                            title="Edit notice"
                            className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-white/40 hover:text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/10 transition-colors"
                          >
                            <Icon.Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPendingDeleteId(n.id)}
                            title="Delete notice"
                            className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-white/40 hover:text-red-300 hover:border-red-400/40 hover:bg-red-500/10 transition-colors"
                          >
                            <Icon.Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --------------------- Delete confirmation modal -------------------- */}
      <AnimatePresence>
        {pendingDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setPendingDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F2748] rounded-2xl shadow-xl border border-white/10 p-6 w-full max-w-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-300 flex items-center justify-center mb-4">
                <Icon.Trash className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Delete this notice?</h3>
              <p className="text-sm text-white/50 mb-6">
                This action can't be undone. The notice will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPendingDeleteId(null)}
                  className="flex-1 bg-white/[0.04] border border-white/10 text-white/70 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(pendingDeleteId)}
                  className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}