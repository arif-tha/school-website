import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const achievements = [
  { icon: "🏛️", title: "20+ Years Legacy", desc: "Trusted by families for over two decades of academic excellence" },
  { icon: "🇬🇧", title: "English Medium", desc: "Complete English-medium instruction for global readiness" },
  { icon: "📜", title: "WBBSE Affiliated", desc: "Recognized affiliation with West Bengal Board of Secondary Education" },
  { icon: "🎓", title: "WBCHSE Affiliated", desc: "Higher Secondary affiliation ensuring quality board education" },
  { icon: "🏅", title: "NIOS Accredited", desc: "Accredited centre for National Institute of Open Schooling" },
  { icon: "🕌", title: "Minority Institution", desc: "Recognized Minority Educational Institution with inclusive values" },
  { icon: "🔬", title: "Modern Labs", desc: "State-of-the-art Science & Computer laboratories for practical learning" },
  { icon: "🏆", title: "Exam Preparation", desc: "Dedicated coaching for competitive and entrance examinations" },
  { icon: "🌿", title: "Moral Education", desc: "Character development and ethical grounding woven into every lesson" },
];

const stats = [
  { value: 20, suffix: "+", label: "Years of Excellence", icon: "✦" },
  { value: 3000, suffix: "+", label: "Students Enrolled", icon: "✦" },
  { value: 100, suffix: "+", label: "Qualified Teachers", icon: "✦" },
  { value: 95, suffix: "%", label: "Academic Success", icon: "✦" },
];

