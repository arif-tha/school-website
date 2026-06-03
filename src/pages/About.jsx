import { useEffect } from 'react';
import About from '../sections/About';
import CampusExperience from '../sections/CampusExperience';
import Footer from '../sections/Footer';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <About />
      <CampusExperience />
      <Footer />
    </div>
  );
}
