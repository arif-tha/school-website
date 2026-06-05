import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  { icon: "🇬🇧", label: "English Medium" },
  { icon: "📐", label: "Modern Curriculum" },
  { icon: "💻", label: "Computer Education" },
  { icon: "🔬", label: "Practical Learning" },
  { icon: "🌟", label: "Character Development" },
];

export default function AcademicsPreview() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const academicYearRef = useRef(null);
  const teachingRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
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

    // Academic Year & Teaching reveal
    if (academicYearRef.current) {
      gsap.fromTo(
        academicYearRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: academicYearRef.current, start: "top 85%" },
        }
      );
    }
    
    if (teachingRef.current) {
      gsap.fromTo(
        teachingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: teachingRef.current, start: "top 85%" },
        }
      );
    }

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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

        .feature-pill {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .feature-pill:hover {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.3);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }

        .learn-more-btn {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          color: white;
          padding: 0.75rem 2.2rem;
          border-radius: 9999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .learn-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3), 0 0 15px rgba(29,78,216,0.2);
          border-color: rgba(255,255,255,0.2);
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
                  The Crescent School follows a meticulously structured academic framework, ensuring excellence from the earliest stages of development through sophisticated career preparation in higher secondary education.
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

          {/* PREVIEW PAGE CONTENT ONLY */}
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <div ref={academicYearRef}>
              <p className="gold-label mb-3">Academic Overview</p>
              <p style={paragraphStyle}>
                The school follows official board stipulations for its sessions, with Nursery to Class X operating from January to December, and Class XI to XII running from April to March.
              </p>
            </div>
            <div ref={teachingRef}>
              <p className="gold-label mb-3">Teaching & Training</p>
              <p style={paragraphStyle}>
                Our methodology emphasizes scientific training and creative thinking across all levels, fostering an environment where curiosity is nurtured into precise academic excellence and character.
              </p>
            </div>
            <div className="md:col-span-2">
              <Link
                to="/academic-overview"
                className="learn-more-btn"
              >
                Learn More <span>→</span>
              </Link>
            </div>
          </div>

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