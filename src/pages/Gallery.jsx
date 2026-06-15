import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import { ALL_GALLERY_IMAGES } from "../sections/Gallery";

gsap.registerPlugin(ScrollTrigger);

function GalleryImage({ image, index }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={imgRef}
      className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-square"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-medium text-sm">{image.alt}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const headingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        #full-gallery {
          background: #ffffff;
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .gallery-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #004e98;
          font-weight: 700;
          animation: fadeInUp 0.6s ease-out forwards;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gallery-label-line {
          height: 2px;
          width: 40px;
          background: #004e98;
        }

        .gallery-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          color: #1e293b;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.25rem;
          margin-top: 3rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div id="full-gallery">
        <Navbar />
        
        {/* Page Content */}
        <section className="pt-24 pb-20">
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8" ref={headingRef}>
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-[#004e98] hover:text-[#1e40af] transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>

              <div className="gallery-label mb-4">
                <span className="gallery-label-line"></span>
                COMPLETE GALLERY
                <span className="gallery-label-line"></span>
              </div>

              <h1 className="gallery-heading mb-4">All Moments at Our School</h1>
            </div>

            {/* Full Gallery Grid */}
            <div className="gallery-grid">
              {ALL_GALLERY_IMAGES.map((image, index) => (
                <GalleryImage key={index} image={image} index={index} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
