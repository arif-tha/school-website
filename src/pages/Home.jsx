import { useEffect } from 'react';
import Hero from '../sections/Hero';
import Achievements from '../sections/Achievements';
import Academics from '../sections/Academics';
import CoCurricular from '../sections/CoCurricular';
import About from '../sections/About';
import Footer from '../sections/Footer';

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id="home" className="relative bg-white text-slate-900 overflow-x-hidden">
      <Hero />
      <Achievements />
      <Academics />
      <CoCurricular />
      <About />
      <Footer />
    </div>
  );
}
