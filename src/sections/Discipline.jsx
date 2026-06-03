import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCORDION_DATA = [
  {
    id: 1,
    icon: "⚖️",
    title: "Discipline & Conduct",
    content: [
      "Special emphasis is laid on inculcating a high degree of discipline amongst the pupils.",
      "Any kind of disobedience or objectionable behaviour may result in disciplinary action.",
      "Students are expected to maintain friendly behaviour, respect classmates and teachers, avoid fights and misconduct, protect school property, follow examination rules honestly, maintain proper appearance and grooming, and attend school regularly."
    ],
  },
  {
    id: 2,
    icon: "📅",
    title: "Attendance Rules",
    content: [
      "Students should not remain absent unnecessarily.",
      "Absence allowed only during sickness or unavoidable situations.",
      "Regular attendance is encouraged for healthy learning habits and academic success."
    ],
  },
  {
    id: 3,
    icon: "👔",
    title: "Uniform Guidelines",
    content: [
      "Students must wear proper tidy school uniform at all times.",
      "Shoes should be polished properly and PT shoes should remain clean.",
      "No student allowed without proper uniform as per school dress code.",
      "Hair must remain disciplined and school appropriate."
    ],
  },
  {
    id: 4,
    icon: "💆",
    title: "Behaviour & Appearance",
    content: [
      "No tattoos or mehndi allowed.",
      "No coloured hair or dye permitted.",
      "Girls should maintain proper hairstyle or follow hijab rules.",
      "Boys should maintain proper crew-cut hairstyle.",
      "Respectful conduct is compulsory at all times."
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="accordion-item rounded-xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between group hover:bg-white/50 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
          <h3 className="text-lg font-bold text-navy-900 text-left" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e3a8a" }}>
            {item.title}
          </h3>
        </div>
        <div className={`text-xl text-navy-900 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: "#1e3a8a" }}>
          ▼
        </div>
      </button>

      {isOpen && (
        <div
          ref={contentRef}
          className="accordion-content border-t border-white/30 bg-white/20 px-6 py-5"
        >
          <div className="space-y-3">
            {item.content.map((text, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-blue-500 font-bold text-lg flex-shrink-0 mt-0.5">•</span>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingBlob({ delay, size, position }) {
  return (
    <div
      className="floating-blob absolute rounded-full blur-3xl opacity-10 pointer-events-none"
      style={{
        width: size,
        height: size,
        ...position,
        background: "linear-gradient(135deg, #1e3a8a, #5a7ab8)",
        animation: `floatAnim 4s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function Discipline() {
  const [expandedId, setExpandedId] = useState(1);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        #discipline {
          background: linear-gradient(135deg, #f8f9fb 0%, #ffffff 50%, #f0f4f8 100%);
          position: relative;
          overflow: hidden;
        }

        #discipline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 15% 50%, rgba(30, 58, 138, 0.04) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 85% 20%, rgba(30, 58, 138, 0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .discipline-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1e3a8a;
          font-weight: 600;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .discipline-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0c0b0e;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .discipline-divider {
          background: linear-gradient(to right, #1e3a8a, rgba(30, 58, 138, 0.2));
          height: 2px;
          animation: scaleIn 0.8s ease-out forwards;
          animation-delay: 0.2s;
          transform-origin: left;
        }

        .discipline-subtitle {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .accordion-item {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .accordion-content {
          animation: slideDown 0.3s ease-out forwards;
        }

        .premium-card {
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(75, 85, 180, 0.05) 100%);
          border: 2px solid rgba(30, 58, 138, 0.15);
          border-radius: 2rem;
          padding: 3rem 2rem;
          text-align: center;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .premium-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(30, 58, 138, 0.1) 100%);
          opacity: 0;
          animation: cardGlow 3s ease-in-out infinite;
        }

        .premium-card:hover {
          border-color: rgba(30, 58, 138, 0.3);
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.15), inset 0 0 30px rgba(30, 58, 138, 0.05);
        }

        .premium-card-content {
          position: relative;
          z-10;
        }

        .premium-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: floatIcon 3s ease-in-out infinite;
        }

        .premium-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 700;
          color: #1e3a8a;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .premium-highlight {
          background: linear-gradient(135deg, #1e3a8a 0%, #5a7ab8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .discipline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .accordion-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        @keyframes cardGlow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1024px) {
          .discipline-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .discipline-heading {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
          }

          .premium-text {
            font-size: clamp(1.1rem, 2vw, 1.5rem);
          }
        }

        @media (max-width: 640px) {
          .accordion-grid {
            gap: 1rem;
          }

          .premium-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <section id="discipline" className="relative py-20 md:py-28 lg:py-32">
        {/* Floating blobs */}
        <FloatingBlob delay={0} size={300} position={{ top: "10%", left: "-5%", background: "rgba(30, 58, 138, 0.1)" }} />
        <FloatingBlob delay={1} size={200} position={{ top: "60%", right: "-3%", background: "rgba(168, 85, 247, 0.08)" }} />
        <FloatingBlob delay={2} size={250} position={{ bottom: "5%", left: "5%", background: "rgba(59, 130, 246, 0.08)" }} />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(30, 58, 138, 0.2)", borderLeft: "1px solid rgba(30, 58, 138, 0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(30, 58, 138, 0.2)", borderRight: "1px solid rgba(30, 58, 138, 0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16" ref={headingRef}>
            <div className="discipline-label mb-4 flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
              SCHOOL VALUES
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
            </div>

            <h2 className="discipline-heading mb-6">School Guidelines & Discipline</h2>

            <div className="discipline-divider w-20 mb-8" />

            <p className="discipline-subtitle text-gray-700 max-w-3xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.85, opacity: 0, animation: "fadeInUp 0.8s ease-out 0.3s forwards" }}>
              Discipline, responsibility and respectful behaviour form the foundation of a healthy learning environment.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="discipline-grid">
            {/* Accordion Section */}
            <div className="accordion-grid">
              {ACCORDION_DATA.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Premium Card Section */}
            <div ref={cardRef}>
              <div className="premium-card">
                <div className="premium-card-content">
                  <div className="premium-icon">🛡️</div>
                  <p className="premium-text">
                    <span className="premium-highlight">Discipline builds character,</span> confidence and responsibility.
                  </p>
                  <div className="mt-8 space-y-4 text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Strong moral foundation</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Academic excellence</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Respectful behaviour</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Personal growth</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <span>Social responsibility</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
