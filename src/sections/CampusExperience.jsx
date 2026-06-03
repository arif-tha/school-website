import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 7h10M7 11h6" />
      </svg>
    ),
    title: "Smart Classrooms",
    desc: "Interactive boards, digital tools, and connected learning environments.",
    accent: "#1E3A8A",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Science Laboratories",
    desc: "Well-equipped labs for Physics, Chemistry, and Biology experiments.",
    accent: "#1E40AF",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 4v16M2 9h6M2 14h6" />
        <circle cx="15" cy="12" r="2" />
        <path d="M19 8l-4 4 4 4" />
      </svg>
    ),
    title: "Computer Lab",
    desc: "High-speed internet, modern PCs, and coding-ready workstations.",
    accent: "#1D4ED8",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Library & Reading",
    desc: "Thousands of curated books, journals, and a peaceful reading zone.",
    accent: "#2563EB",
  },
];

const photos = [
  { bg: "from-blue-900 to-blue-700", label: "Main Building", icon: "🏛️", span: "row-span-2" },
  { bg: "from-slate-700 to-blue-800", label: "Science Wing", icon: "🔬", span: "" },
  { bg: "from-blue-800 to-indigo-700", label: "Sports Ground", icon: "⚽", span: "" },
  { bg: "from-indigo-900 to-blue-800", label: "Library Hall", icon: "📚", span: "" },
];

export default function CampusExperience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsRef = useRef([]);
  const collageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const gsapMod = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      const stMod = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const gsap = gsapMod.default || window.gsap;
      const ScrollTrigger = stMod.default || window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
          .fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.7, ease: "power3.out" },
            "-=0.2"
          )
          .fromTo(
            headingRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            paraRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            collageRef.current,
            { opacity: 0, x: 50, scale: 0.96 },
            { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            cardsRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .campus-section { font-family: 'DM Sans', sans-serif; }
        .campus-heading { font-family: 'Playfair Display', serif; }

        .glass-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.85);
          transition: transform 0.35s cubic-bezier(.23,1,.32,1), box-shadow 0.35s ease, background 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 24px 48px rgba(30,58,138,0.18);
          background: rgba(255,255,255,0.92);
        }
        .glass-card:hover .card-icon {
          transform: scale(1.15) rotate(-4deg);
          color: #1D4ED8;
        }
        .card-icon {
          transition: transform 0.3s ease, color 0.3s ease;
          color: #1E3A8A;
        }
        .photo-tile {
          transition: transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease;
          cursor: default;
        }
        .photo-tile:hover {
          transform: scale(1.04);
          box-shadow: 0 20px 40px rgba(30,58,138,0.35);
          z-index: 10;
        }
        .dot-pattern {
          background-image: radial-gradient(circle, #BFDBFE 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .stat-chip {
          transition: transform 0.25s ease;
        }
        .stat-chip:hover { transform: scale(1.05); }
      `}</style>

      <section
        ref={sectionRef}
        className="campus-section relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 lg:py-32 px-5 sm:px-8 lg:px-16"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full opacity-25 blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="dot-pattern absolute inset-0 opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* TOP ROW — text left, collage right */}
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center mb-16 lg:mb-20">
            {/* Left: text */}
            <div className="flex flex-col gap-7">
              <div ref={badgeRef} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
                  Our Campus
                </span>
              </div>

              <div ref={lineRef} className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full" />

              <h2
                ref={headingRef}
                className="campus-heading text-4xl sm:text-5xl xl:text-6xl font-bold text-blue-950 leading-[1.1]"
              >
                A Modern Campus{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-700">Built For</span>
                  <span
                    className="absolute left-0 bottom-1 w-full h-3 bg-blue-100 rounded-sm -z-0"
                    style={{ bottom: "4px" }}
                  />
                </span>{" "}
                Learning
              </h2>

              <p
                ref={paraRef}
                className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg font-light"
              >
                The Crescent School provides a vibrant and student-friendly campus with spacious classrooms,
                modern laboratories, filtered drinking water, library facilities, and an inspiring environment
                designed for academic and personal growth.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { val: "20+", label: "Classrooms" },
                  { val: "5", label: "Labs" },
                  { val: "15K+", label: "Books" },
                  { val: "100%", label: "RO Water" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="stat-chip bg-white border border-blue-100 shadow-sm rounded-xl px-5 py-3 flex flex-col items-center min-w-[80px]"
                  >
                    <span className="text-2xl font-bold text-blue-800 campus-heading">{s.val}</span>
                    <span className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo collage */}
            <div ref={collageRef} className="grid grid-cols-2 gap-3 h-[380px] sm:h-[440px]">
              {/* Tall left tile */}
              <div className="photo-tile relative rounded-2xl overflow-hidden row-span-2 bg-gradient-to-br from-blue-900 to-blue-700 shadow-xl flex flex-col justify-end p-5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="text-5xl mb-2 relative z-10">🏛️</div>
                <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Main Building</span>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>

              {/* Top-right small */}
              <div className="photo-tile relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-blue-800 shadow-lg flex flex-col justify-end p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="text-4xl mb-1 relative z-10">🔬</div>
                <span className="relative z-10 text-white text-xs font-semibold">Science Wing</span>
              </div>

              {/* Bottom-right grid of 2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="photo-tile relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-700 shadow-md flex flex-col justify-end p-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="text-2xl mb-0.5 relative z-10">⚽</div>
                  <span className="relative z-10 text-white text-[10px] font-semibold leading-tight">Sports Ground</span>
                </div>
                <div className="photo-tile relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-800 shadow-md flex flex-col justify-end p-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="text-2xl mb-0.5 relative z-10">📚</div>
                  <span className="relative z-10 text-white text-[10px] font-semibold leading-tight">Library Hall</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW — feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass-card rounded-2xl p-6 shadow-md flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="card-icon w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner">
                    {f.icon}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-blue-200" />
                </div>
                <div>
                  <h3 className="campus-heading text-blue-950 font-bold text-lg mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{f.desc}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-blue-50">
                  <button className="text-blue-700 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200">
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}