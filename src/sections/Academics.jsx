import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const academicLevels = [
  {
    level: "01",
    title: "Nursery",
    subtitle: "The Wonder Years",
    range: "Early Childhood",
    color: "from-amber-400/20 to-yellow-300/10",
    accent: "#F59E0B",
    features: ["Activity-based learning", "Rhymes, stories & games", "Creative expression"],
  },
  {
    level: "02",
    title: "Primary School",
    subtitle: "Building Blocks",
    range: "Class I – V",
    color: "from-sky-400/20 to-blue-300/10",
    accent: "#38BDF8",
    features: ["Core academic foundation", "Curiosity-driven learning", "Interactive classroom activities"],
  },
  {
    level: "03",
    title: "Middle School",
    subtitle: "Expanding Horizons",
    range: "Class VI – VIII",
    color: "from-violet-400/20 to-purple-300/10",
    accent: "#A78BFA",
    features: ["Analytical thinking", "Reading habits", "Practical understanding"],
  },
  {
    level: "04",
    title: "Secondary",
    subtitle: "Academic Discipline",
    range: "Class IX – X",
    color: "from-emerald-400/20 to-teal-300/10",
    accent: "#34D399",
    features: ["Board exam preparation", "Strong academic discipline", "Concept-focused education"],
  },
  {
    level: "05",
    title: "Higher Secondary",
    subtitle: "Future Ready",
    range: "Class XI – XII",
    color: "from-rose-400/20 to-pink-300/10",
    accent: "#FB7185",
    features: ["Career-oriented streams", "Competitive exam support", "Advanced subject specialization"],
  },
];

const streams = [
  { name: "Science", icon: "⚗️", desc: "Physics, Chemistry, Biology & Mathematics" },
  { name: "Commerce", icon: "📊", desc: "Accounts, Economics & Business Studies" },
  { name: "Humanities", icon: "🌐", desc: "History, Political Science & Sociology" },
];

const features = [
  { icon: "🇬🇧", label: "English Medium" },
  { icon: "📐", label: "Modern Curriculum" },
  { icon: "💻", label: "Computer Education" },
  { icon: "🔬", label: "Practical Learning" },
  { icon: "🌟", label: "Character Development" },
];

