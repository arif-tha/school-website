import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import Footer from "../../sections/Footer";

const categories = ["All", "Academic", "Examination", "Holiday", "Event", "Admission"];

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(
      collection(db, "notices"),
      orderBy("pinned", "desc"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
      setFilteredNotices(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = notices.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || n.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredNotices(filtered);
  }, [searchTerm, activeCategory, notices]);

  return (
    <>
      <style>{`
        .notices-page {
          background: #03092E;
          min-height: 100 screen;
          color: white;
        }
        .filter-btn {
          padding: 0.5rem 1.2rem;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.85rem;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.02);
        }
        .filter-btn.active {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #03092E;
          font-weight: 600;
        }
        .search-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.8rem 1.2rem;
          width: 100%;
          color: white;
          outline: none;
        }
        .search-input:focus {
          border-color: #C9A84C;
        }
      `}</style>

      <div className="notices-page pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl mb-4 font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              School <em className="text-amber-400">Notice Board</em>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto">Stay updated with the latest news, events, and academic schedules from The Crescent School.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-6 justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="md:w-80">
              <input 
                type="text" 
                placeholder="Search notices..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <Link 
                  key={notice.id} 
                  to={`/notices/${notice.id}`}
                  className="notice-card flex flex-col p-8 rounded-3xl group"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-400 font-bold text-sm">
                      {new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="bg-white/5 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                      {notice.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-amber-200 transition-colors mb-4 leading-tight">
                    {notice.pinned && <span className="mr-2">📌</span>}
                    {notice.title}
                  </h3>
                  <p className="text-white/30 text-sm line-clamp-2 mb-6 font-light">
                    {notice.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-amber-400/60 text-xs font-semibold group-hover:text-amber-400 transition-colors">READ DETAILS</span>
                    <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-amber-400 transition-all duration-300"></span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-white/10 text-xl font-light">No notices found matching your criteria.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
