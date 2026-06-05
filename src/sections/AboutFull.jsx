import React, { useEffect, useRef } from "react";
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
    color: "#C9A96E",
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #about-section {
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
        id="about-section"
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
              <div className="absolute -bottom-5 -right-4 md:-right-6 z-20 rounded-xl px-5 py-4" style={{ background: "linear-gradient(135deg, #1a1508, #100d04)", border: "1px solid rgba(201,169,110,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A96E", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>2002</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>Est.</p>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="flex flex-col">
              
              <div ref={labelRef} className="flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
                <div className="w-6 h-px" style={{ background: "#C9A96E" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
                  Institutional Profile
                </span>
              </div>

              <h2
                ref={headingRef}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#f5efe0",
                  marginBottom: "2.5rem",
                  opacity: 0,
                }}
              >
                About The <span style={{ color: "#C9A96E" }}>School</span>
              </h2>

              <div className="space-y-12">
                {/* 1. ABOUT THE SCHOOL / BACKGROUND */}
                <div ref={el => contentSectionsRef.current[0] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>About The School / Background</span>
                  <p style={paragraphStyle}>
                    The Crescent School was founded by a Philanthropist, Shaikh Shamsher Alam, in the year 2002 to impart quality education in a well-disciplined and healthy environment. Subsequently, the overall control of the school was handed over to The Crescent Charitable Trust, a non-proprietary and a non-profit making organisation, working towards excellence in education.
                  </p>
                  <p style={paragraphStyle}>
                    The School is affiliated to both West Bengal Board of Secondary Education and West Bengal Council of Higher Secondary Education. Further, it is also an accredited centre of the National Institute of Open Schooling (NIOS). The School is declared as a Minority Educational Institution by the Government of India. The School was established with a view to contribute significantly to inclusive national progress by providing high quality education particularly to the socially and economically deprived strata of the society.
                  </p>
                </div>

                {/* 2. OUR MISSION */}
                <div ref={el => contentSectionsRef.current[1] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>Our Mission</span>
                  <p style={paragraphStyle}>
                    Success of any nation depends on the education level of its people, all of its people. However, quality education imparted in a healthy environment has remained beyond the reach of many. The Crescent School aims at bridging this gap by providing quality education in an excellent learning environment, having all the infrastructural support of the modern day, to all sections of the society, particularly the socially and economically deprived strata.
                  </p>
                  <p style={paragraphStyle}>
                    This is done with a view to enable the students from under-privileged society to unfold their hitherto suppressed potentialities and to excel in the field of education. The school thrives constantly to provide wide opportunities to pupils for them to develop, nurture and stimulate their creative thoughts and to inculcate in them the spirit to achieve excellence in both academic and social lives.
                  </p>
                  <p style={paragraphStyle}>
                    Huge emphasis is laid on the efforts to ensure that the pupils imbibe intellectual honesty, develop positive attitude, show concern over common good, and respect composite Indian values while maintaining the secular character and modern outlook, nevertheless.
                  </p>
                </div>

                {/* 3. MEDIUM OF INSTRUCTION */}
                <div ref={el => contentSectionsRef.current[2] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>Medium of Instruction</span>
                  <p style={paragraphStyle}>
                    The medium of instruction of the school is English. However, considering the linguistic proclivity of some students, at times verbal discussions in Hindi too is resorted to for better conceptual understanding.
                  </p>
                  <p style={paragraphStyle}>
                    Choice of Hindi, Bengali and Urdu as vernacular subjects are offered. Equal importance is attached to all the languages to ensure that the pupils imbibe sound knowledge in both their first language and second language, as they form the very basis of effective communication.
                  </p>
                  <p style={paragraphStyle}>
                    A third language is taught from class III to class VIII compulsorily and the pupils are allowed freedom to opt between Urdu, Bengali and Hindi subjects. Urdu is considered at the Higher Secondary Level as a main Vernacular subject.
                  </p>
                </div>

                {/* 4. SCHOOL STRUCTURE */}
                <div ref={el => contentSectionsRef.current[3] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>School Structure</span>
                  <p style={paragraphStyle}>
                    The Crescent School is affiliated to the West Bengal Board of Secondary Education and the West Bengal Council of Higher Secondary Education.
                  </p>
                  <p style={paragraphStyle}>
                    The school operates in two sessions, separately for girls and boys. While the morning session is exclusively for the girls, the afternoon session belongs to the boys only. Both the sessions have Nursery, LKG, UKG and Classes from I to XII.
                  </p>
                  <p style={paragraphStyle}>
                    The school takes admission of students in Nursery and in other classes upto class VIII, subject to availability of seats.
                  </p>
                  <p style={paragraphStyle}>
                    Children aged 3 years plus are admitted to Nursery, and the age for admission to LKG is 4+ years, UKG is 5+ years, and Class I is 6+ years.
                  </p>
                  <p style={paragraphStyle}>
                    Age for every higher class increases by 1 year successively and the cut-off date for the eligible age is October 31 of the current year.
                  </p>
                  <p style={paragraphStyle}>
                    Applications for admission are accepted offline and online in the months of October and November every year, and admissions are taken based on Admission Test and interviews.
                  </p>
                </div>

                {/* 5. ACADEMIC YEAR */}
                <div ref={el => contentSectionsRef.current[4] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>Academic Year</span>
                  <p style={paragraphStyle}>
                    The school observes the calendar year from January to December as its Academic Session for class Nursery to class X, going by the stipulation of the West Bengal Board of Secondary Education.
                  </p>
                  <p style={paragraphStyle}>
                    As for classes XI and XII, the session starts from the month of April of a certain year and goes on up to the month of March of the following year, going by the stipulation of the West Bengal Council of Higher Secondary Education.
                  </p>
                </div>

                {/* 6. CHARACTER EDUCATION */}
                <div ref={el => contentSectionsRef.current[5] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>Character Education</span>
                  <p style={paragraphStyle}>Character building is the highest goal of education.</p>
                  <p style={paragraphStyle}>Morality and Values of life define the vision of people and inspire their dreams to accomplish a fulfilling life.</p>
                  <p style={paragraphStyle}>As such, special care has been taken at the time of preparing the school curricula to ensure that Morality and Values of life get proper emphasis.</p>
                  <p style={paragraphStyle}>The school endeavours to instil in its pupil certain essential virtues of life that are avowed by all the religious, philosophical and cultural traditions.</p>
                  <p style={paragraphStyle}>They are wisdom, justice, obedience, abstinence, integrity, fortitude, love, positive attitude, gratitude, humility and hard work.</p>
                </div>

                {/* 7. SCHOOL HOUSES */}
                <div ref={el => contentSectionsRef.current[6] = el} style={{ opacity: 0 }}>
                  <span style={subHeadingSrtyle}>School Houses</span>
                  <p style={paragraphStyle}>
                    The students are grouped under four Houses for the convenience of organising intra-class first and then inter-house activities and competitions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="house-item">
                      <span style={{ color: "#ff4d4d", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>Einstein</span>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Red House</p>
                    </div>
                    <div className="house-item">
                      <span style={{ color: "#4d94ff", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>Tagore</span>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Blue House</p>
                    </div>
                    <div className="house-item">
                      <span style={{ color: "#ffd633", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>Leonardo</span>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Yellow House</p>
                    </div>
                    <div className="house-item">
                      <span style={{ color: "#4dff88", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>Khayyam</span>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Green House</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}