import { useEffect } from 'react';
import Uniform from '../sections/Uniform';
import HousesSection from '../sections/HousesSection';
import Footer from '../sections/Footer';

export default function StudentLifePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <Uniform />
      <HousesSection />
      <Footer />
    </div>
  );
}
