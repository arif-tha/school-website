import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const academicLevels = [
  {
    level: "01",
    title: "Nursery",
    subtitle: "The Wonder Years",
    range: "Early Childhood",
    color: "from-amber-400/20 to-yellow-300/10",
    accent: "#F59E0B",
    features: ["Activity-based learning", "Rhymes, stories & games", "Creative expression"],
  },
  {
    level: "02",
    title: "Primary School",
    subtitle: "Building Blocks",
    range: "Class I – V",
    color: "from-sky-400/20 to-blue-300/10",
    accent: "#38BDF8",
    features: ["Core academic foundation", "Curiosity-driven learning", "Interactive classroom activities"],
  },
  {
    level: "03",
    title: "Middle School",
    subtitle: "Expanding Horizons",
    range: "Class VI – VIII",
    color: "from-violet-400/20 to-purple-300/10",
    accent: "#A78BFA",
    features: ["Analytical thinking", "Reading habits", "Practical understanding"],
  },
  {
    level: "04",
    title: "Secondary",
    subtitle: "Academic Discipline",
    range: "Class IX – X",
    color: "from-emerald-400/20 to-teal-300/10",
    accent: "#34D399",
    features: ["Board exam preparation", "Strong academic discipline", "Concept-focused education"],
  },
  {
    level: "05",
    title: "Higher Secondary",
    subtitle: "Future Ready",
    range: "Class XI – XII",
    color: "from-rose-400/20 to-pink-300/10",
    accent: "#FB7185",
    features: ["Career-oriented streams", "Competitive exam support", "Advanced subject specialization"],
  },
];

const streams = [
  { name: "Science", icon: "⚗️", desc: "Physics, Chemistry, Biology & Mathematics" },
  { name: "Commerce", icon: "📊", desc: "Accounts, Economics & Business Studies" },
  { name: "Humanities", icon: "🌐", desc: "History, Political Science & Sociology" },
];

const features = [
  { icon: "🇬🇧", label: "English Medium" },
  { icon: "📐", label: "Modern Curriculum" },
  { icon: "💻", label: "Computer Education" },
  { icon: "🔬", label: "Practical Learning" },
  { icon: "🌟", label: "Character Development" },
];