export default function Academics() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineLineRef = useRef(null);
  const streamsRef = useRef([]);
  const featuresRef = useRef([]);

  useEffect(() => {
    let gsap, ScrollTrigger;

    const init = async () => {
      const gsapModule = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      const stModule = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      gsap = window.gsap;
      ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      // Left intro fade
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
        }
      );

      // Timeline line draw
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: timelineLineRef.current, start: "top 75%" },
        }
      );

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 80, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // Streams
      streamsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // Features
      featuresRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    };

    init();

    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .academics-section {
          font-family: 'DM Sans', sans-serif;
          background: #03092E;
          position: relative;
          overflow: hidden;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }

        .bg-noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .mesh-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(29,78,216,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(180,145,80,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(15,23,80,0.6) 0%, transparent 70%);
          pointer-events: none;
        }

        .gold-label {
          letter-spacing: 0.35em;
          color: #C9A84C;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .glass-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s ease, border-color 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-8px) translateX(4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.2);
        }

        .stream-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.35s ease;
        }
        .stream-card:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-4px);
        }

        .feature-pill {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .feature-pill:hover {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.3);
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid;
          background: #03092E;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 28px;
          z-index: 2;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }

        .level-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1;
          color: rgba(201,168,76,0.15);
          position: absolute;
          top: -8px;
          right: 16px;
          letter-spacing: -0.02em;
        }
      `}</style>

      <section ref={sectionRef} className="academics-section bg-noise relative py-24 lg:py-36 px-5 md:px-10 lg:px-16">
        <div className="mesh-bg" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header Row */}
          <div ref={leftRef} className="mb-20">
            <p className="gold-label mb-5">Academics</p>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end">
              <div>
                <h2 className="display-font text-4xl md:text-5xl xl:text-6xl text-white font-light leading-tight">
                  Building Strong<br />
                  <em className="text-amber-300/90">Foundations</em> For<br />
                  Future Excellence
                </h2>
              </div>
              <div>
                <div className="divider-line mb-6 hidden lg:block" />
                <p className="text-blue-200/60 text-base leading-relaxed max-w-lg">
                  The Crescent School provides a structured academic journey from Nursery to Higher Secondary with modern teaching methods, English-medium education, and a strong focus on intellectual, moral, and personal development.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {features.map((f, i) => (
                    <span
                      key={f.label}
                      ref={(el) => (featuresRef.current[i] = el)}
                      className="feature-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-blue-100/70"
                    >
                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid: Timeline */}
          <div className="grid lg:grid-cols-[1fr_3px_1fr] gap-0 lg:gap-6 mb-24">
            {/* Left column (even cards) */}
            <div className="hidden lg:flex flex-col gap-8 pt-16">
              {academicLevels.filter((_, i) => i % 2 === 0).map((lvl, i) => {
                const originalIndex = i * 2;
                return (
                  <div
                    key={lvl.level}
                    ref={(el) => (cardsRef.current[originalIndex] = el)}
                    className="glass-card rounded-2xl p-6 relative overflow-hidden cursor-default"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${lvl.color} rounded-2xl`} />
                    <span className="level-number">{lvl.level}</span>
                    <div className="relative z-10">
                      <p className="text-xs font-medium mb-1" style={{ color: lvl.accent, letterSpacing: "0.1em" }}>
                        {lvl.range}
                      </p>
                      <h3 className="display-font text-2xl text-white font-semibold mb-1">{lvl.title}</h3>
                      <p className="text-white/40 text-xs mb-4 italic">{lvl.subtitle}</p>
                      <ul className="space-y-1.5">
                        {lvl.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-blue-100/60 text-sm">
                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: lvl.accent }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center timeline line */}
            <div className="hidden lg:flex flex-col items-center py-4">
              <div
                ref={timelineLineRef}
                className="w-px flex-1 rounded-full"
                style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.5) 15%, rgba(201,168,76,0.5) 85%, transparent)" }}
              />
            </div>

            {/* Right column (odd cards) */}
            <div className="flex flex-col gap-8 lg:pt-36">
              {academicLevels.map((lvl, i) => {
                const showOnMobile = true;
                const showOnDesktop = i % 2 !== 0;
                return (
                  <div
                    key={lvl.level}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className={`${showOnDesktop ? "lg:block" : "lg:hidden"} glass-card rounded-2xl p-6 relative overflow-hidden cursor-default`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${lvl.color} rounded-2xl`} />
                    <span className="level-number">{lvl.level}</span>
                    <div className="relative z-10">
                      <p className="text-xs font-medium mb-1" style={{ color: lvl.accent, letterSpacing: "0.1em" }}>
                        {lvl.range}
                      </p>
                      <h3 className="display-font text-2xl text-white font-semibold mb-1">{lvl.title}</h3>
                      <p className="text-white/40 text-xs mb-4 italic">{lvl.subtitle}</p>
                      <ul className="space-y-1.5">
                        {lvl.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-blue-100/60 text-sm">
                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: lvl.accent }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streams Section */}
          <div className="divider-line mb-16" />
          <div className="mb-6">
            <p className="gold-label mb-3">Higher Secondary Streams</p>
            <h3 className="display-font text-3xl md:text-4xl text-white font-light">
              Choose Your <em className="text-amber-300/90">Path</em>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {streams.map((s, i) => (
              <div
                key={s.name}
                ref={(el) => (streamsRef.current[i] = el)}
                className="stream-card rounded-2xl p-7 cursor-default"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h4 className="display-font text-2xl text-white font-semibold mb-2">{s.name}</h4>
                <p className="text-blue-200/50 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <span className="text-amber-300/50 text-xs tracking-widest uppercase">Available at Crescent</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div className="mt-20 text-center">
            <div className="divider-line mb-8 max-w-xs mx-auto" />
            <p className="display-font text-xl md:text-2xl text-white/30 font-light italic">
              "Nurturing minds. Building futures. Shaping character."
            </p>
            <p className="text-amber-400/40 text-xs tracking-widest uppercase mt-3">The Crescent School</p>
          </div>

        </div>
      </section>
    </>
  );
}