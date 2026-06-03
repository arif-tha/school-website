import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const facilities = [
  {
    title: 'Smart Classrooms',
    desc: '80+ digitally integrated classrooms with interactive boards and AI-assisted learning tools.',
    icon: '🖥️',
    size: 'lg', // col-span-2
    bg: 'linear-gradient(135deg, #1a3a6e 0%, #0f2240 100%)',
    accent: '#38bdf8',
  },
  {
    title: 'Science Labs',
    desc: 'State-of-the-art Physics, Chemistry & Biology labs.',
    icon: '🔬',
    size: 'sm',
    bg: 'linear-gradient(135deg, #0f2240 0%, #1a2f5a 100%)',
    accent: '#2563eb',
  },
  {
    title: 'Sports Complex',
    desc: 'Olympic-size pool, cricket ground & indoor courts.',
    icon: '⚽',
    size: 'sm',
    bg: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)',
    accent: '#f59e0b',
  },
  {
    title: 'Library & Research Hub',
    desc: '30,000+ books, digital resources, and silent study zones for deep learning.',
    icon: '📖',
    size: 'md',
    bg: 'linear-gradient(135deg, #162040 0%, #0d1e38 100%)',
    accent: '#a78bfa',
  },
  {
    title: 'Auditorium',
    desc: '1,200-seat fully equipped auditorium for events, debates and performances.',
    icon: '🎭',
    size: 'md',
    bg: 'linear-gradient(135deg, #0f2240 0%, #1a3560 100%)',
    accent: '#f472b6',
  },
  {
    title: 'Computer Labs',
    desc: '200+ systems with latest hardware.',
    icon: '💻',
    size: 'sm',
    bg: 'linear-gradient(135deg, #0a1f3d 0%, #0a1628 100%)',
    accent: '#34d399',
  },
  {
    title: 'Safe Transport',
    desc: 'GPS-tracked fleet covering all routes.',
    icon: '🚌',
    size: 'sm',
    bg: 'linear-gradient(135deg, #1a2f5a 0%, #0a1628 100%)',
    accent: '#fb923c',
  },
];

export default function Facilities() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelector('.section-header'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );

    itemRefs.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });
  }, []);

  return (
    <section id="facilities" ref={sectionRef} className="relative py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="section-header text-center mb-16 opacity-0">
          <div className="section-tag justify-center">World-Class Infrastructure</div>
          <h2
            className="font-sora font-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Facilities That{' '}
            <span className="text-gradient">Inspire</span>
          </h2>
          <p className="text-white/50 font-inter text-base mt-4 max-w-lg mx-auto">
            Every corner of our campus is designed to spark curiosity, foster collaboration, and support holistic growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {facilities.map((f, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`relative rounded-3xl p-6 overflow-hidden group transition-all duration-500 hover:scale-[1.02] opacity-0 ${
                f.size === 'lg' ? 'col-span-2 row-span-2' :
                f.size === 'md' ? 'col-span-2' : 'col-span-1'
              }`}
              style={{ background: f.bg, border: '1px solid rgba(255,255,255,0.07)', cursor: 'none' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ boxShadow: `inset 0 0 60px ${f.accent}20, 0 0 40px ${f.accent}15`, border: `1px solid ${f.accent}30` }}
              />

              {/* Subtle grid on large card */}
              {f.size === 'lg' && <div className="absolute inset-0 grid-bg opacity-20" />}

              {/* Icon */}
              <div
                className={`relative z-10 mb-auto text-${f.size === 'lg' ? '5xl' : '3xl'} group-hover:scale-110 transition-transform duration-300 inline-block`}
              >
                {f.icon}
              </div>

              <div className={`relative z-10 ${f.size === 'lg' ? 'mt-auto pt-20' : 'mt-4'}`}>
                {/* Accent line */}
                <div className="w-8 h-0.5 mb-3 transition-all duration-300 group-hover:w-16" style={{ background: f.accent }} />

                <h3 className={`font-sora font-bold text-white mb-2 ${f.size === 'lg' ? 'text-2xl' : 'text-base'}`}>
                  {f.title}
                </h3>
                {(f.size === 'lg' || f.size === 'md') && (
                  <p className={`text-white/55 font-inter leading-relaxed ${f.size === 'lg' ? 'text-base' : 'text-sm'}`}>
                    {f.desc}
                  </p>
                )}
              </div>

              {/* Large card decoration */}
              {f.size === 'lg' && (
                <div
                  className="absolute top-6 right-6 w-32 h-32 rounded-full opacity-10"
                  style={{ background: f.accent }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}