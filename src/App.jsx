import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import FloatingContact from './components/FloatingContact';
import './premium-theme.css';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Facilities from './pages/Facilities';
import Activities from './pages/Activities';
import Information from './pages/Information';
import StudentLife from './pages/StudentLife';
import Discipline from './pages/Discipline';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <FloatingContact />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/information" element={<Information />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/discipline" element={<Discipline />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}