const toppers = [
  {
    name: "Ayesha Rahman",
    achievement: "WB Higher Secondary Top Performer",
    college: "Presidency University",
    stream: "Science",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    color: "#C9A84C",
    rank: "1st",
  },
  {
    name: "Mohammed Arif",
    achievement: "Engineering Entrance Success",
    college: "Jadavpur University",
    stream: "Engineering",
    img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80",
    color: "#38BDF8",
    rank: "Top 10",
  },
  {
    name: "Sana Fatima",
    achievement: "Commerce Excellence Award",
    college: "St. Xavier's College",
    stream: "Commerce",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    color: "#A78BFA",
    rank: "Gold",
  },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCounter({ value, suffix, label, icon, started }) {
  const count = useCounter(value, 2200, started);
  return (
    <div className="stat-item flex flex-col items-center text-center px-4">
      <span className="stat-icon text-amber-400/40 text-xs mb-3 tracking-widest">{icon}</span>
      <span className="stat-number">
        {count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const statsRef = useRef(null);
  const topperRefs = useRef([]);
  const floatRefs = useRef([]);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
      );

      // Achievement cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out",
            delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.05,
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });

      // Stats counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => setStatsStarted(true),
      });

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" } }
      );

      // Topper cards
      topperRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });

      // Floating orbs
      floatRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? -30 : 30,
          x: i % 3 === 0 ? 20 : -15,
          duration: 4 + i * 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        .achieve-section {
          font-family: 'Inter', sans-serif;
          background: #020B2A;
          position: relative;
          overflow: hidden;
        }
        .serif { font-family: 'Playfair Display', serif; }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .gold-label {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #C9A84C;
          font-weight: 500;
        }

        .achieve-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
          position: relative;
          overflow: hidden;
        }
        .achieve-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .achieve-card:hover::before { opacity: 1; }
        .achieve-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,168,76,0.25);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.07);
        }

        .stats-bar {
          background: linear-gradient(90deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03), rgba(201,168,76,0.08));
          border-top: 1px solid rgba(201,168,76,0.12);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #C9A84C;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 6px;
          font-weight: 400;
        }

        .stat-divider {
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.25), transparent);
          align-self: stretch;
          margin: 20px 0;
        }

        .topper-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          transition: all 0.45s cubic-bezier(.22,.68,0,1.2);
          position: relative;
          overflow: hidden;
        }
        .topper-card::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.45s ease;
          border-radius: inherit;
        }
        .topper-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 50px rgba(201,168,76,0.1);
        }
        .topper-card:hover .student-img {
          transform: scale(1.08);
        }

        .student-img {
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.2);
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .glow-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(201,168,76,0.4), transparent 50%, rgba(201,168,76,0.15));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .topper-card:hover .glow-border { opacity: 1; }

        .badge {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          font-weight: 600;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
        }

        .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.12);
          flex-shrink: 0;
        }
      `}</style>

      <section ref={sectionRef} className="achieve-section relative py-24 lg:py-36 px-5 md:px-10 lg:px-16">

        {/* Floating orbs */}
        {[
          { w: 500, h: 400, top: "5%", left: "-10%", bg: "rgba(29,78,216,0.12)" },
          { w: 400, h: 350, top: "30%", right: "-8%", bg: "rgba(201,168,76,0.07)" },
          { w: 350, h: 300, bottom: "15%", left: "20%", bg: "rgba(29,78,216,0.08)" },
          { w: 300, h: 250, top: "60%", right: "25%", bg: "rgba(201,168,76,0.05)" },
        ].map((orb, i) => (
          <div
            key={i}
            ref={(el) => (floatRefs.current[i] = el)}
            className="orb"
            style={{ width: orb.w, height: orb.h, top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom, background: orb.bg }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <div ref={headingRef} className="text-center mb-16 lg:mb-20">
            <p className="gold-label mb-5">Why Choose Us</p>
            <h2 className="serif text-4xl md:text-5xl xl:text-[3.75rem] text-white font-bold leading-tight mb-6 max-w-3xl mx-auto">
              Excellence In Education<br />
              <em className="text-amber-300/90 font-normal">With Strong Values</em>
            </h2>
            <div className="section-divider max-w-xs mx-auto mb-6" />
            <p className="text-blue-200/50 text-base leading-relaxed max-w-2xl mx-auto">
              The Crescent School combines academic excellence, modern infrastructure, moral education, and inclusive learning to prepare students for a successful future.
            </p>
          </div>

          {/* Achievement Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {achievements.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="achieve-card rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="icon-wrap">{item.icon}</div>
                <div>
                  <h4 className="serif text-white font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-blue-200/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div ref={statsRef} className="stats-bar rounded-2xl py-10 px-6 mb-20">
            <div className="flex flex-wrap justify-around items-center gap-6">
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  <StatCounter {...s} started={statsStarted} />
                  {i < stats.length - 1 && (
                    <div className="stat-divider hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Toppers Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="gold-label mb-3">Student Achievements</p>
                <h3 className="serif text-3xl md:text-4xl text-white font-bold">
                  Our <em className="text-amber-300/90 font-normal">Star Achievers</em>
                </h3>
              </div>
              <p className="text-blue-200/40 text-sm max-w-xs text-right hidden sm:block">
                Celebrating the success stories that inspire generations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toppers.map((t, i) => (
                <div
                  key={t.name}
                  ref={(el) => (topperRefs.current[i] = el)}
                  className="topper-card rounded-3xl overflow-hidden"
                >
                  <div className="glow-border rounded-3xl" />

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img src={t.img} alt={t.name} className="student-img" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(180deg, transparent 40%, #020B2A 100%), linear-gradient(0deg, rgba(0,0,0,0.3), transparent)`
                    }} />
                    {/* Rank badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="badge text-black"
                        style={{ background: t.color }}
                      >
                        {t.rank}
                      </span>
                    </div>
                    {/* Stream tag */}
                    <div className="absolute top-4 left-4">
                      <span className="badge text-white/60" style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${t.color}40` }}>
                        {t.stream}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-4">
                    <h4 className="serif text-white text-xl font-bold mb-1">{t.name}</h4>
                    <p className="text-sm font-medium mb-2" style={{ color: t.color }}>
                      {t.achievement}
                    </p>
                    <div className="section-divider my-3" style={{
                      background: `linear-gradient(90deg, ${t.color}40, transparent)`
                    }} />
                    <div className="flex items-center gap-2">
                      <span className="text-white/25 text-xs">→</span>
                      <p className="text-blue-200/45 text-xs tracking-wide">{t.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="text-center pt-8">
            <div className="section-divider max-w-xs mx-auto mb-8" />
            <p className="serif text-xl md:text-2xl text-white/25 font-light italic">
              "Where every student is a story of achievement."
            </p>
            <p className="gold-label mt-3 opacity-50">The Crescent School</p>
          </div>

        </div>
      </section>
    </>
  );
}