import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NoticeSection() {
  const [notices, setNotices] = useState([]);
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Real-time listener for latest 5 notices
    const q = query(
      collection(db, "notices"),
      orderBy("date", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
    });

    // GSAP Animation
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 1, 
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } 
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <style>{`
        .notice-section {
          background: #03092E;
          position: relative;
        }
        .notice-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .notice-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: #C9A84C;
          transform: translateX(10px);
        }
        .notice-date {
          color: #C9A84C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .notice-tag {
          font-size: 0.65rem;
          padding: 2px 8px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      <section ref={sectionRef} className="notice-section py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-bold">Announcements</span>
              <h2 className="text-4xl md:text-5xl text-white font-light mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Notice Board
              </h2>
            </div>
            <Link to="/notices" className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
              View All Notices →
            </Link>
          </div>

          <div ref={listRef} className="space-y-4">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <Link 
                  key={notice.id} 
                  to={`/notices/${notice.id}`}
                  className="notice-card flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="notice-date">{new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                       <span className="notice-tag text-white/40">{notice.category}</span>
                       {notice.pinned && <span className="text-amber-400">📌</span>}
                    </div>
                    <h3 className="text-xl text-white font-medium group-hover:text-amber-200 transition-colors">
                      {notice.title}
                    </h3>
                  </div>
                  <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-amber-400">Read More →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-10 text-center text-white/20">Loading latest notices...</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
