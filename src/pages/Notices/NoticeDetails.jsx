import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Footer from "../../sections/Footer";

export default function NoticeDetails() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNotice = async () => {
      try {
        const docRef = doc(db, "notices", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNotice(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#03092E] flex items-center justify-center text-white">Loading...</div>;
  if (!notice) return <div className="min-h-screen bg-[#03092E] flex items-center justify-center text-white">Notice not found.</div>;

  return (
    <>
      <div className="bg-[#03092E] min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/notices" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
             ← Back to All Notices
          </Link>
          
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-amber-400 font-bold tracking-widest text-sm">
                {new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className="bg-white/10 px-4 py-1 rounded-full text-xs uppercase tracking-widest border border-white/10">
                {notice.category}
              </span>
              {notice.pinned && <span className="bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-xs uppercase font-bold">Pinned 📌</span>}
            </div>

            <h1 className="text-4xl md:text-6xl text-white font-light mb-12 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {notice.title}
            </h1>

            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-lg font-light whitespace-pre-wrap">
              {notice.description}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-white/30 text-xs italic">
              Posted on: {new Date(notice.createdAt?.toDate()).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
