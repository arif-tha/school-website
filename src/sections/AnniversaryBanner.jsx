import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── APNI IMAGE KA PATH YAHAN CHANGE KARO ─────────────────────────────────
import schoolImage from "../assets/anniversary.jpeg";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 25, suffix: "+",        label: "Years of Excellence" },
  { value: 5, suffix: "K+",       label: "Students Shaped"     },
  { value: 3,  suffix: " Streams", label: "Academic Pathways"   },
  { value: 100, suffix: "%",        label: "Board Pass Rate"     },
];

export default function AnniversaryBanner() {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const paraRef     = useRef(null);
  const btnRef      = useRef(null);
  const imageRef    = useRef(null);
  const ghostRef    = useRef(null);
  const statRefs    = useRef([null, null, null, null]);
  const counterRefs = useRef([null, null, null, null]);

  useEffect(() => {
    const allStats = statRefs.current.filter(Boolean);
    if (allStats.length === 0) return;

    const ctx = gsap.context(() => {

      // ── initial states ─────────────────────────────────────────────
      gsap.set(
        [tagRef.current, headingRef.current, subRef.current,
         paraRef.current, btnRef.current],
        { autoAlpha: 0, y: 36 }
      );
      gsap.set(allStats,         { autoAlpha: 0, y: 28, scale: 0.94 });
      gsap.set(imageRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(ghostRef.current, { autoAlpha: 0, x: 40 });

      const stConfig = { trigger: sectionRef.current, start: "top 72%", once: true };

      // ghost
      gsap.to(ghostRef.current, { autoAlpha: 1, x: 0, duration: 1.4, ease: "power3.out", scrollTrigger: stConfig });

      // text stagger
      gsap.to(
        [tagRef.current, headingRef.current, subRef.current, paraRef.current, btnRef.current],
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.13, ease: "power3.out", scrollTrigger: stConfig }
      );

      // stat cards
      gsap.to(allStats, {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 0.65, stagger: 0.1, ease: "back.out(1.4)", delay: 0.3,
        scrollTrigger: stConfig,
      });

      // image — fade + slide up
      gsap.to(imageRef.current, {
        autoAlpha: 1, y: 0,
        duration: 1.1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: imageRef.current, start: "top 85%", once: true },
      });

      // counters
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        gsap.to({ val: 0 }, {
          val: stat.value,
          duration: 2.0,
          ease: "power2.out",
          delay: 0.5 + i * 0.12,
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val); },
          scrollTrigger: stConfig,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        .ann-section {
          background: #F8F7F4;
          position: relative;
          overflow: hidden;
          padding: 5rem clamp(1.5rem, 6vw, 7rem) 5rem;
          font-family: 'Inter', sans-serif;
        }
        .ann-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .ann-section::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #C9A84C 40%, #E8C96A 60%, transparent);
        }

        /* ghost number — behind everything */
        .ann-ghost {
          position: absolute; right: -2rem; top: 40%;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12rem, 20vw, 20rem);
          font-weight: 700; line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(11,29,58,0.055);
          pointer-events: none; user-select: none; z-index: 0;
        }
        @media (max-width: 600px) { .ann-ghost { display: none; } }

        /* ── wrapper: stacked layout ── */
        .ann-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          position: relative; z-index: 1;
        }

        /* ── TEXT + STATS ROW ── */
        .ann-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 800px) {
          .ann-top { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* tag */
        .ann-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(201,168,76,0.10);
          border: 1px solid rgba(201,168,76,0.35);
          color: #8B6914;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.35rem 1rem; border-radius: 2px;
          margin-bottom: 1.4rem;
        }
        .ann-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%; background: #C9A84C; flex-shrink: 0;
        }

        /* heading */
        .ann-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          font-weight: 600; line-height: 1.12;
          color: #0B1D3A; margin: 0 0 0.9rem;
        }
        .ann-heading em { font-style: italic; color: #C9A84C; }

        .ann-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          margin: 0 0 1.1rem; border-radius: 2px;
        }
        .ann-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.12rem; font-style: italic;
          color: #3A5278; margin: 0 0 1rem; line-height: 1.5;
        }
        .ann-para {
          font-size: 0.9rem; line-height: 1.82;
          color: #4A5568; margin: 0 0 2rem;
        }
        .ann-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #0B1D3A; color: #F8F6F1;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.82rem 1.9rem;
          border: none; border-radius: 3px; cursor: pointer;
          transition: background .3s, transform .2s;
        }
        .ann-btn:hover { background: #162D55; transform: translateY(-1px); }
        .ann-btn-arrow { transition: transform .25s; }
        .ann-btn:hover .ann-btn-arrow { transform: translateX(4px); }

        /* stats grid */
        .ann-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          align-content: start;
        }
        .ann-stat-card {
          background: #fff;
          border: 1px solid rgba(11,29,58,0.08);
          border-radius: 10px; padding: 1rem 1.1rem;
          position: relative; overflow: hidden;
          transition: border-color .25s, box-shadow .25s;
        }
        .ann-stat-card:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 4px 20px rgba(201,168,76,0.10);
        }
        .ann-stat-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; width: 3px; height: 100%;
          background: linear-gradient(180deg, #C9A84C, transparent);
          border-radius: 10px 0 0 10px;
        }
        .ann-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: #0B1D3A; line-height: 1; margin-bottom: 0.22rem;
        }
        .ann-stat-suffix { font-size: 1rem; color: #C9A84C; font-weight: 600; }
        .ann-stat-label {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: #718096;
        }

        /* ── IMAGE AREA ──
           Exact ratio: 1456 × 720 = 1456/720 ≈ 2.022
           Using padding-top trick for perfect ratio on all screens
        */
        .ann-image-wrap {
          position: relative;
          width: 100%;
          /* 720/1456 * 100 = 49.45% — locks height to exact image ratio */
          padding-top: 49.45%;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 32px 64px rgba(11,29,58,0.14),
            0 8px 24px rgba(11,29,58,0.08);
        }

        /* gold corner accents */
        .ann-image-wrap::before,
        .ann-image-wrap::after {
          content: '';
          position: absolute;
          width: 36px; height: 36px;
          z-index: 3; pointer-events: none;
        }
        .ann-image-wrap::before {
          top: 14px; left: 14px;
          border-top: 2px solid #C9A84C;
          border-left: 2px solid #C9A84C;
          border-radius: 4px 0 0 0;
        }
        .ann-image-wrap::after {
          bottom: 14px; right: 14px;
          border-bottom: 2px solid #C9A84C;
          border-right: 2px solid #C9A84C;
          border-radius: 0 0 4px 0;
        }

        /* the actual image — fills wrapper absolutely */
        .ann-image-wrap img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* subtle vignette on image edges */
        .ann-image-vignette {
          position: absolute;
          inset: 0; z-index: 1;
          background:
            linear-gradient(to right,  rgba(5,12,30,0.18) 0%, transparent 15%,
                                       transparent 85%, rgba(5,12,30,0.18) 100%),
            linear-gradient(to bottom, rgba(5,12,30,0.10) 0%, transparent 20%,
                                       transparent 80%, rgba(5,12,30,0.25) 100%);
          pointer-events: none;
        }

        /* year badge — bottom right over image */
        .ann-year-badge {
          position: absolute;
          bottom: 0; right: 0; z-index: 2;
          background: linear-gradient(135deg, #C9A84C, #E8C96A);
          color: #0B1D3A;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em;
          padding: 0.6rem 1.4rem;
          border-radius: 14px 0 14px 0;
        }
      `}</style>

      <section ref={sectionRef} className="ann-section">

        {/* ghost "25" */}
        <div ref={ghostRef} className="ann-ghost" aria-hidden="true">25</div>

        <div className="ann-inner">

          {/* ── TOP: text left + stats right ── */}
          <div className="ann-top">

            {/* LEFT — text + button */}
            <div>
              <div ref={tagRef} className="ann-tag">
                <span className="ann-tag-dot" />
                25 Years of Excellence
              </div>

              <h2 ref={headingRef} className="ann-heading">
                Celebrating <em>25&nbsp;Years</em> of<br />
                The Crescent School
              </h2>

              <div className="ann-divider" />

              <p ref={subRef} className="ann-sub">
                A legacy of learning, discipline, and enduring excellence.
              </p>

              <p ref={paraRef} className="ann-para">
                Since 2002, The Crescent School has nurtured thousands of young
                minds across Kolkata — building character, instilling discipline,
                and unlocking potential. From Nursery to Higher Secondary, our
                journey is one of relentless commitment to every child who walks
                through our gates and every family that trusts us with their future.
              </p>

              
            </div>

            {/* RIGHT — 4 stat cards */}
            <div className="ann-stats">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="ann-stat-card"
                >
                  <div className="ann-stat-value">
                    <span ref={(el) => { counterRefs.current[i] = el; }}>
                      {stat.value}
                    </span>
                    <span className="ann-stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="ann-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* ── BOTTOM: full-width image — exact 1456:720 ratio ── */}
          <div ref={imageRef} className="ann-image-wrap">

            {/* real image */}
            <img
              src={schoolImage}
              alt="The Crescent School — 25 Glorious Years"
            />

            {/* edge vignette */}
            <div className="ann-image-vignette" />

            {/* gold year badge */}
            <div className="ann-year-badge"></div>

          </div>

        </div>
      </section>
    </>
  );
}