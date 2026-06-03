import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Activities', path: '/activities' },
  { label: 'Information', path: '/information' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Discipline', path: '/discipline' },
  { label: 'Contact', path: '/contact' },
];

const schoolFeatures = ['English Medium', 'Modern Labs', 'Moral Education', 'Smart Learning', 'Sports Training', 'Competitive Preparation'];
const affiliations = ['W.B.B.S.E.', 'W.B.C.H.S.E.', 'NIOS Accredited'];
const socialIcons = ['f', '📸', '▶', '𝕏'];

export default function Footer() {
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  useEffect(() => {
    if (colsRef.current.length > 0) {
      gsap.fromTo(
        colsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200"
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Column 1: School Branding */}
          <div ref={(el) => (colsRef.current[0] = el)} className="opacity-0">
            <div className="mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-4">
                C
              </div>
              <h3 className="font-['Playfair_Display'] font-bold text-2xl text-slate-900 mb-2">
                The Crescent School
              </h3>
              <p className="font-['Inter'] text-sm text-slate-600">Founded 2002</p>
            </div>
            <p className="font-['Inter'] text-sm text-slate-600 leading-relaxed mb-8">
              Providing quality education in a disciplined and healthy environment with modern facilities and moral values.
            </p>
            <div>
              <p className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Affiliations</p>
              <div className="space-y-2">
                {affiliations.map((aff) => (
                  <div key={aff} className="font-['Inter'] text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {aff}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div ref={(el) => (colsRef.current[1] = el)} className="opacity-0">
            <h4 className="font-['Playfair_Display'] font-bold text-slate-900 text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-['Inter'] text-sm text-slate-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-blue-600 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: School Strengths */}
          <div ref={(el) => (colsRef.current[2] = el)} className="opacity-0">
            <h4 className="font-['Playfair_Display'] font-bold text-slate-900 text-lg mb-8">Our Strengths</h4>
            <ul className="space-y-3">
              {schoolFeatures.map((feature) => (
                <li key={feature} className="font-['Inter'] text-sm text-slate-600 flex items-start gap-3">
                  <span className="text-blue-600 flex-shrink-0 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div ref={(el) => (colsRef.current[3] = el)} className="opacity-0">
            <h4 className="font-['Playfair_Display'] font-bold text-slate-900 text-lg mb-8">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="text-blue-600 flex-shrink-0 text-lg">📍</span>
                <div className="flex-1">
                  <p className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Address</p>
                  <p className="font-['Inter'] text-sm text-slate-700">41/1/3 & 41/2/1, Rai Charan Ghosh Lane, Kolkata – 700039</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 flex-shrink-0 text-lg">📞</span>
                <div className="flex-1">
                  <p className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Phone</p>
                  <p className="font-['Inter'] text-sm text-slate-700">+91 (0) 000-000-0000</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 flex-shrink-0 text-lg">✉️</span>
                <div className="flex-1">
                  <p className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Email</p>
                  <p className="font-['Inter'] text-sm text-slate-700">admissions@crescentschool.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-['Inter'] text-sm text-slate-600">
            © 2025 The Crescent School. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socialIcons.map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 hover:text-white hover:bg-blue-600 transition-all duration-300 text-sm font-bold bg-slate-200 hover:scale-105"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="font-['Inter'] text-sm text-slate-600">
            Designed with excellence for modern education
          </p>
        </div>
      </div>
    </footer>
  );
}