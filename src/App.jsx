import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import FloatingContact from './components/FloatingContact';
import './premium-theme.css';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import AcademicsDetails from './pages/AcademicsDetails';
import Facilities from './pages/Facilities';
import FacilitiesDetails from './pages/FacilitiesDetails';
import Activities from './pages/Activities';
import Information from './pages/Information';
import StudentLife from './pages/StudentLife';
import Discipline from './pages/Discipline';
import HandbookDetails from './pages/HandbookDetails';
import Notices from './pages/Notices/Notices';
import NoticeDetails from './pages/Notices/NoticeDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AcademicCalendar from './pages/AcademicCalendar';
import ParentCorner from './pages/ParentCorner';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import { scrollToHash } from './utils/scrollNavigation';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return undefined;

    const timeoutId = window.setTimeout(() => scrollToHash(location.hash), 50);
    return () => window.clearTimeout(timeoutId);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => {
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="relative bg-[#03092E] text-white overflow-x-hidden">
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <ScrollToTop />}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <FloatingContact />}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => scrollToHash(location.hash)}>
        <motion.div
          key={`${location.pathname}${location.search}`}
          className="route-page"
          initial={prefersReducedMotion ? false : { opacity: 0.98, x: '2%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0.98, x: '-2%' }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academic-overview" element={<AcademicsDetails />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities-details" element={<FacilitiesDetails />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/information" element={<Information />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/discipline" element={<Discipline />} />
            <Route path="/handbook-details" element={<HandbookDetails />} />
            <Route path="/academic-calendar" element={<AcademicCalendar />} />
            <Route path="/parent-corner" element={<ParentCorner />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* Notice Board Routes */}
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}