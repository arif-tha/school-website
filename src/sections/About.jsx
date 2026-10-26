import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ssImage from "../assets/building/side angle.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const contentSectionsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Image reveal
        if (imageWrapRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { opacity: 0, x: -40, scale: 0.97 },
            {
              opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (imageInnerRef.current) {
          gsap.fromTo(
            imageInnerRef.current,
            { scale: 1.12 },
            {
              scale: 1, duration: 1.4, ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Label
        if (labelRef.current) {
          gsap.fromTo(
            labelRef.current,
            { opacity: 0, y: 16 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
              scrollTrigger: { trigger: labelRef.current, start: "top 85%", once: true },
            }
          );
        }

        // Heading
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
            }
          );
        }

        // Content Sections stagger
        if (contentSectionsRef.current.length > 0) {
          gsap.fromTo(
            contentSectionsRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: contentSectionsRef.current[0],
                start: "top 88%",
                once: true
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const subHeadingSrtyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.25rem",
    color: "#1D395E",
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
    color: "#475569",
    fontWeight: 400,
    marginBottom: "1.5rem"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #about {
          --gold: #C9A96E;
          --bg: #0c0b0e;
          background: var(--bg);
        }

        .about-image-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(201,169,110,0.4) 0%, transparent 50%, rgba(201,169,110,0.15) 100%);
          border-radius: inherit;
          z-index: 0;
        }

        .gold-line {
          background: linear-gradient(to right, #C9A96E, rgba(201,169,110,0.3));
          height: 2px;
          margin: 2rem 0;
        }

        .house-item {
          border-left: 2px solid var(--gold-border, rgba(201,169,110,0.2));
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 50%, rgba(201,169,110,0.04) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 85% 20%, rgba(201,169,110,0.03) 0%, transparent 60%)`,
          }}
        />

        {/* Ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(201,169,110,0.2)", borderLeft: "1px solid rgba(201,169,110,0.2)" }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(201,169,110,0.2)", borderRight: "1px solid rgba(201,169,110,0.2)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — Image */}
            <div ref={imageWrapRef} className="relative about-image-frame rounded-2xl lg:sticky lg:top-32" style={{ opacity: 0 }}>
              <div className="relative z-10 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <div ref={imageInnerRef} className="absolute inset-0 w-full h-full overflow-hidden">
                  <img src={ssImage} alt="The Crescent School Campus" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,6,3,0.7) 0%, transparent 50%)" }} />
                </div>
              </div>
              <div className="absolute -bottom-5 -right-4 md:-right-6 z-20 rounded-xl px-5 py-4" style={{ background: "linear-gradient(135deg, #ffffff, #f1f5f9)", border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(37,99,235,0.1)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1D395E", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>2002</p>
                <p style={{ color: "#64748b", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>Est.</p>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="flex flex-col gap-8">
              
              {/* Label */}
              <div ref={labelRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
                <div className="w-6 h-px" style={{ background: "#1D395E" }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1D395E",
                  fontWeight: 600,
                }}>
                  About The School
                </span>
              </div>

              {/* Heading */}
              <h2
                ref={headingRef}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#1D395E",
                  opacity: 0,
                }}
              >
                A Journey of Academic<br />
                    <span style={{ color: "#1D395E", fontStyle: "italic", fontWeight: 400 }}>Excellence & Values</span>
              </h2>

              {/* Paragraphs */}
              <div className="flex flex-col gap-5">
                <div ref={el => contentSectionsRef.current[0] = el} style={{ opacity: 0 }}>
                  <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                    Founded in 2002 by Shaikh Shamsher Alam, The Crescent School has grown into a respected institution dedicated to quality education, discipline, and character development.
                  </p>
                </div>
                <div ref={el => contentSectionsRef.current[1] = el} style={{ opacity: 0 }}>
                  <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                    Managed by The Crescent Charitable Trust and affiliated with WBBSE and WBCHSE, the school provides an inclusive learning environment that nurtures academic excellence and social responsibility.
                  </p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div 
                ref={el => contentSectionsRef.current[2] = el} 
                style={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-slate-200"
              >
                {[
                  { label: "Established 2002", icon: "✦" },
                  { label: "WBBSE & WBCHSE Affiliated", icon: "✓" },
                  { label: "NIOS Accredited Centre", icon: "★" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ color: "#1D395E", fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ 
                      fontFamily: "'DM Sans', sans-serif", 
                      fontSize: "0.8rem", 
                      color: "#475569", 
                      fontWeight: 500,
                      letterSpacing: "0.02em"
                    }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

          {/* Contact information relocated from the standalone Contact page */}
          <div ref={el => contentSectionsRef.current[4] = el} className="mt-20 md:mt-28" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ background: "#1D395E" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#1D395E",
                fontWeight: 500,
              }}>
                Get in Touch
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#1D395E",
              marginBottom: "1.5rem",
            }}>
              Contact The Crescent School
            </h3>

            <p style={{ ...paragraphStyle, maxWidth: "42rem" }}>
              Have questions about admissions, academics, or school life? We're here to help. Reach out to us through any of the channels below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 group hover:border-[#1D395E] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                    <span className="text-xl">📍</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Address</h4>
                    <a
                      href="https://www.google.com/maps/place/The+Crescent+School/data=!4m2!3m1!1s0x3a0276c6ff7418a9%3A0x8afd46037ff59fa7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-['Inter'] text-base text-slate-600 leading-relaxed transition-colors hover:text-[#1D395E] hover:underline"
                    >
                      41/1/3 & 41/2/1<br />
                      Rai Charan Ghosh Lane<br />
                      Kolkata – 700039<br />
                      West Bengal, India
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 group hover:border-[#1D395E] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                    <span className="text-xl">📞</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Phone</h4>
                    <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                      Admissions: <a href="tel:+913323431562" className="transition-colors hover:text-[#1D395E] hover:underline">+(033) 2343 1562</a><br />
                      <span className="text-sm text-slate-500">Available Monday–Saturday</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 group hover:border-[#1D395E] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Email</h4>
                    <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                      <a href="mailto:admissions@crescentschool.edu" className="transition-colors hover:text-[#1D395E] hover:underline">admissions@crescentschool.edu</a><br />
                      <span className="text-sm text-slate-500">We respond within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 group hover:border-[#1D395E] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                    <span className="text-xl">🕐</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">School Hours</h4>
                    <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                      Monday–Saturday<br />
                      8:00 AM – 3:00 PM<br />
                      <span className="text-sm text-slate-500">Closed on Sundays & Public Holidays</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="font-['Playfair_Display'] font-bold text-3xl text-slate-900 mb-6">Find Us</h4>
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#1D395E]/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.2776933515524!2d88.37735387507644!3d22.53126807952122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276c6ff7418a9%3A0x8afd46037ff59fa7!2sThe%20Crescent%20School!5e0!3m2!1sen!2sin!4v1790104883021!5m2!1sen!2sin"
                  title="The Crescent School location"
                  className="block aspect-video w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-[#1D395E]/10 rounded-2xl p-8 md:p-12 border border-slate-200">
              <h4 className="font-['Playfair_Display'] font-bold text-3xl text-slate-900 mb-6">Office Information</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-3">Admissions Enquiries</h5>
                  <p className="font-['Inter'] text-slate-600 leading-relaxed">
                    For any questions regarding admissions, eligibility, or our academic programs, please feel free to contact our admissions office. We welcome inquiries from parents and students.
                  </p>
                </div>
                <div>
                  <h5 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-3">Campus Visits</h5>
                  <p className="font-['Inter'] text-slate-600 leading-relaxed">
                    We encourage prospective parents to visit our campus. Personalized guided tours can be arranged. Please call our office to schedule your visit at a convenient time.
                  </p>
                </div>
              </div>
            </div>
          </div>

              {/* Button */}
              <div ref={el => contentSectionsRef.current[3] = el} style={{ opacity: 0 }}>
                <Link 
                  to="/about"
                  className="learn-more-btn"
                >
                  Learn More About Us <span>→</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
