import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Academics from '../sections/Academics';
import CoCurricular from '../sections/CoCurricular';
import Facilities from '../sections/Facilities';
import HousesSection from '../sections/HousesSection';
import Achievements from '../sections/Achievements';
import Footer from '../sections/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <Hero />
      <About />
      
      {/* Learn More Button Section */}
      <section id="home-cta-about" className="py-20 px-6 sm:px-10 bg-gradient-to-br from-slate-50 to-blue-50 text-center">
        <Link
          to="/about"
          className="inline-block font-['Inter'] font-semibold text-sm px-10 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          Learn More About Us →
        </Link>
      </section>

      <Academics />
      
      <section id="home-cta-academics" className="py-20 px-6 sm:px-10 bg-white text-center">
        <Link
          to="/academics"
          className="inline-block font-['Inter'] font-semibold text-sm px-10 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          View All Programs →
        </Link>
      </section>

      <CoCurricular />
      
      <section id="home-cta-activities" className="py-20 px-6 sm:px-10 bg-gradient-to-br from-slate-50 to-blue-50 text-center">
        <Link
          to="/activities"
          className="inline-block font-['Inter'] font-semibold text-sm px-10 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          Explore All Activities →
        </Link>
      </section>

      <Facilities />
      
      <section id="home-cta-facilities" className="py-20 px-6 sm:px-10 bg-white text-center">
        <Link
          to="/facilities"
          className="inline-block font-['Inter'] font-semibold text-sm px-10 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          View All Facilities →
        </Link>
      </section>

      <HousesSection />
      <Achievements />
      <Footer />
    </div>
  );
}
