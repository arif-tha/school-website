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

  // ============ Shared premium visual system (styling only — same palette as Notices list) ============
  const PremiumStyles = () => (
    <style>{`
      .notice-details-page {
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
      .notice-details-page::before {
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
      .notice-details-page > * { position: relative; z-index: 1; }

      /* ---------- Back link ---------- */
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #E7C878;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        transition: all 0.25s ease;
      }
      .back-link:hover {
        color: #F0D48C;
        gap: 0.75rem;
      }

      /* ---------- Glass content card ---------- */
      .notice-detail-card {
        position: relative;
        background: linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(231,200,120,0.16);
        box-shadow: 0 14px 44px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
        overflow: hidden;
      }
      .notice-detail-card::after {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #E7C878, transparent);
      }

      /* ---------- Badges (match list page) ---------- */
      .badge {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        white-space: nowrap;
      }
      .badge-category {
        background: rgba(255,255,255,0.045);
        color: rgba(244,241,232,0.75);
        border: 1px solid rgba(255,255,255,0.14);
        font-weight: 600;
      }
      .badge-pinned {
        background: rgba(231,200,120,0.16);
        color: #F0D48C;
        border: 1px solid rgba(231,200,120,0.45);
      }
      .notice-date {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #E7C878;
        font-weight: 700;
        font-size: 0.82rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      /* ---------- Body text ---------- */
      .notice-body {
        color: rgba(244,241,232,0.75);
      }

      /* ---------- Footer meta line ---------- */
      .posted-meta {
        color: rgba(244,241,232,0.32);
      }

      /* ---------- Fade-up entrance (plain CSS, no extra library) ---------- */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.6s ease both; }
      .fade-up-1 { animation-delay: 0.08s; }

      /* ---------- Premium loading skeleton ---------- */
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

      @media (max-width: 480px) {
        .notice-detail-card { padding: 2rem !important; border-radius: 24px !important; }
      }
    `}</style>
  );

  if (loading) {
    return (
      <>
        <PremiumStyles />
        {/* ---------- Premium loading skeleton (replaces plain "Loading..." text, same loading state/logic) ---------- */}
        <div className="notice-details-page pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="skeleton-line mb-8" style={{ width: "160px", height: "16px" }}></div>
            <div className="notice-detail-card rounded-[2.5rem] p-8 md:p-16">
              <div className="flex gap-4 mb-8">
                <div className="skeleton-line" style={{ width: "140px", height: "18px" }}></div>
                <div className="skeleton-line" style={{ width: "100px", height: "18px", borderRadius: "999px" }}></div>
              </div>
              <div className="skeleton-line mb-4" style={{ width: "90%", height: "38px" }}></div>
              <div className="skeleton-line mb-10" style={{ width: "60%", height: "38px" }}></div>
              <div className="skeleton-line mb-3" style={{ width: "100%", height: "14px" }}></div>
              <div className="skeleton-line mb-3" style={{ width: "95%", height: "14px" }}></div>
              <div className="skeleton-line" style={{ width: "80%", height: "14px" }}></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!notice) {
    return (
      <>
        <PremiumStyles />
        {/* ---------- Refined "not found" state ---------- */}
        <div className="notice-details-page min-h-screen flex items-center justify-center px-6">
          <div className="text-center fade-up">
            <div className="mx-auto mb-6 flex items-center justify-center" style={{ width: "56px", height: "56px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#E7C878" strokeWidth="1.5"/>
                <path d="M9.5 9.5L14.5 14.5" stroke="rgba(244,241,232,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14.5 9.5L9.5 14.5" stroke="rgba(244,241,232,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p
              className="text-2xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F4F1E8" }}
            >
              Notice not found.
            </p>
            <Link to="/notices" className="back-link justify-center">
              ← Back to All Notices
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PremiumStyles />
      <div className="notice-details-page min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/notices" className="back-link mb-8 fade-up">
            ← Back to All Notices
          </Link>

          <div className="notice-detail-card rounded-[2.5rem] p-8 md:p-16 fade-up fade-up-1">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="notice-date">
                {/* elegant calendar icon accompanying the date, purely decorative */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M16 3V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 3V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                {new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className="badge badge-category">{notice.category}</span>
              {notice.pinned && <span className="badge badge-pinned">Pinned 📌</span>}
            </div>

            <h1
              className="text-4xl md:text-6xl font-light mb-12 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F4F1E8" }}
            >
              {notice.title}
            </h1>

            <div className="notice-body prose prose-invert max-w-none leading-relaxed text-lg font-light whitespace-pre-wrap">
              {notice.description}
            </div>

            <div className="mt-16 pt-8 posted-meta text-xs italic" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              Posted on: {new Date(notice.createdAt?.toDate()).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}