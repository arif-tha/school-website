import { useEffect } from 'react';
import Hero from '../sections/Hero';
import AnniversaryBanner from '../sections/AnniversaryBanner';
import NoticeSection from '../components/NoticeBoard/NoticeSection';
import About from '../sections/About';
import Academics from '../sections/Academics';
import CoCurricular from '../sections/CoCurricular';
import Turf from '../sections/Turf';
import Facilities from '../sections/Facilities';
import Gallery from '../sections/Gallery';
import HandbookPreview from '../sections/HandbookPreview';
import Achievements from '../sections/Achievements';
import ParentCornerPreview from '../sections/ParentCornerPreview';
import Footer from '../sections/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <Hero />
      <AnniversaryBanner />
      <NoticeSection />
      <About />
      <Academics />
      <CoCurricular />
      <Turf />
      <Facilities />
      <Gallery />
      <HandbookPreview />
      <Achievements />
      <ParentCornerPreview />
      <Footer />
    </div>
  );
}
