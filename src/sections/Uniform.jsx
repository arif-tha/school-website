import React, { useState } from "react";

const CLASSES_NURSERY_TO_X = {
  boys: [
    "White half/full sleeved bush shirt",
    "School logo embossed on breast pocket",
    "Peacock blue shorts or trousers",
    "Blue school belt",
    "Blue school neck-tie",
    "White socks",
    "Black leather shoes",
  ],
  girls: [
    "White half-sleeved front open shirt",
    "Peacock blue tunic with school logo",
    "Blue school necktie",
    "White socks",
    "Black leather shoes",
    "Girls aged 11+: White salwar, Peacock blue jumper, White dupatta",
    "Hijab: White hijab with peacock blue borders",
  ],
  winter: ["Navy blue sweater or blazer"],
};

const CLASSES_XI_XII = {
  boys: [
    "Blue pin striped half sleeved bush shirt",
    "School logo on breast pocket",
    "Navy blue trousers",
    "School belt",
    "Navy blue & peacock blue striped tie",
    "White socks",
    "Black leather shoes",
  ],
  girls: [
    "Blue pin striped half sleeved jumper",
    "Navy blue dupatta",
    "Navy blue salwar",
    "White socks",
    "Black leather shoes",
    "Hijab: White hijab with peacock blue borders",
  ],
  winter: ["Navy blue sweater or blazer"],
};

const FEATURES = [
  { title: "Discipline", icon: "📋", color: "from-blue-500 to-blue-600" },
  { title: "Identity", icon: "🎓", color: "from-indigo-500 to-indigo-600" },
  { title: "Equality", icon: "⚖️", color: "from-cyan-500 to-blue-600" },
  { title: "Presentation", icon: "✨", color: "from-purple-500 to-pink-500" },
];

const TabContent = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
    {/* Boys */}
    <div className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="h-40 bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-transparent" />
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">👨‍🎓</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Boys Uniform
        </h3>
        <ul className="space-y-2">
          {data.boys.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">▪</span>
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Girls */}
    <div className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animation-delay-100">
      <div className="h-40 bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-transparent" />
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">👩‍🎓</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Girls Uniform
        </h3>
        <ul className="space-y-2">
          {data.girls.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">▪</span>
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Winter */}
    <div className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animation-delay-200">
      <div className="h-40 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-transparent to-transparent" />
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🧥</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Winter Uniform
        </h3>
        <ul className="space-y-2">
          {data.winter.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-indigo-500 mt-1">▪</span>
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default function Uniform() {
  const [activeTab, setActiveTab] = useState("nursery");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        #uniform {
          background: linear-gradient(135deg, #f8f9fb 0%, #ffffff 50%, #f0f4f8 100%);
          position: relative;
          overflow: hidden;
        }

        #uniform::before {
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

        .uniform-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1e3a8a;
          font-weight: 600;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .uniform-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0c0b0e;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .uniform-divider {
          background: linear-gradient(to right, #1e3a8a, rgba(30, 58, 138, 0.2));
          height: 2px;
          animation: scaleIn 0.8s ease-out forwards;
          animation-delay: 0.2s;
          transform-origin: left;
        }

        .uniform-description {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .uniform-tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 2px solid rgba(30, 58, 138, 0.1);
          margin-bottom: 2rem;
          overflow-x: auto;
        }

        .uniform-tab {
          padding: 1rem 2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(12, 11, 14, 0.5);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .uniform-tab.active {
          color: #1e3a8a;
          border-bottom-color: #1e3a8a;
        }

        .uniform-tab:hover {
          color: #1e3a8a;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-card:nth-child(1) { animation-delay: 0.4s; }
        .feature-card:nth-child(2) { animation-delay: 0.5s; }
        .feature-card:nth-child(3) { animation-delay: 0.6s; }
        .feature-card:nth-child(4) { animation-delay: 0.7s; }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
          border-color: rgba(30, 58, 138, 0.3);
        }

        .uniform-note {
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(75, 85, 180, 0.05) 100%);
          border-left: 4px solid #1e3a8a;
          border-radius: 0.75rem;
          padding: 2rem;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #0c0b0e;
          font-weight: 500;
          line-height: 1.8;
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s !important;
        }

        .animation-delay-200 {
          animation-delay: 0.2s !important;
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (max-width: 768px) {
          .uniform-tabs {
            gap: 0.5rem;
          }

          .uniform-tab {
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .uniform-tab {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .uniform-heading {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
          }
        }
      `}</style>

      <section id="uniform" className="relative py-20 md:py-28 lg:py-32">
        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(30, 58, 138, 0.2)", borderLeft: "1px solid rgba(30, 58, 138, 0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(30, 58, 138, 0.2)", borderRight: "1px solid rgba(30, 58, 138, 0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="uniform-label mb-4 flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
              SCHOOL DRESS CODE
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
            </div>

            <h2 className="uniform-heading mb-6">School Uniform</h2>

            <div className="uniform-divider w-16 mb-6" />

            <p className="uniform-description text-gray-700 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.85 }}>
              Neatness, discipline and identity reflected through a well-structured uniform system.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <div key={i} className={`feature-card bg-gradient-to-br ${feature.color}`}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#1e3a8a" }}>
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="uniform-tabs">
              <button onClick={() => setActiveTab("nursery")} className={`uniform-tab ${activeTab === "nursery" ? "active" : ""}`}>
                Classes Nursery to X
              </button>
              <button onClick={() => setActiveTab("senior")} className={`uniform-tab ${activeTab === "senior" ? "active" : ""}`}>
                Classes XI & XII
              </button>
            </div>

            {/* Tab Content */}
            <div key={activeTab}>
              <TabContent data={activeTab === "nursery" ? CLASSES_NURSERY_TO_X : CLASSES_XI_XII} />
            </div>
          </div>

          {/* Note */}
          <div className="uniform-note mt-16">
            <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>📌</span>
            Students are expected to attend school in neat, proper and complete school uniform at all times.
          </div>
        </div>
      </section>
    </>
  );
}
