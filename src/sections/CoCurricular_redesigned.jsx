import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoCurricular() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activities = [
    {
      category: "Sports",
      items: [
        { name: "Cricket", desc: "Indoor and outdoor cricket fields with coaching" },
        { name: "Badminton", desc: "Professional courts with trained instructors" },
        { name: "Football", desc: "Championship-standard playing grounds" },
        { name: "Basketball", desc: "Indoor courts with modern amenities" },
        { name: "Table Tennis", desc: "Multiple tables with expert coaching" },
        { name: "Athletics", desc: "Track and field facilities" },
      ],
    },
    {
      category: "Arts & Culture",
      items: [
        { name: "Music", desc: "Vocal and instrumental training programs" },
        { name: "Dance", desc: "Classical and contemporary dance forms" },
        { name: "Theatre", desc: "Drama club with regular productions" },
        { name: "Visual Arts", desc: "Painting, drawing, and sculpture studio" },
        { name: "Debate Club", desc: "Public speaking and debate competitions" },
        { name: "Literary Club", desc: "Creative writing and poetry workshops" },
      ],
    },
    {
      category: "STEM Activities",
      items: [
        { name: "Robotics Club", desc: "Robotics design and programming" },
        { name: "Coding Club", desc: "Programming and web development" },
        { name: "Science Club", desc: "Experiments and scientific exploration" },
        { name: "Math Club", desc: "Problem-solving and olympiad preparation" },
        { name: "Tech Lab", desc: "Latest technology and innovation hub" },
        { name: "Maker Space", desc: "DIY projects and prototyping" },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="mb-6">
          <span className="section-label">Enrichment Beyond Classrooms</span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-['Playfair_Display'] font-bold text-5xl md:text-6xl text-slate-900 mb-8 max-w-3xl"
        >
          Co-Curricular <span className="text-gradient">Activities</span>
        </h2>

        <p className="font-['Inter'] text-xl text-slate-600 max-w-2xl mb-16">
          We believe in the holistic development of every student. Our diverse range of co-curricular activities help students discover their talents and build confidence.
        </p>

        {/* Activities by Category */}
        <div className="space-y-16">
          {activities.map((category, idx) => (
            <div key={category.category}>
              <h3 className="font-['Playfair_Display'] font-bold text-3xl text-slate-900 mb-8">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((activity, itemIdx) => (
                  <div
                    key={activity.name}
                    ref={(el) => {
                      if (el) cardsRef.current[idx * 6 + itemIdx] = el;
                    }}
                    className="premium-card p-6 hover:border-blue-300 transition-all"
                  >
                    <h4 className="font-['Cormorant_Garamond'] font-bold text-xl text-slate-900 mb-2">
                      {activity.name}
                    </h4>
                    <p className="font-['Inter'] text-sm text-slate-600">
                      {activity.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 pt-20 border-t border-slate-200">
          <h3 className="font-['Playfair_Display'] font-bold text-3xl text-slate-900 mb-12">
            Why Co-Curricular Activities Matter
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Confidence Building", desc: "Students learn to express themselves and develop self-esteem" },
              { title: "Skill Development", desc: "Discover and nurture hidden talents and abilities" },
              { title: "Leadership Skills", desc: "Take on responsibilities and lead teams" },
              { title: "Teamwork", desc: "Learn collaboration and group dynamics" },
              { title: "Stress Relief", desc: "Balance academics with enjoyable physical and creative activities" },
              { title: "Social Development", desc: "Build lasting friendships and social connections" },
            ].map((benefit, idx) => (
              <div key={idx} className="premium-card p-6">
                <h4 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="font-['Inter'] text-sm text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
