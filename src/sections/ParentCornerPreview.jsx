import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const highlights = [
  { icon: "🤝", label: "Partnership", desc: "Collaborative growth for every student's success." },
  { icon: "📈", label: "Academic Review", desc: "Regular performance tracking and guidance." },
  { icon: "🛡️", label: "Safe Environment", desc: "Shared responsibility in fostering discipline." },
];

export default function ParentCornerPreview() {
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

  return (
    <>
      <style>{`
        .parent-preview {
          background: #03092E;
          position: relative;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .gold-label {
          letter-spacing: 0.35em;
          color: #C9A84C;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .parent-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.4s ease;
        }
        .parent-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-8px);
        }
      `}</style>

      <section ref={sectionRef} className="parent-preview py-32 px-6 sm:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-20 text-center opacity-0">
            <span className="gold-label">Community & Support</span>
            <h2 className="display-font text-4xl md:text-6xl text-white font-light mt-4 leading-tight">
              Parent <em className="text-amber-300 italic font-light">Corner</em>
            </h2>
            <p className="text-white/40 text-lg mt-6 max-w-2xl mx-auto body-font font-light">
              We empower our parents with the resources and guidelines needed to actively participate in their ward's academic and emotional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="parent-card rounded-[2.5rem] p-10 flex flex-col items-center text-center opacity-0"
              >
                <div className="text-5xl mb-8">{h.icon}</div>
                <h3 className="display-font text-2xl text-white font-semibold mb-4">{h.label}</h3>
                <p className="body-font text-sm text-white/40 leading-relaxed mb-4">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/parent-corner" 
              className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-amber-400 font-bold uppercase tracking-widest text-xs hover:bg-amber-400 hover:text-navy-900 transition-all duration-300"
            >
              Learn More & Visit Resource Center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
