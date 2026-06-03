import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 20, suffix: "+", label: "Years Legacy" },
  { value: 5000, suffix: "+", label: "Students" },
  { value: 100, suffix: "+", label: "Faculty" },
  { value: null, suffix: "", label: "Modern Campus" },
];

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Academic Excellence",
    desc: "Modern curriculum with strong conceptual learning and competitive preparation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Character Building",
    desc: "We nurture discipline, integrity, confidence, and positive values in students.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Inclusive Education",
    desc: "Providing quality education opportunities for every section of society.",
  },
];

function useCountUp(ref, target, duration = 1800) {
  useEffect(() => {
    if (target === null) return;
    let start = null;
    let frame;
    const el = ref.current;
    if (!el) return;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) frame = requestAnimationFrame(step);
      else el.textContent = target;
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);
}

function StatItem({ stat, triggered }) {
  const numRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (triggered && !startedRef.current && stat.value !== null) {
      startedRef.current = true;
      let start = null;
      let frame;
      const el = numRef.current;
      if (!el) return;
      const duration = 1800;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * stat.value);
        if (progress < 1) frame = requestAnimationFrame(step);
        else el.textContent = stat.value;
      };
      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
    }
  }, [triggered]);

  return (
    <div className="stat-item flex flex-col items-center md:items-start">
      <div className="flex items-baseline gap-0.5">
        {stat.value !== null ? (
          <>
            <span
              ref={numRef}
              className="text-4xl md:text-5xl font-bold leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E" }}
            >
              0
            </span>
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E" }}
            >
              {stat.suffix}
            </span>
          </>
        ) : (
          <span
            className="text-3xl md:text-4xl font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E" }}
          >
            ★
          </span>
        )}
      </div>
      <span
        className="text-xs mt-1 tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em" }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const dividerRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRowRef = useRef(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, x: -40, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.12 },
        {
          scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top 80%", once: true },
        }
      );

      // Label
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%", once: true },
        }
      );

      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      // Divider
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: dividerRef.current, start: "top 88%", once: true },
        }
      );

      // Paragraph
      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: paraRef.current, start: "top 88%", once: true },
        }
      );

      // Cards stagger
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // Stats trigger
      ScrollTrigger.create({
        trigger: statsRowRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => setStatsTriggered(true),
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Proper useState via hook (needs real React)
  const [triggered, setTriggered] = globalThis.__aboutStatsTriggered
    ? [globalThis.__aboutStatsTriggered, () => {}]
    : [false, () => {}];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #about-section {
          --gold: #C9A96E;
          --gold-dim: rgba(201,169,110,0.15);
          --gold-border: rgba(201,169,110,0.25);
          --bg: #0c0b0e;
          --bg2: #111018;
          --text: rgba(255,255,255,0.82);
          --text-dim: rgba(255,255,255,0.42);
          background: var(--bg);
        }

        .about-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(201,169,110,0.14);
          transition: border-color 0.35s ease, transform 0.35s ease, background 0.35s ease;
          cursor: default;
        }
        .about-card:hover {
          border-color: rgba(201,169,110,0.42);
          background: linear-gradient(135deg, rgba(201,169,110,0.07) 0%, rgba(255,255,255,0.02) 100%);
          transform: translateY(-4px);
        }
        .about-card:hover .card-icon-wrap {
          background: rgba(201,169,110,0.18);
          border-color: rgba(201,169,110,0.5);
        }
        .card-icon-wrap {
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.28);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .about-image-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(201,169,110,0.4) 0%, transparent 50%, rgba(201,169,110,0.15) 100%);
          border-radius: inherit;
          z-index: 0;
        }

        .gold-line {
          background: linear-gradient(to right, #C9A96E, rgba(201,169,110,0.3));
          height: 2px;
          transform-origin: left;
        }

        .stat-item {
          position: relative;
        }
        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(201,169,110,0.18);
        }

        @media (max-width: 768px) {
          .stat-item:not(:last-child)::after { display: none; }
        }
      `}</style>

      <section
        id="about-section"
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 50%, rgba(201,169,110,0.04) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 85% 20%, rgba(201,169,110,0.03) 0%, transparent 60%)`,
          }}
        />
        {/* Corner ornament */}
        <div
          className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "1px solid rgba(201,169,110,0.2)",
            borderLeft: "1px solid rgba(201,169,110,0.2)",
          }}
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
          style={{
            borderBottom: "1px solid rgba(201,169,110,0.2)",
            borderRight: "1px solid rgba(201,169,110,0.2)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Image */}
            <div ref={imageWrapRef} className="relative about-image-frame rounded-2xl" style={{ opacity: 0 }}>
              <div className="relative z-10 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <div
                  ref={imageInnerRef}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `
                      linear-gradient(160deg, #1a1208 0%, #0f0c06 30%, #1c1610 60%, #0d0b07 100%)
                    `,
                  }}
                >
                  {/* Architectural illustration */}
                  <svg viewBox="0 0 480 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {/* Sky gradient */}
                    <defs>
                      <radialGradient id="skyGrad" cx="50%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#2a1e08" />
                        <stop offset="100%" stopColor="#080604" />
                      </radialGradient>
                      <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e1608" />
                        <stop offset="100%" stopColor="#0d0a04" />
                      </linearGradient>
                      <radialGradient id="glowGrad" cx="50%" cy="40%" r="40%">
                        <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    <rect width="480" height="600" fill="url(#skyGrad)" />
                    <rect width="480" height="600" fill="url(#glowGrad)" />
                    {/* Main building */}
                    <rect x="80" y="220" width="320" height="380" fill="url(#wallGrad)" />
                    {/* Columns */}
                    {[120, 180, 240, 300, 360].map((x, i) => (
                      <rect key={i} x={x} y="200" width="18" height="400" fill="#1a1208" rx="3" />
                    ))}
                    {/* Pediment */}
                    <polygon points="70,220 240,120 410,220" fill="#1c1508" stroke="#2a1e08" strokeWidth="2" />
                    {/* Entablature */}
                    <rect x="70" y="210" width="340" height="20" fill="#251c0a" />
                    {/* Steps */}
                    <rect x="60" y="590" width="360" height="10" fill="#1a1208" />
                    <rect x="70" y="582" width="340" height="10" fill="#1c1508" />
                    <rect x="80" y="574" width="320" height="10" fill="#201808" />
                    {/* Windows */}
                    {[100, 175, 250, 325].map((x) =>
                      [270, 350, 430].map((y, j) => (
                        <rect key={`${x}-${y}`} x={x} y={y} width="40" height="55"
                          fill={j === 0 ? "#1e1608" : "#160f04"} stroke="#2a1e08" strokeWidth="1" rx="2"
                        />
                      ))
                    )}
                    {/* Door */}
                    <rect x="200" y="480" width="80" height="120" fill="#120e04" stroke="#2a1e0a" strokeWidth="1.5" rx="2" />
                    <ellipse cx="240" cy="480" rx="40" ry="20" fill="#120e04" stroke="#2a1e0a" strokeWidth="1.5" />
                    {/* Golden shimmer overlay */}
                    <rect width="480" height="600" fill="rgba(201,169,110,0.03)" />
                  </svg>

                  {/* Overlay gradient at bottom */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(8,6,3,0.7) 0%, transparent 50%)",
                  }} />
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-4 md:-right-6 z-20 rounded-xl px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, #1a1508, #100d04)",
                  border: "1px solid rgba(201,169,110,0.35)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A96E", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>
                  2002
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>
                  Est.
                </p>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="flex flex-col gap-6">

              {/* Label */}
              <div ref={labelRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
                <div className="w-6 h-px" style={{ background: "#C9A96E" }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  fontWeight: 500,
                }}>
                  About The School
                </span>
              </div>

              {/* Heading */}
              <h2
                ref={headingRef}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#f5efe0",
                  opacity: 0,
                }}
              >
                A Legacy of Learning<br />
                <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 400 }}>Since 2002</em>
              </h2>

              {/* Gold divider */}
              <div ref={dividerRef} className="gold-line w-16" style={{ opacity: 0 }} />

              {/* Paragraph */}
              <p
                ref={paraRef}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 300,
                  opacity: 0,
                }}
              >
                The Crescent School was founded with a vision to provide quality education in a disciplined and inspiring environment. Managed by The Crescent Charitable Trust, the institution is committed to academic excellence, moral values, and inclusive learning for every student.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 gap-3 mt-1">
                {CARDS.map((card, i) => (
                  <div
                    key={i}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="about-card rounded-xl p-4 flex items-start gap-4"
                    style={{ opacity: 0 }}
                  >
                    <div
                      className="card-icon-wrap flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ color: "#C9A96E" }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "#f0e8d5",
                        marginBottom: "3px",
                      }}>
                        {card.title}
                      </h3>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.42)",
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div
                ref={statsRowRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 pt-6"
                style={{ borderTop: "1px solid rgba(201,169,110,0.14)" }}
              >
                {STATS.map((stat, i) => (
                  <StatItemInner key={i} stat={stat} statsRowRef={statsRowRef} />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Self-contained stat counter that triggers on scroll
function StatItemInner({ stat, statsRowRef }) {
  const numRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (stat.value === null) return;

    const st = ScrollTrigger.create({
      trigger: statsRowRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const el = numRef.current;
        if (!el) return;
        gsap.fromTo(
          { val: 0 },
          { val: stat.value, duration: 1.8, ease: "power3.out",
            onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
            onComplete: function() { el.textContent = stat.value; }
          }
        );
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="flex flex-col items-center md:items-start py-2">
      <div className="flex items-baseline gap-0.5">
        {stat.value !== null ? (
          <>
            <span
              ref={numRef}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, lineHeight: 1 }}
            >
              0
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>
              {stat.suffix}
            </span>
          </>
        ) : (
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#C9A96E", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}>
            ✦
          </span>
        )}
      </div>
      <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "4px", fontFamily: "'DM Sans', sans-serif" }}>
        {stat.label}
      </span>
    </div>
  );
}