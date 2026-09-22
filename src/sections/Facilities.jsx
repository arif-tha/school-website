import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const featuredFacilities = [
  {
    title: "Computer Laboratory",
    desc: "Air-conditioned labs with high-speed internet and latest multimedia technology to match international learning standards.",
    icon: "💻",
    accent: "#38BDF8"
  },
  {
    title: "Science Laboratories",
    desc: "Separate high-spec labs for Physics, Chemistry, and Biology to foster curiosity and practical understanding.",
    icon: "🔬",
    accent: "#34D399"
  },
  {
    title: "Library & Hub",
    desc: "A vast collection of titles and resources designed to cultivate lifelong reading habits and research skills.",
    icon: "📚",
    accent: "#A78BFA"
  }
];

export default function FacilitiesPreview() {
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
        .facilities-preview {
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
        .preview-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .preview-card:hover {
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

      <section id="facilities" ref={sectionRef} className="facilities-preview py-24 lg:py-40 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-20 grid lg:grid-cols-2 gap-12 items-end opacity-0">
            <div>
              <span className="gold-label">Our Campus</span>
              <h2 className="display-font text-4xl md:text-5xl lg:text-6xl text-white font-light mt-4 leading-tight">
                Facilities Designed for <br />
                <em className="text-amber-300/90 font-light italic">Inspiring Excellence</em>
              </h2>
            </div>
            <div>
              <p className="text-[#9DB5D3]/40 text-lg leading-relaxed max-w-md pb-2">
                Every corner of our campus is engineered to spark curiosity, support collaboration, and foster a healthy, disciplined environment for students.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFacilities.map((f, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="preview-card rounded-[2rem] p-8 lg:p-10 flex flex-col items-start opacity-0"
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="display-font text-2xl lg:text-3xl text-white font-semibold mb-4">{f.title}</h3>
                <p style={paragraphStyle} className="mb-8">{f.desc}</p>
                <div className="mt-auto w-12 h-[1px] bg-amber-400/30 group-hover:w-20 transition-all duration-300" />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/facilities-details" 
              className="learn-more-link flex items-center justify-center gap-3 inline-flex"
            >
              Learn More About Our Infrastructure <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}