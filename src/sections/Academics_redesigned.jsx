import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Academics() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const academicLevels = [
    {
      level: "01",
      title: "Nursery",
      subtitle: "The Wonder Years",
      desc: "Activity-based learning with focus on creative expression, stories, and play-based development.",
    },
    {
      level: "02",
      title: "Primary",
      subtitle: "Building Blocks",
      desc: "Core academic foundation with interactive learning, curiosity-driven exploration, and practical application.",
    },
    {
      level: "03",
      title: "Middle School",
      subtitle: "Expanding Horizons",
      desc: "Analytical thinking development, subject specialization begins, reading and comprehension skills enhanced.",
    },
    {
      level: "04",
      title: "Secondary",
      subtitle: "Academic Excellence",
      desc: "Board exam preparation, disciplined study regimen, concept-focused education, competitive preparation.",
    },
    {
      level: "05",
      title: "Higher Secondary",
      subtitle: "Future Ready",
      desc: "Career-oriented streams, advanced subject specialization, competitive exam support and career counseling.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-28 px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="mb-6">
          <span className="section-label">Quality Education</span>
        </div>

        {/* Heading */}
        <h2 className="font-['Playfair_Display'] font-bold text-5xl md:text-6xl text-slate-900 mb-8 max-w-3xl">
          Academic Programs for Every <span className="text-gradient">Stage</span>
        </h2>

        <p className="font-['Inter'] text-xl text-slate-600 max-w-2xl mb-16">
          From Nursery to Higher Secondary, we provide comprehensive, stage-appropriate education that builds strong foundations and prepares students for future excellence.
        </p>

        {/* Academic Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academicLevels.map((level, idx) => (
            <div
              key={level.level}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="premium-card p-8 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
                    Level {level.level}
                  </p>
                  <h3 className="font-['Playfair_Display'] font-bold text-2xl text-slate-900">
                    {level.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-slate-500 mt-1">{level.subtitle}</p>
                </div>
              </div>
              <p className="font-['Inter'] text-sm text-slate-600 leading-relaxed">
                {level.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-20 pt-20 border-t border-slate-200">
          <h3 className="font-['Playfair_Display'] font-bold text-3xl text-slate-900 mb-12">
            Our Academic Strengths
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🇬🇧", name: "English Medium", desc: "Internationally recognized curriculum" },
              { icon: "📐", name: "Modern Curriculum", desc: "Updated with latest pedagogical approaches" },
              { icon: "💻", name: "Technology Integration", desc: "Smart classrooms and digital learning" },
              { icon: "🔬", name: "Practical Learning", desc: "Lab work and hands-on experiments" },
              { icon: "🌟", name: "Character Development", desc: "Moral and ethical education" },
              { icon: "🏆", name: "Competitive Excellence", desc: "Exam preparation and skill development" },
            ].map((feature, idx) => (
              <div key={idx} className="premium-card p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-2">
                  {feature.name}
                </h4>
                <p className="font-['Inter'] text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
