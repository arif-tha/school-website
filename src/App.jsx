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
    <div className="relative bg-[#03092E] text-white overflow-x-hidden">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <FloatingContact />
      <Routes>
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

        {/* Notice Board Routes */}
        <Route path="/notices" element={<Notices />} />
        <Route path="/notices/:id" element={<NoticeDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}