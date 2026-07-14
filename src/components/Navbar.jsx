import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import logoImg from "../assets/building/logo.png";
// ─── Navigation Configuration ────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Activities", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Parent Corner", href: "/parent-corner" },
  { label: "Information", href: "/information" },
  { label: "Calendar", href: "/academic-calendar" },
  { label: "Contact", href: "/contact" },
];

// ─── Navbar Component ─────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const drawerRef = useRef(null);
  const drawerOverlayRef = useRef(null);
  const drawerLinksRef = useRef([]);
  const hamburgerRef = useRef(null);

  // ─── Entrance Animation ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9 }
      ).fromTo(
        linksRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
        "-=0.5"
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // ─── Scroll Behavior ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(navbarRef.current, {
      backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
      boxShadow: scrolled
        ? "0 4px 32px rgba(37,99,235,0.15)"
        : "0 0px 0px rgba(0,0,0,0)",
      duration: 0.45,
      ease: "power2.inOut",
    });
  }, [scrolled]);

  // ─── Mobile Drawer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(drawerRef.current, { display: "flex" });
      gsap.fromTo(
        drawerOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.out" }
      );
      gsap.fromTo(
        drawerLinksRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => gsap.set(drawerRef.current, { display: "none" }),
      });
      gsap.to(drawerOverlayRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  // ─── Link Hover Animations ────────────────────────────────────────────────
  const handleLinkEnter = (el) => {
    gsap.to(el, { color: "#2563eb", duration: 0.22, ease: "power2.out" });
  };
  const handleLinkLeave = (el, isActive) => {
    gsap.to(el, {
      color: isActive ? "#2563eb" : "#475569",
      duration: 0.22,
      ease: "power2.out",
    });
  };

  // ─── Hamburger Toggle Animation ───────────────────────────────────────────
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────────────────────── */}
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "rgba(255,255,255,0)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 xl:px-14">
          <div className="flex items-center justify-between h-24 lg:h-28">

            {/* ── LEFT: Logo + Identity ──────────────────────────────────── */}
            <Link
              ref={logoRef}
              to="/"
              className="flex items-center gap-4 flex-shrink-0 group"
              style={{ opacity: 0 }}
              aria-label="The Crescent School – Home"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={logoImg}
                  alt="The Crescent School crest"
                  className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="font-semibold tracking-wide"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Garamond', 'Times New Roman', serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.06em",
                    lineHeight: 1.15,
                    color: "#1e40af",
                  }}
                >
                  The Crescent School
                </span>
                <span
                  className="mt-1"
                  style={{
                    color: "#2563eb",
                    fontFamily: "'Cormorant Garamond', 'Garamond', serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    fontStyle: "italic",
                    opacity: 0.9,
                    lineHeight: 1.4,
                  }}
                >
                  Nursery to Higher Secondary
                </span>
              </div>
            </Link>

            {/* ── CENTER: Desktop Navigation ────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center ml-8 lg:ml-12 xl:ml-16"
              aria-label="Primary navigation"
            >
              <ul className="flex items-center gap-1 xl:gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <li key={link.href}>
                      <NavLink
                        ref={(el) => (linksRef.current[i] = el)}
                        to={link.href}
                        onMouseEnter={(e) => handleLinkEnter(e.currentTarget)}
                        onMouseLeave={(e) =>
                          handleLinkLeave(e.currentTarget, isActive)
                        }
                        className="relative flex flex-col items-center px-3 xl:px-4 py-2 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        style={{
                          color: isActive
                            ? "#2563eb"
                            : "#475569",
                          fontFamily:
                            "'Inter', 'Helvetica Neue', sans-serif",
                          fontSize: "0.82rem",
                          letterSpacing: "0.04em",
                          opacity: 0,
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                        {/* Active / hover underline */}
                        <span
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-blue-500 transition-all duration-300"
                          style={{ width: isActive ? "60%" : "0%" }}
                        />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* ── RIGHT: Reserved + Hamburger ───────────────────────────── */}
            <div className="flex items-center gap-4">
              {/* Future expansion slot (desktop) */}
              <div className="hidden lg:block w-32" aria-hidden="true" />

              {/* Hamburger (mobile / tablet) */}
              <button
                ref={hamburgerRef}
                onClick={toggleMobile}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Blue accent line at bottom ─────────────────────────────────── */}
        <div
          className="h-px w-full transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.35) 30%, rgba(37,99,235,0.6) 50%, rgba(37,99,235,0.35) 70%, transparent 100%)",
            opacity: scrolled ? 1 : 0.45,
          }}
        />
      </header>

      {/* ── Mobile Overlay ───────────────────────────────────────────────────── */}
      <div
        ref={drawerOverlayRef}
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        style={{ opacity: 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────────────── */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-[82vw] max-w-sm flex-col lg:hidden"
        style={{
          display: "none",
          backgroundColor: "#ffffff",
          transform: "translateX(100%)",
        }}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle interior pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, rgba(37,99,235,0.07) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Drawer Header */}
        <div
          className="relative flex items-center justify-between px-7 pt-8 pb-6"
          style={{
            borderBottom: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="The Crescent School crest"
              className="h-11 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-semibold"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Garamond', serif",
                  fontSize: "1.05rem",
                  letterSpacing: "0.05em",
                  lineHeight: 1.2,
                  color: "#1e40af",
                }}
              >
                The Crescent School
              </span>
              <span
                style={{
                  color: "#2563eb",
                  fontFamily: "'Cormorant Garamond', 'Garamond', serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.13em",
                  fontStyle: "italic",
                  opacity: 0.85,
                  marginTop: "0px",
                }}
              >
                Nursery to Higher Secondary
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors hover:bg-blue-50"
            style={{ color: "#475569" }}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1L17 17M17 1L1 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.href}>
                  <NavLink
                    ref={(el) => (drawerLinksRef.current[i] = el)}
                    to={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-between w-full py-4 px-3 group transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg hover:bg-blue-50"
                    style={{ opacity: 0 }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {/* Blue dot for active */}
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isActive
                            ? "#2563eb"
                            : "rgba(37,99,235,0.25)",
                          transform: isActive ? "scale(1)" : "scale(0.7)",
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="font-medium tracking-wide"
                        style={{
                          fontFamily:
                            "'Inter', 'Helvetica Neue', sans-serif",
                          fontSize: "0.93rem",
                          letterSpacing: "0.04em",
                          color: isActive
                            ? "#2563eb"
                            : "#475569",
                        }}
                      >
                        {link.label}
                      </span>
                    </div>
                    {/* Arrow */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{
                        color: isActive
                          ? "#2563eb"
                          : "#94a3b8",
                      }}
                    >
                      <path
                        d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </NavLink>

                  {/* Separator – all but last */}
                  {i < NAV_LINKS.length - 1 && (
                    <div
                      className="mx-3"
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(37,99,235,0.15), transparent)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div
          className="px-8 py-5"
          style={{ borderTop: "1px solid rgba(37,99,235,0.12)" }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              fontFamily:
                "'Cormorant Garamond', 'Garamond', serif",
              fontStyle: "italic",
            }}
          >
            Excellence in Education
          </p>
        </div>
      </aside>
    </>
  );
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-all duration-300"
      aria-hidden="true"
    >
      {open ? (
        // X icon
        <>
          <path
            d="M4 4L20 20"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M20 4L4 20"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </>
      ) : (
        // Hamburger icon
        <>
          <path
            d="M4 7H20"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M4 12H16"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M4 17H12"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
