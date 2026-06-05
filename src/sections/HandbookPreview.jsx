import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const highlights = [
  { icon: "👔", label: "Uniform Standards", desc: "Detailed dress code for all sessions." },
  { icon: "🛡️", label: "Strict Discipline", desc: "Values of respect and responsibility." },
  { icon: "🏠", label: "House System", desc: "The four-house competitive structure." },
];

export default function HandbookPreview() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out", 
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } 
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, scale: 0.95, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.15,
          ease: "power3.out", 
          scrollTrigger: { trigger: card, start: "top 85%" } 
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const paragraphStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1rem",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 300,
  };

  return (
    <>
      <style>{`
        .handbook-preview {
          background: #03092E;
          position: relative;
          overflow: hidden;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .gold-label {
          letter-spacing: 0.35em;
          color: #C9A84C;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .handbook-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .handbook-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-8px);
        }
        .learn-more-link {
          color: #C9A84C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }
        .learn-more-link:hover {
          color: #f59e0b;
          transform: translateX(5px);
        }
      `}</style>

      <section ref={sectionRef} className="handbook-preview py-24 lg:py-40 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-20 grid lg:grid-cols-2 gap-12 items-end opacity-0">
            <div>
              <span className="gold-label">Student Life</span>
              <h2 className="display-font text-4xl md:text-5xl lg:text-6xl text-white font-light mt-4 leading-tight">
                Student <em className="text-amber-300/90 font-light italic">Handbook</em> <br />
                & Guidelines
              </h2>
            </div>
            <div>
              <p className="text-blue-100/40 text-lg leading-relaxed max-w-md pb-2">
                Our handbook serves as a comprehensive guide for student conduct, institutional discipline, and official uniform regulations to foster an environment of excellence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="handbook-card rounded-[2rem] p-8 lg:p-10 flex flex-col items-start opacity-0"
              >
                <div className="text-5xl mb-8 transition-transform duration-300">{h.icon}</div>
                <h3 className="display-font text-2xl lg:text-3xl text-white font-semibold mb-4">{h.label}</h3>
                <p style={paragraphStyle} className="mb-8">{h.desc}</p>
                <div className="mt-auto w-12 h-[1px] bg-amber-400/30 group-hover:w-20 transition-all duration-300" />
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
            <Link 
              to="/handbook-details" 
              className="learn-more-link flex items-center justify-center gap-3 inline-flex"
            >
              Learn More About Student Policies <span>→</span>
            </Link>
            <Link 
              to="/academic-calendar" 
              className="learn-more-link flex items-center justify-center gap-3 inline-flex opacity-80 hover:opacity-100"
            >
              Academic Calendar 2026-27 <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
