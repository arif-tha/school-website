import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      // Title
      timeline.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 1.2, ease: "power3.out" },
        0
      );

      // Subtitle
      timeline.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        0.2
      );

      // Description
      timeline.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.4
      );

      // CTA Buttons
      timeline.fromTo(
        ctaContainerRef.current?.querySelectorAll("a, button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        0.6
      );

      // Scroll Indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 }
      );

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current?.querySelector(".scroll-arrow"), {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-slate-50 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-slate-100 to-transparent opacity-30 blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Small Label */}
        <div className="mb-8">
          <span className="font-['Inter'] font-semibold text-sm uppercase tracking-widest text-blue-600">
            Welcome to Excellence
          </span>
        </div>

        {/* Main Heading */}
        <h1
          ref={titleRef}
          className="font-['Playfair_Display'] font-bold text-6xl md:text-7xl lg:text-8xl text-slate-900 mb-6 leading-tight"
        >
          The <span className="text-gradient">Crescent</span> School
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-['Cormorant_Garamond'] font-normal text-2xl md:text-3xl text-slate-700 mb-8 font-light"
        >
          Building Future Leaders Through Quality Education
        </p>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="font-['Inter'] text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Since 2002, we've been dedicated to providing exceptional education that combines academic excellence with holistic development. Join our community of over 5000 students who are achieving their dreams.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaContainerRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#about"
            className="font-['Inter'] font-semibold px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="font-['Inter'] font-semibold px-10 py-4 rounded-full border-2 border-blue-600 text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:-translate-y-1"
          >
            Contact Us
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="font-['Inter'] text-xs uppercase tracking-widest text-slate-500">
              Scroll to explore
            </p>
            <svg
              className="scroll-arrow w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Elements (Optional decorative animations) */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-20 animation-float" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-300 rounded-full opacity-15 animation-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-slate-300 rounded-full opacity-10 animation-float" style={{ animationDelay: "2s" }} />
    </section>
  );
}
