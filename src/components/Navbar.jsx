import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoImg from "../assets/building/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Activities", href: "/activities" },
  { label: "Parent Corner", href: "/parent-corner" },
  { label: "Information", href: "/information" },
  { label: "Calendar", href: "/academic-calendar" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const drawerLinksRef = useRef([]);
  const hamburgerRef = useRef(null);

  // Set active path on mount
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
        },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.5"
      );
  }, []);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll-based navbar style
  useEffect(() => {
    if (!navRef.current) return;
    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "#0A2342",
        boxShadow: "0 2px 24px 0 rgba(10,35,66,0.18)",
        duration: 0.38,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(10,35,66,0)",
        boxShadow: "none",
        duration: 0.38,
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  // Drawer open/close animation
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;
    if (drawerOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(drawerRef.current, { display: "flex" });
      gsap.set(overlayRef.current, { display: "block" });

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.32, ease: "power2.out" }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(
        drawerLinksRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.18,
        }
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
        },
      });
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.38,
        ease: "power3.in",
        onComplete: () => {
          if (drawerRef.current) gsap.set(drawerRef.current, { display: "none" });
        },
      });
    }
  }, [drawerOpen]);

  // Link hover animation
  const handleLinkHover = (el, enter) => {
    gsap.to(el, {
      color: enter ? "#D4AF37" : "#FFFFFF",
      duration: 0.22,
      ease: "power1.out",
    });
  };

  // CTA button hover
  const handleCtaHover = (enter) => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, {
      backgroundColor: enter ? "#D4AF37" : "transparent",
      color: enter ? "#0A2342" : "#D4AF37",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "rgba(10,35,66,0)",
          transition: "none",
        }}
        className="w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* ── LOGO ── */}
              <a
                ref={logoRef}
                href="/"
                className="flex items-center gap-2 sm:gap-3 no-underline flex-shrink-0"
                style={{ opacity: 0 }}
                aria-label="The Crescent School Home"
              >
                {/* Logo Image */}
                <div className="flex-shrink-0 rounded-full overflow-hidden"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid #D4AF37",
                  }}
                >
                  <img
                    src={logoImg}
                    alt="The Crescent School Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text - Responsive */}
                <div className="flex flex-col leading-tight min-w-0">
                  <span
                    className="font-bold tracking-tight text-white text-sm sm:text-base whitespace-nowrap"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      lineHeight: 1.1,
                    }}
                  >
                    The Crescent School
                  </span>
                  <span
                    className="hidden sm:inline text-xs text-yellow-600"
                    style={{
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontStyle: "italic",
                      lineHeight: 1.2,
                    }}
                  >
                    Nursery to Higher Secondary
                  </span>
                </div>
              </a>

              {/* ── DESKTOP NAV ── */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activePath === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      ref={(el) => (linksRef.current[i] = el)}
                      style={{
                        opacity: 0,
                        fontFamily: "'Georgia', serif",
                        fontSize: "0.8rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: isActive ? "#D4AF37" : "#FFFFFF",
                        textDecoration: "none",
                        padding: "8px 14px",
                        position: "relative",
                        transition: "color 0s",
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={(e) => !isActive && handleLinkHover(e.currentTarget, true)}
                      onMouseLeave={(e) => !isActive && handleLinkHover(e.currentTarget, false)}
                    >
                      {link.label}
                      {/* Active underline */}
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 2,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "70%",
                            height: 2,
                            background: "#D4AF37",
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* ── CTA + HAMBURGER ── */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* CTA Button */}
                <a
                  ref={ctaRef}
                  href="/admissions"
                  style={{
                    opacity: 0,
                    display: "inline-block",
                    fontFamily: "'Georgia', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#D4AF37",
                    textDecoration: "none",
                    padding: "8px 16px",
                    border: "1.5px solid #D4AF37",
                    borderRadius: 3,
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "color 0s, background-color 0s",
                    whiteSpace: "nowrap",
                  }}
                  className="hidden sm:inline-block"
                  onMouseEnter={() => handleCtaHover(true)}
                  onMouseLeave={() => handleCtaHover(false)}
                >
                  Admission
                </a>

                {/* Hamburger (mobile) */}
                <button
                  ref={hamburgerRef}
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open menu"
                  className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {[0, 1, 2].map((n) => (
                    <span
                      key={n}
                      style={{
                        display: "block",
                        width: n === 1 ? 18 : 24,
                        height: 2,
                        background: "#D4AF37",
                        borderRadius: 1,
                        transition: "width 0.2s",
                      }}
                    />
                  ))}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── HAIRLINE ── */}
        <div
          style={{
            height: 1,
            background: scrolled
              ? "rgba(212,175,55,0.18)"
              : "rgba(212,175,55,0.10)",
            transition: "background 0.4s",
          }}
        />
      </nav>

      {/* ── OVERLAY ── */}
      <div
        ref={overlayRef}
        onClick={() => setDrawerOpen(false)}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          backgroundColor: "rgba(10,35,66,0.55)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* ── MOBILE DRAWER ── */}
      <aside
        ref={drawerRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1001,
          width: "min(85vw, 320px)",
          maxWidth: "320px",
          backgroundColor: "#0A2342",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(10,35,66,0.35)",
          transform: "translateX(100%)",
          borderLeft: "1px solid rgba(212,175,55,0.18)",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-6"
          style={{
            paddingTop: 24,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(212,175,55,0.13)",
            flexShrink: 0,
          }}
        >
          {/* Mini Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid #D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={logoImg}
                alt="The Crescent School Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "0.85rem",
                  color: "#fff",
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                The Crescent
              </p>
              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "0.5rem",
                  color: "#D4AF37",
                  margin: 0,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontStyle: "italic",
                  lineHeight: 1.1,
                }}
              >
                School
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "1px solid rgba(212,175,55,0.3)",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="#D4AF37"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-5 sm:px-6 pt-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            const isActive = activePath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => (drawerLinksRef.current[i] = el)}
                style={{
                  opacity: 0,
                  fontFamily: "'Georgia', serif",
                  fontSize: "0.95rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isActive ? "#D4AF37" : "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "color 0.2s",
                  fontWeight: isActive ? 700 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                }}
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                    stroke={isActive ? "#D4AF37" : "rgba(255,255,255,0.3)"}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div
          className="px-5 sm:px-6"
          style={{ paddingBottom: 32, paddingTop: 24, flexShrink: 0 }}
        >
          <a
            href="/admissions"
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "'Georgia', serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0A2342",
              textDecoration: "none",
              padding: "12px 0",
              backgroundColor: "#D4AF37",
              borderRadius: 3,
              fontWeight: 700,
            }}
            onClick={() => setDrawerOpen(false)}
          >
            Admission Open
          </a>

          {/* Branding Info */}
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "0.65rem",
              color: "rgba(212,175,55,0.6)",
              textAlign: "center",
              marginTop: 16,
              letterSpacing: "0.03em",
              lineHeight: 1.6,
            }}
          >
            English Medium • Girls & Boys
            <br />
            WBBSE & WBCHSE Affiliated
          </p>
        </div>
      </aside>
    </>
  );
}