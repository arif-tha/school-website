import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HOUSES = [
  {
    id: 1,
    name: 'Einstein House',
    color: 'Red',
    colorCode: '#ef4444',
    icon: '🔬',
    initial: 'E',
    tagline: 'Innovation, Intelligence & Scientific Thinking',
    gradient: 'from-red-50 to-red-100/50'
  },
  {
    id: 2,
    name: 'Tagore House',
    color: 'Blue',
    colorCode: '#3b82f6',
    icon: '🎨',
    initial: 'T',
    tagline: 'Creativity, Literature & Cultural Excellence',
    gradient: 'from-blue-50 to-blue-100/50'
  },
  {
    id: 3,
    name: 'Leonardo House',
    color: 'Yellow',
    colorCode: '#f59e0b',
    icon: '🖌️',
    initial: 'L',
    tagline: 'Art, Vision & Imagination',
    gradient: 'from-yellow-50 to-yellow-100/50'
  },
  {
    id: 4,
    name: 'Khayyam House',
    color: 'Green',
    colorCode: '#10b981',
    icon: '🌿',
    initial: 'K',
    tagline: 'Wisdom, Harmony & Knowledge',
    gradient: 'from-green-50 to-green-100/50'
  }
];

const FloatingBlob = ({ delay, size, color }) => {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${color}`}
      style={{
        width: size,
        height: size,
        animation: `floatAnim 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.15
      }}
    />
  );
};

const HouseCard = ({ house, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-gradient-to-br ${house.gradient} backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden`}
      style={{
        borderLeft: `4px solid ${house.colorCode}`
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${house.colorCode}20, transparent)`,
          boxShadow: `inset 0 0 30px ${house.colorCode}15`
        }}
      />

      {/* Initial badge */}
      <div
        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
        style={{ backgroundColor: house.colorCode }}
      >
        {house.initial}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {house.icon}
        </div>

        {/* House name */}
        <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl mb-1 text-gray-900">
          {house.name}
        </h3>

        {/* Color badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-4"
          style={{ backgroundColor: house.colorCode }}
        >
          {house.color} House
        </div>

        {/* Tagline */}
        <p className="font-['DM_Sans'] text-gray-700 text-sm leading-relaxed">
          {house.tagline}
        </p>

        {/* Decorative line */}
        <div
          className="h-1 w-16 mt-4 rounded-full"
          style={{ backgroundColor: house.colorCode }}
        />
      </div>

      {/* Lift effect on hover */}
      <style>{`
        .group:hover {
          transform: translateY(-12px);
        }
      `}</style>
    </div>
  );
};

const StatementCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative max-w-2xl mx-auto mt-16 px-8 py-12 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg overflow-hidden"
    >
      {/* Animated glow border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(30, 58, 138, 0.1) 50%, transparent 100%)`,
          animation: 'cardGlow 3s ease-in-out infinite'
        }}
      />

      {/* Floating particles */}
      <FloatingBlob delay={0} size="100px" color="bg-blue-400" />
      <FloatingBlob delay={1} size="80px" color="bg-indigo-400" />
      <FloatingBlob delay={2} size="60px" color="bg-purple-400" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <p className="font-['Cormorant_Garamond'] font-bold text-2xl text-gray-900 leading-relaxed">
          School houses inspire students to grow through unity,
          <span className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent"> leadership and excellence.</span>
        </p>
      </div>

      <style>{`
        @keyframes cardGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(30, 58, 138, 0.2);
          }
          50% {
            box-shadow: 0 0 20px 0 rgba(30, 58, 138, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default function HousesSection() {
  const headerRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  return (
    <section id="houses" className="relative w-full px-4 py-20 md:py-32 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8f9fb 0%, #ffffff 50%, #f0f4f8 100%)'
    }}>
      {/* Background floating blobs */}
      <FloatingBlob delay={0} size="300px" color="bg-blue-300" />
      <FloatingBlob delay={2} size="250px" color="bg-indigo-300" />
      <FloatingBlob delay={4} size="200px" color="bg-purple-300" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-['DM_Sans'] text-sm tracking-widest uppercase text-gray-600 font-semibold">
            Community & Values
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-bold text-5xl md:text-6xl text-gray-900 my-4">
            School Houses
          </h2>
          
          {/* Animated divider */}
          <div ref={dividerRef} className="h-1 w-20 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 rounded-full mx-auto mb-6 origin-left" />
          
          <p className="font-['DM_Sans'] text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Students are grouped into houses to encourage teamwork, leadership, discipline and healthy competition.
          </p>
        </div>

        {/* House Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {HOUSES.map((house, index) => (
            <HouseCard key={house.id} house={house} index={index} />
          ))}
        </div>

        {/* Bottom Statement */}
        <StatementCard />
      </div>

      {/* Global animations */}
      <style>{`
        @keyframes floatAnim {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
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
      `}</style>
    </section>
  );
}
