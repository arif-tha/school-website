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

  // UI-ONLY ADDITION: local flag purely to drive the premium loading skeleton.
  // Does not touch filtering/search/category logic or the Firestore query at all.
  const [loading, setLoading] = useState(true);

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
      setLoading(false); // UI-ONLY: first snapshot received, hide skeleton
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

  // UI-ONLY HELPER: determines "NEW" badge purely from the existing `date` field.
  // Purely presentational — reads data, never writes/mutates it.
  const isNew = (dateStr) => {
    const noticeDate = new Date(dateStr);
    const diffDays = (Date.now() - noticeDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <>
      {/* ============ PREMIUM VISUAL SYSTEM (styling only — zero logic here) ============ */}
      <style>{`
        /* ---------- Page shell: deep navy with layered gold glows + faint gold grid texture ---------- */
        .notices-page {
          position: relative;
          background:
            radial-gradient(1000px 560px at 12% -8%, rgba(231,200,120,0.16), transparent 60%),
            radial-gradient(800px 500px at 100% 15%, rgba(201,168,76,0.10), transparent 55%),
            radial-gradient(600px 400px at 50% 100%, rgba(201,168,76,0.05), transparent 60%),
            linear-gradient(180deg, #040A2E 0%, #03092E 40%, #050C33 100%);
          min-height: 100vh;
          color: #F4F1E8;
          overflow: hidden;
        }
        .notices-page::before {
          /* faint gold hairline grid — adds texture/depth like a fine ledger paper */
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(231,200,120,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231,200,120,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 85% 55% at 50% 0%, black 35%, transparent 85%);
          pointer-events: none;
        }
        .notices-page > * { position: relative; z-index: 1; }

        /* ---------- Header ---------- */
        .notice-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #E7C878;
          font-weight: 600;
        }
        .notice-eyebrow::before,
        .notice-eyebrow::after {
          content: "";
          width: 34px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .notice-eyebrow::after { transform: scaleX(-1); }

        .gold-divider {
          width: 84px;
          height: 2px;
          margin: 1.6rem auto 0;
          background: linear-gradient(90deg, transparent, #E7C878, #C9A84C, #E7C878, transparent);
          box-shadow: 0 0 14px rgba(201,168,76,0.55);
        }

        /* ---------- Filter pills ---------- */
        .filter-btn {
          padding: 0.62rem 1.4rem;
          border-radius: 999px;
          border: 1px solid rgba(231,200,120,0.2);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(244,241,232,0.78);
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .filter-btn:hover {
          border-color: rgba(231,200,120,0.6);
          color: #F4F1E8;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #F0D48C, #C9A84C 55%, #A9862F);
          border-color: #E7C878;
          color: #03092E;
          font-weight: 700;
          box-shadow: 0 10px 26px rgba(201,168,76,0.45), inset 0 1px 0 rgba(255,255,255,0.5);
        }

        /* ---------- Search ---------- */
        .search-wrap { position: relative; }
        .search-input {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(231,200,120,0.2);
          border-radius: 14px;
          padding: 0.9rem 1.2rem 0.9rem 2.85rem;
          width: 100%;
          color: #F4F1E8;
          outline: none;
          font-size: 0.92rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .search-input::placeholder { color: rgba(244,241,232,0.32); }
        .search-input:focus {
          border-color: #E7C878;
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 4px rgba(201,168,76,0.16);
        }
        .search-icon {
          position: absolute;
          left: 1.05rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(231,200,120,0.65);
          pointer-events: none;
        }

        /* ---------- Glassmorphism notice card — deep, jewel-like depth ---------- */
        .notice-card {
          position: relative;
          background: linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(231,200,120,0.16);
          box-shadow: 0 10px 34px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
          overflow: hidden;
        }
        .notice-card::before {
          /* gold corner sheen that sweeps in on hover */
          content: "";
          position: absolute;
          top: -60%;
          left: -25%;
          width: 75%;
          height: 150%;
          background: linear-gradient(115deg, rgba(231,200,120,0.2), transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .notice-card::after {
          /* thin luminous top accent line */
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #E7C878, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .notice-card:hover {
          transform: translateY(-7px);
          border-color: rgba(231,200,120,0.5);
          background: linear-gradient(160deg, rgba(255,255,255,0.085), rgba(255,255,255,0.02));
          box-shadow: 0 28px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(231,200,120,0.12);
        }
        .notice-card:hover::before,
        .notice-card:hover::after { opacity: 1; }

        /* pinned notice keeps a permanent gold edge + soft glow, no logic change */
        .notice-card.is-pinned {
          border-color: rgba(231,200,120,0.4);
          box-shadow: 0 10px 34px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.12);
        }

        /* ---------- Badges ---------- */
        .badge {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 0.34rem 0.72rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
        }
        .badge-new {
          background: rgba(52,199,140,0.14);
          color: #55E0AA;
          border: 1px solid rgba(52,199,140,0.35);
        }
        .badge-urgent {
          background: rgba(224,80,80,0.16);
          color: #F5867F;
          border: 1px solid rgba(224,80,80,0.4);
          animation: pulseUrgent 2.2s ease-in-out infinite;
        }
        @keyframes pulseUrgent {
          0%, 100% { box-shadow: 0 0 0 0 rgba(224,80,80,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(224,80,80,0); }
        }
        .badge-important {
          background: rgba(231,200,120,0.16);
          color: #F0D48C;
          border: 1px solid rgba(231,200,120,0.45);
        }
        .badge-category {
          background: rgba(255,255,255,0.045);
          color: rgba(244,241,232,0.72);
          border: 1px solid rgba(255,255,255,0.12);
          font-weight: 600;
        }

        /* ---------- Attachment / download button ---------- */
        .attachment-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #E7C878;
          background: rgba(231,200,120,0.07);
          border: 1px solid rgba(231,200,120,0.32);
          border-radius: 10px;
          padding: 0.55rem 1rem;
          transition: all 0.25s ease;
        }
        .attachment-btn:hover {
          background: linear-gradient(135deg, #F0D48C, #C9A84C);
          color: #03092E;
          border-color: #F0D48C;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201,168,76,0.35);
        }

        /* ---------- Date display ---------- */
        .notice-date {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #E7C878;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
        }

        /* ---------- Read details link ---------- */
        .read-more { color: rgba(231,200,120,0.6); }
        .notice-card:hover .read-more { color: #F0D48C; }
        .read-more-bar { background: rgba(255,255,255,0.18); }
        .notice-card:hover .read-more-bar { background: #E7C878; box-shadow: 0 0 10px rgba(231,200,120,0.65); }

        /* ---------- Empty state ---------- */
        .empty-state {
          border: 1px dashed rgba(231,200,120,0.28);
          border-radius: 20px;
          background: rgba(255,255,255,0.025);
        }

        /* ---------- Skeleton loading ---------- */
        .skeleton-card {
          border-radius: 20px;
          border: 1px solid rgba(231,200,120,0.14);
          background: rgba(255,255,255,0.035);
          padding: 2rem;
          overflow: hidden;
          position: relative;
        }
        .skeleton-line {
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(231,200,120,0.18) 37%, rgba(255,255,255,0.06) 63%);
          background-size: 400% 100%;
          animation: shimmer 1.6s ease infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }

        /* ---------- Fade-up + stagger entrance (plain CSS, no extra library) ---------- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }

        @media (max-width: 480px) {
          .notice-card { padding: 1.6rem !important; }
        }
      `}</style>

      <div className="notices-page pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ============ Header — refined luxury typography ============ */}
          <div className="text-center mb-16 fade-up">
            <span className="notice-eyebrow">Latest Notices</span>
            <h1
              className="text-5xl md:text-7xl mt-5 mb-4 font-light tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F4F1E8" }}
            >
              School <em style={{ color: "#E7C878", fontStyle: "italic" }}>Notice Board</em>
            </h1>
            <p className="max-w-2xl mx-auto" style={{ color: "rgba(244,241,232,0.45)" }}>
              Stay updated with the latest news, events, and academic schedules from The Crescent School.
            </p>
            <div className="gold-divider"></div>
          </div>

          {/* ============ Filters & Search (logic unchanged) ============ */}
          <div className="flex flex-col md:flex-row gap-6 justify-between mb-12 fade-up fade-up-1">
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
            <div className="md:w-80 search-wrap">
              {/* decorative search icon only, does not affect input logic */}
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search notices..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ============ Notices Grid ============ */}
          {loading ? (
            // ---------- Premium loading skeleton (UI-only, purely presentational) ----------
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="flex items-center justify-between mb-6">
                    <div className="skeleton-line" style={{ width: "35%", height: "14px" }}></div>
                    <div className="skeleton-line" style={{ width: "20%", height: "18px", borderRadius: "999px" }}></div>
                  </div>
                  <div className="skeleton-line mb-3" style={{ width: "85%", height: "22px" }}></div>
                  <div className="skeleton-line mb-6" style={{ width: "60%", height: "22px" }}></div>
                  <div className="skeleton-line mb-2" style={{ width: "100%", height: "12px" }}></div>
                  <div className="skeleton-line" style={{ width: "70%", height: "12px" }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, idx) => (
                  <Link
                    key={notice.id}
                    to={`/notices/${notice.id}`}
                    className={`notice-card flex flex-col p-8 rounded-3xl group fade-up ${notice.pinned ? 'is-pinned' : ''}`}
                    style={{ borderRadius: "20px", animationDelay: `${Math.min(idx, 6) * 0.06}s` }}
                  >
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="notice-date">
                        {/* elegant calendar icon accompanying the date */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                          <path d="M16 3V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          <path d="M8 3V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8"/>
                        </svg>
                        {new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Refined badges — only render when the underlying data supports them, nothing invented */}
                        {isNew(notice.date) && <span className="badge badge-new">New</span>}
                        {notice.urgent && <span className="badge badge-urgent">Urgent</span>}
                        {notice.important && <span className="badge badge-important">Important</span>}
                        <span className="badge badge-category">{notice.category}</span>
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-semibold group-hover:text-[#F0D48C] transition-colors duration-300 mb-4 leading-tight"
                      style={{ color: "#F4F1E8" }}
                    >
                      {notice.pinned && <span className="mr-2">📌</span>}
                      {notice.title}
                    </h3>

                    <p className="text-sm line-clamp-2 mb-6 font-light" style={{ color: "rgba(244,241,232,0.5)" }}>
                      {notice.description}
                    </p>

                    {/* Attachment / download button — only shown if an attachment URL exists on the doc */}
                    {notice.attachmentUrl && (
                      <a
                        href={notice.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="attachment-btn mb-6 self-start"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 19H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                        Download Attachment
                      </a>
                    )}

                    <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <span className="read-more text-xs font-semibold transition-colors duration-300">READ DETAILS</span>
                      <span className="read-more-bar w-8 h-[1px] group-hover:w-12 transition-all duration-300"></span>
                    </div>
                  </Link>
                ))
              ) : (
                // ---------- Improved empty state ----------
                <div className="col-span-full py-24 text-center empty-state fade-up">
                  <div className="mx-auto mb-5 flex items-center justify-center" style={{ width: "56px", height: "56px" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H15" stroke="#E7C878" strokeWidth="1.5"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" stroke="#E7C878" strokeWidth="1.5"/>
                      <path d="M8 12H16" stroke="rgba(244,241,232,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 16H13" stroke="rgba(244,241,232,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-xl font-light" style={{ color: "rgba(244,241,232,0.55)", fontFamily: "'Cormorant Garamond', serif" }}>
                    No notices found matching your criteria.
                  </p>
                  <p className="text-sm mt-2" style={{ color: "rgba(244,241,232,0.32)" }}>
                    Try adjusting your search or selecting a different category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}