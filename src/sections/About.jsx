import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ssImage from "../assets/building/side angle.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const contentSectionsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Image reveal
        if (imageWrapRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { opacity: 0, x: -40, scale: 0.97 },
            {
              opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (imageInnerRef.current) {
          gsap.fromTo(
            imageInnerRef.current,
            { scale: 1.12 },
            {
              scale: 1, duration: 1.4, ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Label
        if (labelRef.current) {
          gsap.fromTo(
            labelRef.current,
            { opacity: 0, y: 16 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
              scrollTrigger: { trigger: labelRef.current, start: "top 85%", once: true },
            }
          );
        }

        // Heading
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
            }
          );
        }

        // Content Sections stagger
        if (contentSectionsRef.current.length > 0) {
          gsap.fromTo(
            contentSectionsRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: contentSectionsRef.current[0],
                start: "top 88%",
                once: true
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const subHeadingSrtyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.25rem",
    color: "#C9A96E",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: "0.75rem",
    display: "block"
  };

  const paragraphStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1rem",
    lineHeight: "1.85",
    color: "rgba(255,255,255,0.65)",
    fontWeight: 300,
    marginBottom: "1.5rem"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #about-section {
          --gold: #C9A96E;
          --bg: #0c0b0e;
          background: var(--bg);
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
          margin: 2rem 0;
        }

        .house-item {
          border-left: 2px solid var(--gold-border, rgba(201,169,110,0.2));
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <section
        id="about-section"
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 50%, rgba(201,169,110,0.04) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 85% 20%, rgba(201,169,110,0.03) 0%, transparent 60%)`,
          }}
        />

        {/* Ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(201,169,110,0.2)", borderLeft: "1px solid rgba(201,169,110,0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(201,169,110,0.2)", borderRight: "1px solid rgba(201,169,110,0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — Image */}
            <div ref={imageWrapRef} className="relative about-image-frame rounded-2xl lg:sticky lg:top-32" style={{ opacity: 0 }}>
              <div className="relative z-10 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <div ref={imageInnerRef} className="absolute inset-0 w-full h-full overflow-hidden">
                  <img src={ssImage} alt="The Crescent School Campus" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,6,3,0.7) 0%, transparent 50%)" }} />
                </div>
              </div>
              <div className="absolute -bottom-5 -right-4 md:-right-6 z-20 rounded-xl px-5 py-4" style={{ background: "linear-gradient(135deg, #1a1508, #100d04)", border: "1px solid rgba(201,169,110,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A96E", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>2002</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>Est.</p>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="flex flex-col gap-8">
              
              {/* Label */}
              <div ref={labelRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
                <div className="w-6 h-px" style={{ background: "#C9A96E" }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  fontWeight: 600,
                }}>
                  About The School
                </span>
              </div>

              {/* Heading */}
              <h2
                ref={headingRef}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#f5efe0",
                  opacity: 0,
                }}
              >
                A Journey of Academic<br />
                <span style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 400 }}>Excellence & Values</span>
              </h2>

              {/* Paragraphs */}
              <div className="flex flex-col gap-5">
                <div ref={el => contentSectionsRef.current[0] = el} style={{ opacity: 0 }}>
                  <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                    Founded in 2002 by Shaikh Shamsher Alam, The Crescent School has grown into a respected institution dedicated to quality education, discipline, and character development.
                  </p>
                </div>
                <div ref={el => contentSectionsRef.current[1] = el} style={{ opacity: 0 }}>
                  <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                    Managed by The Crescent Charitable Trust and affiliated with WBBSE and WBCHSE, the school provides an inclusive learning environment that nurtures academic excellence and social responsibility.
                  </p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div 
                ref={el => contentSectionsRef.current[2] = el} 
                style={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-white/5"
              >
                {[
                  { label: "Established 2002", icon: "✦" },
                  { label: "WBBSE & WBCHSE Affiliated", icon: "✓" },
                  { label: "NIOS Accredited Centre", icon: "★" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ color: "#C9A96E", fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ 
                      fontFamily: "'DM Sans', sans-serif", 
                      fontSize: "0.8rem", 
                      color: "rgba(255,255,255,0.8)", 
                      fontWeight: 500,
                      letterSpacing: "0.02em"
                    }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div ref={el => contentSectionsRef.current[3] = el} style={{ opacity: 0 }}>
                <a 
                  href="/about"
                  className="inline-flex items-center group"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#C9A96E",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    transition: "all 0.3s ease"
                  }}
                >
                  <span className="relative">
                    Learn More About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
