import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

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
        contentRef.current?.querySelectorAll(".about-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="mb-6">
          <span className="section-label">Who We Are</span>
        </div>

        {/* Main Heading */}
        <h2
          ref={headingRef}
          className="font-['Playfair_Display'] font-bold text-5xl md:text-6xl text-slate-900 mb-12 leading-tight max-w-3xl"
        >
          A Legacy of Learning Since <span className="text-gradient">2002</span>
        </h2>

        {/* Content Grid */}
        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left Column */}
          <div className="about-item">
            <p className="font-['Inter'] text-xl text-slate-700 leading-relaxed mb-8">
              The Crescent School stands as a beacon of educational excellence, providing comprehensive schooling from Nursery to Higher Secondary. Our commitment to fostering holistic development ensures that every student emerges as a well-rounded individual prepared for the challenges of the modern world.
            </p>
            <p className="font-['Inter'] text-lg text-slate-600 leading-relaxed">
              With over two decades of experience, we have established a strong foundation built on academic rigor, moral values, and innovative pedagogical approaches that inspire students to achieve their fullest potential.
            </p>
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-6">
            {[
              { title: "Academic Excellence", desc: "English Medium education with modern curriculum and competitive exam preparation" },
              { title: "Holistic Development", desc: "Sports, arts, and cultural activities alongside rigorous academics" },
              { title: "Modern Facilities", desc: "State-of-the-art labs, libraries, auditoriums, and digital learning platforms" },
            ].map((item, idx) => (
              <div key={idx} className="about-item premium-card p-6">
                <h4 className="font-['Cormorant_Garamond'] font-bold text-xl text-slate-900 mb-3">
                  {item.title}
                </h4>
                <p className="font-['Inter'] text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
