import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const MENU_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Activities', path: '/activities' },
  { label: 'Information', path: '/information' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    // Navbar entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }

    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger menu items on mobile menu open
  useEffect(() => {
    if (menuOpen && menuItemsRef.current.length > 0) {
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [menuOpen]);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'crescent-nav--scrolled py-3'
            : 'crescent-nav--top py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo & School Identity */}
          <Link to="/" ref={logoRef} className="flex items-center gap-4 min-w-fit crescent-logo-link">
            {/* School Crest Emblem */}
            <div className="crescent-emblem">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="44" height="44" rx="4" fill="#0A2342"/>
                <path d="M22 8 L22 8" stroke="#D4AF37" strokeWidth="0"/>
                {/* Crescent arc */}
                <path d="M14 22 A10 10 0 0 1 30 22" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                {/* Stars */}
                <circle cx="22" cy="14" r="1.5" fill="#D4AF37"/>
                <circle cx="16" cy="17" r="1" fill="#D4AF37" opacity="0.7"/>
                <circle cx="28" cy="17" r="1" fill="#D4AF37" opacity="0.7"/>
                {/* Divider rule */}
                <line x1="12" y1="27" x2="32" y2="27" stroke="#D4AF37" strokeWidth="0.75" opacity="0.6"/>
                {/* Monogram */}
                <text x="22" y="37" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" fill="#D4AF37" letterSpacing="2">CS</text>
              </svg>
            </div>

            {/* School Name Stack */}
            <div className="flex flex-col leading-tight">
              <span className="crescent-school-name">The Crescent School</span>
              <span className="crescent-school-sub">Nursery to Higher Secondary</span>
              <span className="crescent-school-affil">Affiliated to WBBSE &amp; WBCHSE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-0">
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="crescent-nav-link"
                >
                  {item.label}
                  <span className="crescent-nav-underline" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Admission Button — Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/information"
              className="crescent-admission-btn"
            >
              Admission Open
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden crescent-hamburger"
            aria-label="Toggle menu"
          >
            <span className={`crescent-bar ${menuOpen ? 'crescent-bar--top-open' : ''}`} />
            <span className={`crescent-bar ${menuOpen ? 'crescent-bar--mid-open' : ''}`} />
            <span className={`crescent-bar ${menuOpen ? 'crescent-bar--bot-open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[998] transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,35,66,0.45)', backdropFilter: 'blur(4px)' }}
        onClick={handleMenuClose}
      />

      {/* Mobile Drawer — Premium School Style */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[997] crescent-drawer transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="crescent-drawer-header">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="4" fill="#0A2342"/>
              <path d="M14 22 A10 10 0 0 1 30 22" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <circle cx="22" cy="14" r="1.5" fill="#D4AF37"/>
              <circle cx="16" cy="17" r="1" fill="#D4AF37" opacity="0.7"/>
              <circle cx="28" cy="17" r="1" fill="#D4AF37" opacity="0.7"/>
              <line x1="12" y1="27" x2="32" y2="27" stroke="#D4AF37" strokeWidth="0.75" opacity="0.6"/>
              <text x="22" y="37" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" fill="#D4AF37" letterSpacing="2">CS</text>
            </svg>
            <div>
              <p className="crescent-drawer-school-name">The Crescent School</p>
              <p className="crescent-drawer-school-sub">Nursery to Higher Secondary</p>
            </div>
          </div>
          {/* Close Button */}
          <button onClick={handleMenuClose} className="crescent-drawer-close" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="#0A2342" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Gold Rule */}
        <div className="crescent-drawer-rule" />

        {/* Nav Links */}
        <nav className="crescent-drawer-nav">
          {MENU_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              ref={(el) => (menuItemsRef.current[index] = el)}
              onClick={handleMenuClose}
              className="crescent-drawer-link"
            >
              <span className="crescent-drawer-link-num">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer — Admission CTA */}
        <div className="crescent-drawer-footer">
          <Link
            to="/information"
            onClick={handleMenuClose}
            className="crescent-drawer-admission"
          >
            Apply for Admission
          </Link>
          <p className="crescent-drawer-tagline">Shaping Tomorrow's Leaders Since 1985</p>
        </div>
      </div>

      {/* All Crescent School Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=EB+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Navbar base states ── */
        .crescent-nav--top {
          background: transparent;
        }
        .crescent-nav--scrolled {
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(212,175,55,0.18);
          box-shadow: 0 2px 24px rgba(10,35,66,0.08);
        }

        /* ── Logo link ── */
        .crescent-logo-link {
          transition: opacity 0.2s ease;
          text-decoration: none;
        }
        .crescent-logo-link:hover { opacity: 0.85; }

        /* ── Emblem ── */
        .crescent-emblem {
          flex-shrink: 0;
          border-radius: 5px;
          box-shadow: 0 2px 12px rgba(10,35,66,0.22);
        }

        /* ── School name typography ── */
        .crescent-school-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          font-size: 1.125rem;
          letter-spacing: 0.01em;
          color: #ffffff;
          line-height: 1.1;
          transition: color 0.4s ease;
        }
        .crescent-nav--scrolled .crescent-school-name {
          color: #0A2342;
        }
        .crescent-school-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          line-height: 1.3;
          margin-top: 1px;
          transition: color 0.4s ease;
        }
        .crescent-nav--scrolled .crescent-school-sub {
          color: rgba(10,35,66,0.55);
        }
        .crescent-school-affil {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.6rem;
          letter-spacing: 0.03em;
          color: rgba(212,175,55,0.85);
          line-height: 1.3;
          transition: color 0.4s ease;
        }
        .crescent-nav--scrolled .crescent-school-affil {
          color: rgba(212,175,55,0.9);
        }

        /* ── Desktop nav links ── */
        .crescent-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.8125rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          padding: 0.5rem 0.875rem;
          position: relative;
          display: block;
          transition: color 0.25s ease;
        }
        .crescent-nav--scrolled .crescent-nav-link {
          color: rgba(10,35,66,0.72);
        }
        .crescent-nav-link:hover {
          color: #ffffff;
        }
        .crescent-nav--scrolled .crescent-nav-link:hover {
          color: #0A2342;
        }
        .crescent-nav-underline {
          position: absolute;
          bottom: 2px;
          left: 0.875rem;
          right: 0.875rem;
          height: 1.5px;
          background: #D4AF37;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          border-radius: 1px;
        }
        .crescent-nav-link:hover .crescent-nav-underline {
          transform: scaleX(1);
        }

        /* ── Admission button ── */
        .crescent-admission-btn {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: #ffffff;
          background: #0A2342;
          border: 1.5px solid #D4AF37;
          padding: 0.625rem 1.5rem;
          border-radius: 2px;
          display: inline-block;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .crescent-nav--scrolled .crescent-admission-btn {
          background: #0A2342;
          border-color: #D4AF37;
          color: #ffffff;
        }
        .crescent-admission-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(10,35,66,0.28);
        }

        /* ── Mobile hamburger ── */
        .crescent-hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .crescent-bar {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .crescent-nav--scrolled .crescent-bar {
          background: #0A2342;
        }
        .crescent-bar--top-open {
          transform: rotate(45deg) translate(4.5px, 4.5px);
        }
        .crescent-bar--mid-open {
          opacity: 0;
        }
        .crescent-bar--bot-open {
          transform: rotate(-45deg) translate(4.5px, -4.5px);
        }

        /* ── Mobile drawer ── */
        .crescent-drawer {
          width: min(360px, 88vw);
          background: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(10,35,66,0.16);
        }

        .crescent-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1.25rem;
        }

        .crescent-drawer-school-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          font-size: 0.9375rem;
          color: #0A2342;
          margin: 0;
          line-height: 1.2;
        }

        .crescent-drawer-school-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(10,35,66,0.5);
          margin: 2px 0 0;
        }

        .crescent-drawer-close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(10,35,66,0.12);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
          flex-shrink: 0;
        }
        .crescent-drawer-close:hover {
          background: rgba(10,35,66,0.06);
          border-color: rgba(10,35,66,0.2);
        }

        .crescent-drawer-rule {
          height: 1px;
          margin: 0 1.5rem;
          background: linear-gradient(to right, #D4AF37, rgba(212,175,55,0.1));
        }

        .crescent-drawer-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .crescent-drawer-link {
          font-family: 'EB Garamond', Georgia, serif;
          font-weight: 500;
          font-size: 1.1875rem;
          color: #0A2342;
          text-decoration: none;
          padding: 0.875rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid rgba(10,35,66,0.05);
          transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
        }
        .crescent-drawer-link:hover {
          background: rgba(212,175,55,0.06);
          color: #0A2342;
          padding-left: 1.875rem;
        }

        .crescent-drawer-link-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #D4AF37;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .crescent-drawer-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(10,35,66,0.08);
        }

        .crescent-drawer-admission {
          display: block;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: #ffffff;
          background: #0A2342;
          border: 1.5px solid #D4AF37;
          padding: 0.875rem 1.5rem;
          border-radius: 2px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .crescent-drawer-admission:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(10,35,66,0.22);
        }

        .crescent-drawer-tagline {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.75rem;
          font-style: italic;
          color: rgba(10,35,66,0.4);
          text-align: center;
          margin: 0.875rem 0 0;
          letter-spacing: 0.01em;
        }

        /* ── Remove old tech animations ── */
        nav { animation: none !important; }
        nav:hover { animation: none !important; }
      `}</style>
    </>
  );
}