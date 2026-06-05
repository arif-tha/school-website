import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder Image Variables - Replace these with real school photographs
const playroomImage = "https://images.unsplash.com/photo-1566350600484-7231730bbac4?q=80&w=2070&auto=format&fit=crop";
const canteenImage = "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1974&auto=format&fit=crop";
const infirmaryImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop";
const curricularImage = "https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop";
const computerLabImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";
const scienceLabImage = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop";
const libraryImage = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop";

const facilitiesData = [
  {
    title: "Playroom for the Kids",
    desc: "In addition to the regular classrooms the school has a playroom for the Nursery and KG students. The playroom is equipped with educational toys, learning aids and audio-visual gadgets for effective teaching.",
    icon: "🧸",
    image: playroomImage,
    tag: "Early Learning"
  },
  {
    title: "Canteen",
    desc: "The School canteen offers the students a choice of having clean, fresh and hygienic food at affordable prices. We ensure that our students have access to nutritious meals in a pleasant environment.",
    icon: "🍱",
    image: canteenImage,
    tag: "Dining"
  },
  {
    title: "Infirmary",
    desc: "The school has a room that is fully equipped to look after students taking ill suddenly and to handle unforeseen medical requirements. A dedicated space for health and safety.",
    icon: "🏥",
    image: infirmaryImage,
    tag: "Health & Safety"
  },
  {
    title: "Curricular Activities",
    desc: "The school offers quite a wide variety of curricular activities that include indoor and outdoor games, physical training, public speaking, quizzing, science projects, community service projects and others.",
    icon: "🏆",
    image: curricularImage,
    tag: "Activities"
  },
  {
    title: "Computer Laboratory",
    desc: "The school has an air-conditioned computer laboratory that is equipped with a pool of latest computers having access to Multimedia and Internet. We enable students to keep pace with international standards of computer education.",
    icon: "💻",
    image: computerLabImage,
    tag: "Tech Center"
  },
  {
    title: "Science Laboratories",
    desc: "Separate laboratories for Physics, Chemistry and Biological Sciences that fulfill all faculty and student requirements. They help students understand scientific phenomena through close observation and creative inquisitiveness.",
    icon: "🔬",
    image: scienceLabImage,
    tag: "Innovation"
  },
  {
    title: "Library",
    desc: "The school library is well stocked with a wide range of titles. It is our honest endeavour to try and cultivate deep reading habits and intellectual curiosity among the students.",
    icon: "📚",
    image: libraryImage,
    tag: "Research"
  }
];

export default function FacilitiesFull() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const text = row.querySelector(".facility-text");
      const image = row.querySelector(".facility-image-wrap");

      gsap.fromTo(text,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        { 
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 75%", once: true }
        }
      );

      gsap.fromTo(image,
        { opacity: 0, scale: 0.9, x: i % 2 === 0 ? 60 : -60 },
        { 
          opacity: 1, scale: 1, x: 0, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 75%", once: true }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .facilities-full-page {
          background: #03092E;
          color: white;
          overflow-x: hidden;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        
        .premium-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .gold-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C;
          border-left: 2px solid #C9A84C;
          padding-left: 1rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .facility-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #f5efe0;
        }

        .facility-desc {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
          max-width: 500px;
        }

        .image-shadow-overlay {
          background: linear-gradient(to top, rgba(3, 9, 46, 0.8) 0%, transparent 40%);
        }

        .grain-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <section className="facilities-full-page grain-bg relative min-h-screen">
        
        {/* Page Header */}
        <div className="pt-24 pb-12 px-6 text-center">
          <h1 className="display-font text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6">
            Our <em className="text-amber-300/90 italic font-light">Infrastructure</em>
          </h1>
          <div className="w-24 h-[1px] bg-amber-400/30 mx-auto" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          {facilitiesData.map((facility, i) => (
            <div
              key={i}
              ref={el => rowsRef.current[i] = el}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32 lg:mb-48 ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="facility-text flex-1">
                <span className="gold-tag">{facility.tag}</span>
                <div className="text-4xl mb-6 opacity-80">{facility.icon}</div>
                <h2 className="facility-title display-font font-bold">
                   {facility.title}
                </h2>
                <p className="facility-desc body-font">
                   {facility.desc}
                </p>
              </div>

              {/* Image Side */}
              <div className="facility-image-wrap flex-1 w-full lg:w-1/2">
                <div className="relative group overflow-hidden rounded-[3rem] premium-glass lg:aspect-[4/5] xl:aspect-[3/2]">
                   <img 
                      src={facility.image} 
                      alt={facility.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 image-shadow-overlay" />
                   
                   {/* Luxury Border Ornament */}
                   <div className="absolute inset-6 border border-white/10 rounded-[2rem] pointer-events-none transition-all duration-500 group-hover:border-amber-400/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
