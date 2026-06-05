import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnniversaryBanner() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const contentRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Number reveal animation & internal counter
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(numberRef.current,
      { opacity: 0, scale: 0.8, x: -30 },
      { 
        opacity: 1, scale: 1, x: 0, 
        duration: 1.2, 
        ease: "power4.out",
        onStart: () => {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: 25,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.val))
          });
        }
      },
      "-=0.5"
    )
    .fromTo(contentRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Subtle floating animation for the big 25
    gsap.to(numberRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .anniversary-banner {
          background: linear-gradient(135deg, #020924 0%, #05103E 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        
        .silver-glass {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .jubilee-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(192, 192, 192, 0.3);
          color: #D1D5DB;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }

        .large-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(8rem, 15vw, 12rem);
          font-weight: 700;
          line-height: 0.8;
          color: rgba(255,255,255,0.03);
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          position: relative;
        }
        .large-number-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #FFFFFF 0%, #C0C0C0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.2));
        }

        .anniversary-glow {
          position: absolute;
          top: 50%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .silver-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #9CA3AF;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>

      <section ref={sectionRef} className="anniversary-banner py-20 px-6 sm:px-12 lg:px-20">
        <div className="anniversary-glow" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
          
          {/* Big Number Section */}
          <div ref={numberRef} className="flex-shrink-0 relative group">
            <div className="large-number select-none">
              {count}
              <div className="large-number-fill">
                {count}
              </div>
            </div>
            <div className="absolute -bottom-4 right-0 transform translate-x-1/2">
               <span className="jubilee-badge px-4 py-1.5 rounded-full whitespace-nowrap">
                  🏆 SILVER JUBILEE YEAR
               </span>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
             <div className="mb-4">
                <h4 className="silver-tagline mb-2">2002 — 2027</h4>
                <h2 className="display-font text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  <span className="font-bold">25 Years</span> of <br />
                  <em className="text-gray-300 italic">Excellence</em>
                </h2>
             </div>
             
             <p className="body-font text-gray-400 text-lg leading-relaxed max-w-xl mb-8 font-light">
                Celebrating 25 glorious years of academic excellence, character building, and shaping future generations through quality education.
             </p>

             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="h-px w-8 bg-white/20" />
                <span className="silver-tagline text-[10px]">Inspiring Minds • Building Character • Shaping Futures</span>
                <div className="h-px w-8 bg-white/20" />
             </div>
          </div>

        </div>
      </section>
    </>
  );
}
