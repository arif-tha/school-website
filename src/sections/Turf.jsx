import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import turfImage from "../assets/activity/playground.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Turf() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Image reveal
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -40, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Content reveal
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #turf {
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
        }

        .turf-image-frame {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.15);
        }

        .turf-image-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, transparent 50%, rgba(79, 70, 229, 0.2) 100%);
          border-radius: inherit;
          z-index: 0;
          pointer-events: none;
        }

        .turf-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 600;
        }

        .turf-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1e40af;
        }

        .turf-paragraph {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          line-height: 1.85;
          color: #475569;
        }

        .turf-feature {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(79, 70, 229, 0.03) 100%);
          border: 1px solid rgba(37, 99, 235, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .turf-feature:hover {
          border-color: rgba(37, 99, 235, 0.3);
          box-shadow: 0 10px 40px rgba(37, 99, 235, 0.1);
          transform: translateY(-4px);
        }

        .turf-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <section id="turf" className="relative py-20 md:py-28 lg:py-32" ref={sectionRef}>
        {/* Ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(37, 99, 235, 0.2)", borderLeft: "1px solid rgba(37, 99, 235, 0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(37, 99, 235, 0.2)", borderRight: "1px solid rgba(37, 99, 235, 0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT - Image */}
            <div ref={imageRef} className="turf-image-frame">
              <div className="relative z-10" style={{ aspectRatio: "4/3" }}>
                <img 
                  src={turfImage} 
                  alt="International Standard Astro Turf Playground" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 z-20 rounded-xl px-4 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>International Standard</p>
              </div>
            </div>

            {/* RIGHT - Content */}
            <div ref={contentRef} className="flex flex-col gap-8">
              
              {/* Label */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ background: "#2563eb" }} />
                <span className="turf-label">Sports Excellence</span>
              </div>

              {/* Heading */}
              <h2 className="turf-heading">
                Multi-Purpose Astro Turf Playground
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4">
                <p className="turf-paragraph">
                  In our quest to find out ways how to thrive in the days to come, we had acquired 41/1/3 Rai Charan Ghosh Lane, the plot of land lying adjacent to our School building first and then converted it into a small playing ground. Thereafter, astro-turf of international standard was laid upon it and made into a multipurpose playground. It is quite unique of its kind in more ways than one.
                </p>
                
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                
                <div className="turf-feature">
                  <div className="turf-icon">🏏</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e40af", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Multi-Sport Ground</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748b", fontSize: "0.9rem" }}>Football, Cricket & Badminton</p>
                </div>
                <div className="turf-feature">
                  <div className="turf-icon">🏆</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e40af", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Competitive Training</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748b", fontSize: "0.9rem" }}>State level & Subrata Cup preparation</p>
                </div>
                <div className="turf-feature">
                  <div className="turf-icon">💪</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e40af", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Physical Training</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748b", fontSize: "0.9rem" }}>Regular fitness & exercise sessions</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