export default function AcademicsFull() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineLineRef = useRef(null);
  const streamsRef = useRef([]);
  const featuresRef = useRef([]);
  const academicYearRef = useRef(null);
  const teachingRef = useRef(null);

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

    // Timeline line draw
    if (timelineLineRef.current) {
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: timelineLineRef.current, start: "top 75%" },
        }
      );
    }

    // Cards stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, x: 80, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });

    // Streams
    streamsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

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

  const subHeadingStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.25rem",
    color: "#C9A84C",
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

        .glass-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s ease, border-color 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-8px) translateX(4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.2);
        }

        .stream-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.35s ease;
        }
        .stream-card:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-4px);
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

        .level-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1;
          color: rgba(201,168,76,0.15);
          position: absolute;
          top: -8px;
          right: 16px;
          letter-spacing: -0.02em;
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

          <div className="animate-fade-in">
              {/* 1. Academic Year Content */}
              <div ref={academicYearRef} className="mb-24 max-w-4xl">
                <p className="gold-label mb-4">Academic Year</p>
                <h3 className="display-font text-3xl md:text-4xl text-white font-light mb-8">
                  Session <em className="text-amber-300/90">Schedule</em>
                </h3>
                <p style={paragraphStyle}>
                  The school observes the calendar year from January to December as its Academic Session for class Nursery to class X, going by the stipulation of the West Bengal Board of Secondary Education. As for classes XI and XII, the session starts from the month of April of a certain year and goes on up to the month of March of the following year, going by the stipulation of the West Bengal Council of Higher Secondary Education.
                </p>
              </div>

              {/* 2. Teaching and Training Content */}
              <div ref={teachingRef} className="mb-24 max-w-4xl">
                <p className="gold-label mb-4">Teaching and Training</p>
                <h3 className="display-font text-3xl md:text-4xl text-white font-light mb-10">
                  Our Educational <em className="text-amber-300/90">Methodology</em>
                </h3>

                <div className="space-y-12">
                  <div>
                    <span style={subHeadingStyle}>Nursery</span>
                    <p style={paragraphStyle}>
                      At the Nursery level, trained teachers impart training to ensure that development in children takes place in a healthy and natural way. To do so, it becomes important for us to ensure that school going habit grows in every child. Keeping that in view, we try and design innovative activities in class so that children get tempted to come to school regularly which gives us the opportunity to help them learn how to conduct themselves in class, form good habits and speak only when spoken to. They also learn the basics of community living by eating together, playing and cooperating with each other to form habits of order, accuracy and obedience. Learning letters and numbers, rhyming Nursery Rhymes together, playing games, listening to stories, learning handicrafts, doing activities in groups and sense training complete the curriculum.
                    </p>
                  </div>

                  <div>
                    <span style={subHeadingStyle}>Kindergarten</span>
                    <p style={paragraphStyle}>
                      At the Kindergarten level, children are exposed to the three basic skills of learning viz. listening, reading and writing. They are taught to read and write words and sentences and to do basic number works.
                    </p>
                  </div>

                  <div>
                    <span style={subHeadingStyle}>Primary School (Class I–V)</span>
                    <p style={paragraphStyle}>
                      At the Primary School level from class I to class V, the children are introduced to a wider world of academic education, observation, experience, appreciations and a larger sphere of activities to gain knowledge through learning. This is where their learning curve initiates and therefore, sufficient care is taken to ensure that training is imparted in a scientific manner to provide the children with ample scope for initiative and enterprise on their part. Care is taken further to ensure that the curiosity is aroused in children continuously and they are encouraged to ask questions. Such questions are answered in a systematic manner entirely to their satisfaction. That helps them open-up their thought process.
                    </p>
                  </div>

                  <div>
                    <span style={subHeadingStyle}>Middle School (Class VI–VIII)</span>
                    <p style={paragraphStyle}>
                      At the Middle School level from class VI to class VIII, the process of learning through experience and activity by way of contacts with the world of ideas, objects and emotions are furthered. The lessons are planned in such a manner that they lay adequate emphasis on formal studies, cultivating reading habits and developing the sense of involvement to enable them to acquire an outlook and bent of mind oriented to clear, precise and creative thinking.
                    </p>
                  </div>

                  <div>
                    <span style={subHeadingStyle}>Secondary & Higher Secondary</span>
                    <p style={paragraphStyle}>
                      At the Secondary School level i.e., class IX & class X, special emphasis is laid on preparing the students for their first public examination. At the Higher Secondary School level, i.e., Classes XI and XII, courses on Science and Commerce streams are conducted for both the girls and the boys, and Humanities stream for the girls only. The core subjects for science stream are Physics, Chemistry, Mathematics, Biology and Computer Application. The core subjects for Commerce stream are Accountancy, Business Studies, Costing & Taxation, Economics and Computer Applications. As for Humanities stream, the core subjects are Political Science, Education, Economics, Sociology and History. The syllabi set by West Bengal Board of Secondary Education and West Bengal Council of Higher Secondary Education are followed meticulously for Madhyamik and Higher Secondary Examinations respectively, and the methodology prescribed by the expert Committees of the WBBSE and the WBCHSE are put into practice. Special care is taken at the Higher Secondary level to equip the students with knowledge required for competitive examinations in pursuit of higher academics viz. Engineering, Medical Science, Juridical Science and Accountancy professions. Apart from that, we try and cultivate in our students the right kind of temperament required to take on the challenges of higher education and inculcate in them the required technique and skills to handle such challenges effectively. Paramount importance is attached to inculcate the right spirit of competitiveness in the students, boost their self-esteem high so that they could pursue higher education with confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Student Journey / Learning Journey Timeline */}
              <div className="divider-line mb-20" />
              <div className="mb-10">
                 <p className="gold-label mb-4 text-center">Student Journey</p>
                 <h3 className="display-font text-3xl md:text-5xl text-white font-light text-center">
                    Learning <em className="text-amber-300/90">Journey</em>
                 </h3>
              </div>

              <div className="grid lg:grid-cols-[1fr_3px_1fr] gap-0 lg:gap-6 mb-24">
                {/* Left column (even cards) */}
                <div className="hidden lg:flex flex-col gap-8 pt-16">
                  {academicLevels.filter((_, i) => i % 2 === 0).map((lvl, i) => {
                    const originalIndex = i * 2;
                    return (
                      <div
                        key={lvl.level}
                        ref={(el) => (cardsRef.current[originalIndex] = el)}
                        className="glass-card rounded-2xl p-6 relative overflow-hidden cursor-default"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${lvl.color} rounded-2xl`} />
                        <span className="level-number">{lvl.level}</span>
                        <div className="relative z-10">
                          <p className="text-xs font-medium mb-1" style={{ color: lvl.accent, letterSpacing: "0.1em" }}>
                            {lvl.range}
                          </p>
                          <h3 className="display-font text-2xl text-white font-semibold mb-1">{lvl.title}</h3>
                          <p className="text-white/40 text-xs mb-4 italic">{lvl.subtitle}</p>
                          <ul className="space-y-1.5">
                            {lvl.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-blue-100/60 text-sm">
                                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: lvl.accent }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center timeline line */}
                <div className="hidden lg:flex flex-col items-center py-4">
                  <div
                    ref={timelineLineRef}
                    className="w-px flex-1 rounded-full"
                    style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.5) 15%, rgba(201,168,76,0.5) 85%, transparent)" }}
                  />
                </div>

                {/* Right column (odd cards) */}
                <div className="flex flex-col gap-8 lg:pt-36">
                  {academicLevels.map((lvl, i) => {
                    const showOnMobile = true;
                    const showOnDesktop = i % 2 !== 0;
                    return (
                      <div
                        key={lvl.level}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={`${showOnDesktop ? "lg:block" : "lg:hidden"} glass-card rounded-2xl p-6 relative overflow-hidden cursor-default`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${lvl.color} rounded-2xl`} />
                        <span className="level-number">{lvl.level}</span>
                        <div className="relative z-10">
                          <p className="text-xs font-medium mb-1" style={{ color: lvl.accent, letterSpacing: "0.1em" }}>
                            {lvl.range}
                          </p>
                          <h3 className="display-font text-2xl text-white font-semibold mb-1">{lvl.title}</h3>
                          <p className="text-white/40 text-xs mb-4 italic">{lvl.subtitle}</p>
                          <ul className="space-y-1.5">
                            {lvl.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-blue-100/60 text-sm">
                                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: lvl.accent }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Higher Secondary Streams */}
              <div className="divider-line mb-16" />
              <div className="mb-6">
                <p className="gold-label mb-3">Higher Secondary Streams</p>
                <h3 className="display-font text-3xl md:text-4xl text-white font-light">
                  Choose Your <em className="text-amber-300/90">Path</em>
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {streams.map((s, i) => (
                  <div
                    key={s.name}
                    ref={(el) => (streamsRef.current[i] = el)}
                    className="stream-card rounded-2xl p-7 cursor-default"
                  >
                    <div className="text-3xl mb-4">{s.icon}</div>
                    <h4 className="display-font text-2xl text-white font-semibold mb-2">{s.name}</h4>
                    <p className="text-blue-200/50 text-sm leading-relaxed">{s.desc}</p>
                    <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                      <span className="text-amber-300/50 text-xs tracking-widest uppercase">Available at Crescent</span>
                    </div>
                  </div>
                ))}
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
