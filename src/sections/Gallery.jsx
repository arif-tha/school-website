import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Import all gallery images
import blueHouse from "../assets/houses/blue.jpeg";
import greenHouse from "../assets/houses/green.jpeg";
import yellowHouse from "../assets/houses/yellow.jpeg";
import redHouse from "../assets/houses/red.jpeg";
import houses from "../assets/houses/houses.jpeg";
import lab from "../assets/activity/lab.jpeg";
import library from "../assets/activity/library.jpeg";
import playroom from "../assets/activity/playroom.jpeg";
import activity from "../assets/activity/activity.jpeg";
import playground from "../assets/activity/playground.jpeg";
import computerLab from "../assets/activity/computer-lab.jpeg";
import scienceLab from "../assets/activity/science-lab.jpeg";
import turf from "../assets/turf.jpeg";
import anniversary from "../assets/anniversary.jpeg";
import learnings from "../assets/building/learnings.jpeg";
import schoolBuilding from "../assets/building/school building.jpeg";
import sideAngle from "../assets/building/side angle.jpeg";

const GALLERY_IMAGES = [
  { src: schoolBuilding, alt: "School Building" },
  { src: sideAngle, alt: "School Side Angle" },
  { src: learnings, alt: "Students Learning" },
  { src: activity, alt: "Student Activities" },
  { src: anniversary, alt: "School Anniversary" },
  { src: turf, alt: "School Turf" },
];

export const ALL_GALLERY_IMAGES = [
  { src: schoolBuilding, alt: "School Building" },
  { src: sideAngle, alt: "School Side Angle" },
  { src: learnings, alt: "Students Learning" },
  { src: activity, alt: "Student Activities" },
  { src: anniversary, alt: "School Anniversary" },
  { src: turf, alt: "School Turf" },
  { src: playground, alt: "Playground" },
  { src: playroom, alt: "Playroom" },
  { src: library, alt: "Library" },
  { src: lab, alt: "Lab" },
  { src: computerLab, alt: "Computer Lab" },
  { src: scienceLab, alt: "Science Lab" },
  { src: houses, alt: "School Houses" },
  { src: blueHouse, alt: "Blue House" },
  { src: greenHouse, alt: "Green House" },
  { src: yellowHouse, alt: "Yellow House" },
  { src: redHouse, alt: "Red House" },
];

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

export default function Gallery() {
  const headingRef = useRef(null);

  useEffect(() => {
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

        #gallery {
          background: #ffffff;
          position: relative;
          overflow: hidden;
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
          font-size: clamp(2rem, 4vw, 3rem);
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

      <section id="gallery" className="relative py-16 md:py-20 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4" ref={headingRef}>
            <div className="gallery-label mb-4">
              <span className="gallery-label-line"></span>
              OUR GALLERY
              <span className="gallery-label-line"></span>
            </div>

            <h2 className="gallery-heading mb-4">Moments at Our School</h2>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((image, index) => (
              <GalleryImage key={index} image={image} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#004e98] to-[#1e40af] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              View All Photos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
