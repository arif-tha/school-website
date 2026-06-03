import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/video/hero-school.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const leftColRef = useRef(null);
  const labelRef = useRef(null);
  const wordsRef = useRef([]);
  const subHeadRef = useRef(null);
  const descriptorRef = useRef(null);
  const constitutionRef = useRef(null);
  const badgesRef = useRef([]);
  const statsRef = useRef([]);
  const scrollRef = useRef(null);
  const scrollDotRef = useRef(null);
  const lightRef = useRef(null);

  const badges = ["WBBSE Affiliated", "WBCHSE Affiliated", "Minority Institution"];
  const stats = [
    { value: "20+", label: "Years of Excellence" },
    { value: "Nursery–XII", label: "Complete Education" },
    { value: "3 Streams", label: "Sci · Com · Hum" },
  ];
  const words = ["THE", "CRESCENT", "SCHOOL"];

  useEffect(() => {
    console.log("Hero mounted");
    
    const ctx = gsap.context(() => {
      console.log("GSAP timeline started");

      // ═══════════════════════════════════════════════════════════════════
      // VIDEO ENTRANCE ANIMATION - Cinematic zoom in
      // ═══════════════════════════════════════════════════════════════════
      gsap.set(videoRef.current, { scale: 1.15 });
      gsap.to(videoRef.current, {
        scale: 1,
        duration: 3.2,
        ease: "power2.inOut",
      });

      // ═══════════════════════════════════════════════════════════════════
      // INITIALIZE ALL ELEMENTS
      // ═══════════════════════════════════════════════════════════════════
      
      gsap.set(labelRef.current, { opacity: 0, y: 30 });
      
      wordsRef.current.forEach((w) => {
        if (w) gsap.set(w, { 
          opacity: 0, 
          y: 150,           // Much bigger drop
          rotateX: 90,       // Full 3D rotation
          scale: 0.7,        // Scale down effect
        });
      });
      
      gsap.set(subHeadRef.current, { opacity: 0, filter: "blur(25px)" });
      gsap.set(descriptorRef.current, { opacity: 0, y: 20 });
      gsap.set(constitutionRef.current, { opacity: 0, y: 15 });
      
      badgesRef.current.forEach((b) => { 
        if (b) gsap.set(b, { opacity: 0, y: 40, scale: 0.8 }); 
      });
      
      statsRef.current.forEach((s) => { 
        if (s) gsap.set(s, { opacity: 0, y: 60, scale: 0.6 }); 
      });
      
      gsap.set(scrollRef.current, { opacity: 0, y: 30 });

      // ═══════════════════════════════════════════════════════════════════
      // MASTER TIMELINE - Premium entrance sequence
      // ═══════════════════════════════════════════════════════════════════
      
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 0.2s: Label entrance
      tl.to(labelRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.9,
        ease: "power2.out"
      }, 0.2);

      // 0.6s: Words entrance with strong stagger
      tl.to(
        wordsRef.current.filter(Boolean),
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          duration: 1.3,
          stagger: 0.18,     // Increased stagger for cinematic effect
          ease: "back.out(1.2)"  // Strong overshoot for impact
        },
        0.6
      );

      // 2.1s: Subtitle blur reveal
      tl.to(subHeadRef.current, { 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: 1.1,
        ease: "power2.inOut"
      }, 2.1);

      // 2.9s: Descriptor
      tl.to(descriptorRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power2.out"
      }, 2.9);

      // 3.3s: Constitutional note
      tl.to(constitutionRef.current, { 
        opacity: 1, 
        duration: 0.9,
        ease: "power2.out"
      }, 3.3);

      // 3.8s: Badges entrance with scale
      tl.to(
        badgesRef.current.filter(Boolean),
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.13,
          ease: "back.out(1)"
        },
        3.8
      );

      // 4.4s: Stats entrance with strong scale
      tl.to(
        statsRef.current.filter(Boolean),
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "back.out(1.1)"
        },
        4.4
      );

      // 4.6s: Scroll indicator
      tl.to(scrollRef.current, { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 4.6);

      // ═══════════════════════════════════════════════════════════════════
      // SCROLL INDICATOR - Continuous pulsing motion
      // ═══════════════════════════════════════════════════════════════════
      
      tl.add(() => {
        gsap.to(scrollDotRef.current, {
          y: 14,
          opacity: 0.4,
          duration: 1.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, 5.2);

      // ═══════════════════════════════════════════════════════════════════
      // SCROLL TRIGGER - Cinematic exit with video inverse zoom
      // ═══════════════════════════════════════════════════════════════════
      
      gsap.to(videoRef.current, {
        scale: 1.3,                    // Zoom OUT as user scrolls
        opacity: 0.7,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.getVelocity() / 300;
          }
        },
      });

      // Fade content on scroll
      gsap.to(leftColRef.current, {
        opacity: 0,
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Darken overlay on scroll
      gsap.to([document.querySelectorAll('[data-overlay]')[0], 
               document.querySelectorAll('[data-overlay]')[1]], {
        opacity: 0.9,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ═══════════════════════════════════════════════════════════════════
      // MOVING LIGHT - Ambient animation
      // ═══════════════════════════════════════════════════════════════════
      
      gsap.to(lightRef.current, {
        x: 120,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      
      gsap.to(lightRef.current, {
        y: 60,
        duration: 13,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }, 0);
    }, heroRef);

    // ═════════════════════════════════════════════════════════════════════
    // MOUSE PARALLAX - Smooth premium effect
    // ═════════════════════════════════════════════════════════════════════
    
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let parallaxCleanup = () => {};

    if (!isTouch) {
      let mouseX = 0, mouseY = 0;
      let smoothX = 0, smoothY = 0;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to({}, {
          duration: 0.8,
          onUpdate: () => {
            smoothX += (mouseX - smoothX) * 0.1;
            smoothY += (mouseY - smoothY) * 0.1;

            gsap.set(videoRef.current, {
              x: smoothX * 8,
              y: smoothY * 6,
              overwrite: 'auto'
            });

            gsap.set(leftColRef.current, {
              x: smoothX * -6,
              y: smoothY * -4,
              overwrite: 'auto'
            });
          }
        });
      };

      window.addEventListener("mousemove", handleMouseMove, false);
      parallaxCleanup = () => window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      parallaxCleanup();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');

        /* Premium text shadow for better readability */
        .hero-text-shadow {
          text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                       0 4px 16px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#020817",
        }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Overlay Layer 1 */}
        <div
          data-overlay
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)",
            zIndex: 1,
          }}
        />

        {/* Overlay Layer 2 */}
        <div
          data-overlay
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.30) 40%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Moving light */}
        <div
          ref={lightRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            background: "radial-gradient(ellipse 700px 500px at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Top gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.55) 50%, transparent)",
            zIndex: 10,
          }}
        />

        {/* Bottom gold line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22) 50%, transparent)",
            zIndex: 10,
          }}
        />

        {/* Main content column */}
        <div
          ref={leftColRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "clamp(1.5rem, 7vw, 8vw)",
            paddingRight: "2rem",
            maxWidth: "680px",
            zIndex: 5,
            paddingBottom: "8rem",
          }}
        >
          {/* Eyebrow label */}
          <div
            ref={labelRef}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.58rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1.2rem",
            }}
          >
            EST. 2002 · KOLKATA
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(3.2rem, 7vw, 6.2rem)",
              color: "white",
              lineHeight: 1.0,
              margin: 0,
              marginBottom: "1rem",
              perspective: "900px",
            }}
          >
            {words.map((word, i) => (
              <span
                key={word}
                ref={(el) => (wordsRef.current[i] = el)}
                style={{
                  display: "inline-block",
                  marginRight: "0.3em",
                  fontStyle: word === "CRESCENT" ? "italic" : "normal",
                  color: word === "CRESCENT" ? "#C9A84C" : "white",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Sub-heading */}
          <div
            ref={subHeadRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "rgba(255,255,255,0.72)",
              marginBottom: "0.6rem",
            }}
          >
            Nursery to Higher Secondary
          </div>

          {/* Descriptor */}
          <div
            ref={descriptorRef}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "0.55rem",
            }}
          >
            English Medium · Girls &amp; Boys
          </div>

          {/* Constitutional note */}
          <div
            ref={constitutionRef}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1.4rem",
            }}
          >
            Protected under Article 30 of the Constitution of India
          </div>

          {/* Affiliation badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginBottom: "2.2rem",
            }}
          >
            {badges.map((badge, i) => (
              <span
                key={badge}
                ref={(el) => (badgesRef.current[i] = el)}
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  background: "rgba(201,168,76,0.07)",
                  color: "rgba(201,168,76,0.85)",
                  padding: "0.28rem 0.75rem",
                  borderRadius: 0,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.58rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Statistics row */}
        <div
          style={{
            position: "absolute",
            bottom: "4.5rem",
            left: "clamp(1.5rem, 7vw, 8vw)",
            display: "flex",
            gap: "2.5rem",
            zIndex: 5,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.value} style={{ display: "flex", alignItems: "stretch", gap: "2.5rem" }}>
              <div
                ref={(el) => (statsRef.current[i] = el)}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "2.4rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "0.25rem",
                  }}
                >
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    alignSelf: "stretch",
                    background: "rgba(201,168,76,0.25)",
                    marginLeft: "-1.25rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
            }}
          >
            Scroll to Explore
          </span>
          <div
            style={{
              width: "22px",
              height: "36px",
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderRadius: "11px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: "6px",
            }}
          >
            <div
              ref={scrollDotRef}
              style={{
                width: "2px",
                height: "6px",
                background: "#C9A84C",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}