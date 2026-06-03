import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero entrance
      tl.fromTo(
        headlineRef.current?.querySelectorAll(".word"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
        0
      )
        .fromTo(
          subheadRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );

      // Scroll down indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 1, y: 0 },
        { opacity: 0, y: 20, duration: 1, repeat: -1, ease: "sine.inOut" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <div className="mb-8">
          <span className="section-label justify-center">Excellence in Education</span>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-['Playfair_Display'] font-bold text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-tight mb-8"
        >
          <span className="word">The</span>{" "}
          <span className="word">Art</span>{" "}
          <span className="word text-gradient">of</span>{" "}
          <span className="word">Becoming</span>
        </h1>

        {/* Subheading */}
        <p
          ref={subheadRef}
          className="font-['Inter'] text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Where centuries of scholarly tradition meet the audacity to imagine what has never existed before.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-['Inter'] font-semibold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            Discover Our World
          </button>
          <button className="px-10 py-4 border-2 border-slate-300 text-slate-900 font-['Inter'] font-semibold rounded-full hover:bg-slate-50 hover:border-blue-600 transition-all duration-300">
            Take a Campus Tour
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="font-['Inter'] text-sm text-slate-500 uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
