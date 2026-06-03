import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  {
    id: 1,
    icon: "⚽",
    title: "Sports Training",
    description: "Football, Cricket, Badminton & Karate coaching with professional mentorship",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    icon: "🎨",
    title: "Music & Art",
    description: "Creative learning through music, painting and craft activities",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: "🎤",
    title: "Quiz & Public Speaking",
    description: "Confidence building through competitions and presentations",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 4,
    icon: "🔬",
    title: "Science Projects",
    description: "Hands-on innovation and scientific thinking through experiments",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 5,
    icon: "🤝",
    title: "Community Activities",
    description: "Leadership, teamwork and social responsibility programs",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 6,
    icon: "🗺️",
    title: "Excursions & Picnics",
    description: "Learning through exploration and experiential fun",
    color: "from-orange-500 to-red-500",
  },
];

function ActivityCard({ activity, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: false,
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group activity-card"
    >
      <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:scale-105 hover:-translate-y-3">
        {/* Animated gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} blur-2xl -z-10`} style={{ filter: "blur(40px)" }} />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="text-6xl mb-6 inline-block group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
            {activity.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-navy-900 mb-3 transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e3a8a" }}>
            {activity.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed transition-colors duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {activity.description}
          </p>

          {/* Hover line */}
          <div className={`mt-4 h-1 w-16 bg-gradient-to-r ${activity.color} rounded-full transform-gpu scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
        </div>
      </div>
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

export default function CoCurricular() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Animate heading
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

    // Animate banner
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: bannerRef.current,
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

        #cocurricular {
          background: linear-gradient(135deg, #f8f9fb 0%, #ffffff 50%, #f0f4f8 100%);
          position: relative;
          overflow: hidden;
        }

        #cocurricular::before {
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

        .cocurricular-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1e3a8a;
          font-weight: 600;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .cocurricular-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0c0b0e;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .cocurricular-divider {
          background: linear-gradient(to right, #1e3a8a, rgba(30, 58, 138, 0.2));
          height: 2px;
          animation: scaleIn 0.8s ease-out forwards;
          animation-delay: 0.2s;
          transform-origin: left;
        }

        .cocurricular-subtitle {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .cocurricular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }

        .banner-card {
          position: relative;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(75, 85, 180, 0.05) 100%);
          border: 2px solid rgba(30, 58, 138, 0.15);
          border-radius: 2rem;
          padding: 3rem 2rem;
          text-align: center;
          backdrop-filter: blur(20px);
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .banner-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(30, 58, 138, 0.1) 100%);
          opacity: 0;
          animation: bannerGlow 3s ease-in-out infinite;
        }

        .banner-card:hover {
          border-color: rgba(30, 58, 138, 0.3);
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.15), inset 0 0 30px rgba(30, 58, 138, 0.05);
        }

        .banner-content {
          position: relative;
          z-10;
        }

        .banner-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #1e3a8a;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .banner-highlight {
          background: linear-gradient(135deg, #1e3a8a 0%, #5a7ab8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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

        @keyframes bannerGlow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 768px) {
          .cocurricular-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .cocurricular-heading {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
          }

          .banner-text {
            font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          }
        }

        @media (max-width: 640px) {
          .cocurricular-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .banner-card {
            padding: 2rem 1.5rem;
          }

          .banner-text {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <section id="cocurricular" className="relative py-20 md:py-28 lg:py-32">
        {/* Floating blobs */}
        <FloatingBlob delay={0} size={300} position={{ top: "10%", left: "-5%", background: "rgba(30, 58, 138, 0.1)" }} />
        <FloatingBlob delay={1} size={200} position={{ top: "50%", right: "-3%", background: "rgba(168, 85, 247, 0.08)" }} />
        <FloatingBlob delay={2} size={250} position={{ bottom: "10%", left: "10%", background: "rgba(59, 130, 246, 0.08)" }} />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(30, 58, 138, 0.2)", borderLeft: "1px solid rgba(30, 58, 138, 0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(30, 58, 138, 0.2)", borderRight: "1px solid rgba(30, 58, 138, 0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16" ref={headingRef}>
            <div className="cocurricular-label mb-4 flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
              BEYOND ACADEMICS
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
            </div>

            <h2 className="cocurricular-heading mb-6">Co-Curricular & Extra-Curricular Activities</h2>

            <div className="cocurricular-divider w-20 mb-8" />

            <p className="cocurricular-subtitle text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.85, opacity: 0, animation: "fadeInUp 0.8s ease-out 0.3s forwards" }}>
              Developing Creativity, Confidence, Leadership & Physical Excellence Beyond Classrooms
            </p>

            <p className="mt-6 text-gray-600 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", opacity: 0, animation: "fadeInUp 0.8s ease-out 0.4s forwards" }}>
              Special emphasis is laid on attaining excellence in co-curricular and extra-curricular activities. Value Education helps pupils develop strong moral character and discipline.
            </p>
          </div>

          {/* Activity Cards Grid */}
          <div className="cocurricular-grid">
            {ACTIVITIES.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>

          {/* Premium Banner Card */}
          <div ref={bannerRef} className="banner-card mt-12">
            <div className="banner-content">
              <p className="banner-text">
                <span className="banner-highlight">Balanced Education</span> through academics, discipline, creativity and physical development.
              </p>
              <div className="mt-6 flex justify-center gap-8 flex-wrap">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">📚</span>
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>Academics</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">⚽</span>
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">🎨</span>
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>Creativity</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">🤝</span>
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>Character</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multimedia Learning Card */}
          <div className="multimedia-card mt-12 rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-400/30 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="text-5xl">🖥️</div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e3a8a" }}>
                  Multimedia Learning Experience
                </h3>
                <p className="text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  3M Multimedia Projector based smart learning is used to make education more interactive, meaningful and enjoyable for all students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
