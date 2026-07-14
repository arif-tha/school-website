import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/video/hero-school1.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef         = useRef(null);
  const videoRef        = useRef(null);
  const contentRef      = useRef(null);  // full content wrapper
  const labelRef        = useRef(null);
  const subHeadRef      = useRef(null);
  const descriptorRef   = useRef(null);
  const constitutionRef = useRef(null);
  const badgesRef       = useRef([]);
  const statsRef        = useRef([]);
  const scrollRef       = useRef(null);
  const scrollDotRef    = useRef(null);
  const lightRef        = useRef(null);

  // word refs
  const wordRefs = useRef([null, null, null]);

  const badges = ["WBBSE Affiliated", "WBCHSE Affiliated", "Minority Institution"];
  const stats  = [
    { value: "25+",         label: "Years of Excellence" },
    { value: "Nursery–XII", label: "Complete Education"  },
    { value: "3 Streams",   label: "Sci · Com · Hum"    },
  ];

  useEffect(() => {
    if (wordRefs.current.some((r) => !r)) return;

    const ctx = gsap.context(() => {

      // ── video entrance ────────────────────────────────────────────
      gsap.fromTo(videoRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 3.0, ease: "power2.inOut" }
      );

      // ── initial states ────────────────────────────────────────────
      const allWords = wordRefs.current;
      allWords.forEach((w) => gsap.set(w, { yPercent: 110 }));

      gsap.set(labelRef.current,        { autoAlpha: 0, y: 14 });
      gsap.set(subHeadRef.current,      { autoAlpha: 0, filter: "blur(16px)" });
      gsap.set(descriptorRef.current,   { autoAlpha: 0, y: 10 });
      gsap.set(constitutionRef.current, { autoAlpha: 0 });
      gsap.set(scrollRef.current,       { autoAlpha: 0, y: 12 });
      badgesRef.current.forEach((b) => b && gsap.set(b, { autoAlpha: 0, y: 20, scale: 0.9 }));
      statsRef.current.forEach((s)  => s && gsap.set(s, { autoAlpha: 0, y: 30, scale: 0.75 }));

      // ── MASTER TIMELINE ───────────────────────────────────────────
      const tl = gsap.timeline();

      tl.to(labelRef.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3);

      tl.to(allWords[0], { yPercent: 0, duration: 0.9, ease: "expo.out" }, 0.65);
      tl.to(allWords[1], { yPercent: 0, duration: 0.9, ease: "expo.out" }, 0.85);
      tl.to(allWords[2], { yPercent: 0, duration: 0.9, ease: "expo.out" }, 1.05);

      tl.to(subHeadRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.inOut" }, 1.9);
      tl.to(descriptorRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.6);
      tl.to(constitutionRef.current,
        { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 2.9);
      tl.to(badgesRef.current.filter(Boolean),
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(1.2)" }, 3.3);
      tl.to(statsRef.current.filter(Boolean),
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.11, ease: "back.out(1.1)" }, 3.85);
      tl.to(scrollRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 4.3);

      tl.add(() => {
        gsap.to(scrollDotRef.current, {
          y: 13, opacity: 0.35, duration: 1.2,
          ease: "sine.inOut", repeat: -1, yoyo: true,
        });
      }, 4.8);

      // ── SCROLL EXIT ───────────────────────────────────────────────
      const st = { trigger: heroRef.current, start: "top top", end: "bottom top" };
      gsap.to(videoRef.current,  { scale: 1.2, opacity: 0.6, scrollTrigger: { ...st, scrub: 1.5 } });
      gsap.to(contentRef.current,{ opacity: 0, y: -50,        scrollTrigger: { ...st, scrub: 1.2 } });

      // ── AMBIENT LIGHT ─────────────────────────────────────────────
      gsap.to(lightRef.current, { x: 100, duration: 10, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(lightRef.current, { y:  50, duration: 13, ease: "sine.inOut", repeat: -1, yoyo: true });

    }, heroRef);

    // ── MOUSE PARALLAX ─────────────────────────────────────────────
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let cleanup = () => {};
    if (!isTouch) {
      let mx = 0, my = 0, sx = 0, sy = 0, raf;
      const onMove = (e) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      const tick = () => {
        sx += (mx - sx) * 0.07;
        sy += (my - sy) * 0.07;
        gsap.set(videoRef.current,  { x: sx * 8, y: sy * 5, overwrite: "auto" });
        gsap.set(contentRef.current,{ x: sx * -4, y: sy * -2.5, overwrite: "auto" });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      window.addEventListener("mousemove", onMove, false);
      cleanup = () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
    }

    return () => { ctx.revert(); cleanup(); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        /* Word clip mask */
        .hw-wrap {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: 1.05;
        }
        .hw-inner {
          display: block;
          will-change: transform;
        }

        /* Stats divider */
        .stat-divider {
          width: 1px;
          background: rgba(201,168,76,0.22);
          flex-shrink: 0;
          align-self: stretch;
        }

        /* ── RESPONSIVE FIXES ───────────────────────────────────── */

        /* Section: use dvh where supported so mobile browser chrome
           (address bar) doesn't push content below the fold / cause
           extra scroll height. Falls back to 100vh everywhere else. */
        .hero-section {
          width: 100%;
          height: 100vh;
        }
        @supports (height: 100dvh) {
          .hero-section { height: 100dvh; }
        }

        /* Heading: word-wrap is now ALLOWED (nowrap removed) so on
           narrow screens "SCHOOL" can drop to its own line instead
           of forcing horizontal overflow. clamp() keeps it large on
           desktop, identical to the original sizing there. */
        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.1rem, 9vw, 5.8rem);
          color: white;
          line-height: 1.05;
          margin: 0 0 1.2rem 0;
          text-shadow: 0 2px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.85);
        }

        /* Bottom row: stats + scroll indicator.
           Desktop/tablet: unchanged side-by-side layout.
           Mobile: stacks vertically so the absolutely-positioned
           scroll indicator can't overlap the stats anymore. */
        .hero-bottom-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hero-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }
        }

        /* Stats row: allow wrapping instead of overflowing
           horizontally on very small phones. */
        .hero-stats {
          display: flex;
          align-items: stretch;
          gap: 0;
          flex-wrap: wrap;
          row-gap: 1rem;
        }
        @media (max-width: 480px) {
          .stat-divider { display: none; }
        }

        /* Scroll indicator: stays centered/absolute on tablet+desktop
           (matches original design exactly). On mobile it drops into
           normal flow under the stats instead of floating on top of
           them, and hides entirely on short landscape screens where
           it would otherwise clip against the viewport edge. */
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          position: absolute;
          bottom: clamp(1.5rem, 3.5vh, 2.5rem);
          left: 50%;
          transform: translateX(-50%);
        }
        @media (max-width: 640px) {
          .hero-scroll-indicator {
            position: static;
            transform: none;
            align-self: center;
            margin-top: 0.25rem;
          }
        }
        @media (max-height: 480px) {
          .hero-scroll-indicator { display: none; }
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-section"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#020817",
        }}
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        />

        {/* OVERLAYS — strengthened + reshaped so the zones behind the
            heading/subtitle (top) and stats (bottom) stay reliably
            dark across every frame of the video, while the true
            center strip stays lighter so the footage still reads
            through, matching the Apple/Harvard "scrim" technique. */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(180deg, rgba(2,8,23,0.80) 0%, rgba(2,8,23,0.55) 28%, rgba(2,8,23,0.34) 50%, rgba(2,8,23,0.55) 72%, rgba(2,8,23,0.84) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 45%, transparent 80%)",
        }} />

        {/* AMBIENT LIGHT */}
        <div ref={lightRef} style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* TOP GOLD LINE */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px", zIndex: 10,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6) 50%, transparent)",
        }} />

        {/* BOTTOM GOLD LINE */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "1px", zIndex: 10,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 50%, transparent)",
        }} />

        {/* ═══════════════════════════════════════════════════════════
            FULL CONTENT WRAPPER
        ═══════════════════════════════════════════════════════════ */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: "clamp(5rem, 12vh, 9rem)",
            paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
            paddingLeft: "clamp(1.25rem, 7vw, 8vw)",
            paddingRight: "clamp(1.25rem, 7vw, 8vw)",
          }}
        >

          {/* ── TOP: main text block ── */}
          <div style={{ maxWidth: "680px" }}>

            {/* Eyebrow label */}
            <div ref={labelRef} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.65)",
            }}>
              EST. 2002 · KOLKATA
            </div>

            {/* HEADING — each word clipped independently, wraps freely now */}
            <h1 className="hero-heading">
              <span className="hw-wrap" style={{ marginRight: "0.25em" }}>
                <span className="hw-inner" ref={(el) => { wordRefs.current[0] = el; }}>
                  THE
                </span>
              </span>
              <span className="hw-wrap" style={{ marginRight: "0.25em" }}>
                <span
                  className="hw-inner"
                  ref={(el) => { wordRefs.current[1] = el; }}
                  style={{ fontStyle: "italic", color: "#C9A84C" }}
                >
                  CRESCENT
                </span>
              </span>
              <span className="hw-wrap">
                <span className="hw-inner" ref={(el) => { wordRefs.current[2] = el; }}>
                  SCHOOL
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <div ref={subHeadRef} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300, fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "0.5rem",
              textShadow: "0 1px 12px rgba(0,0,0,0.6)",
            }}>
              Nursery to Higher Secondary
            </div>

            {/* Descriptor */}
            <div ref={descriptorRef} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400, fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.68)",
              marginBottom: "0.4rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}>
              English Medium · Girls &amp; Boys
            </div>

            {/* Constitutional note */}
            <div ref={constitutionRef} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400, fontSize: "0.58rem",
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.50)",
              marginBottom: "1.4rem",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}>
              Protected under Article 30 of the Constitution of India
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {badges.map((badge, i) => (
                <span
                  key={badge}
                  ref={(el) => { badgesRef.current[i] = el; }}
                  style={{
                    border: "1px solid rgba(201,168,76,0.30)",
                    background: "rgba(201,168,76,0.08)",
                    color: "rgba(201,168,76,0.85)",
                    padding: "0.25rem 0.7rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500, fontSize: "0.56rem",
                    textTransform: "uppercase", letterSpacing: "0.14em",
                    borderRadius: 0,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── BOTTOM: stats row + scroll indicator ── */}
          <div className="hero-bottom-row">

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={stat.value} style={{ display: "flex", alignItems: "stretch" }}>
                  <div
                    ref={(el) => { statsRef.current[i] = el; }}
                    style={{
                      display: "flex", flexDirection: "column",
                      paddingLeft: i === 0 ? 0 : "1.6rem",
                      paddingRight: "1.6rem",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      color: "#C9A84C", lineHeight: 1,
                      textShadow: "0 1px 10px rgba(0,0,0,0.6)",
                    }}>
                      {stat.value}
                    </span>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400, fontSize: "0.55rem",
                      textTransform: "uppercase", letterSpacing: "0.14em",
                      color: "rgba(255,255,255,0.65)",
                      marginTop: "0.2rem", whiteSpace: "nowrap",
                      textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                    }}>
                      {stat.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && <div className="stat-divider" />}
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className="hero-scroll-indicator">
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.48rem", letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}>
                Scroll to Explore
              </span>
              <div style={{
                width: "20px", height: "34px",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "10px",
                display: "flex", alignItems: "flex-start",
                justifyContent: "center", paddingTop: "5px",
              }}>
                <div ref={scrollDotRef} style={{
                  width: "2px", height: "5px",
                  background: "#C9A84C", borderRadius: "2px",
                }} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}