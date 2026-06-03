import { useEffect } from 'react';
import Facilities from '../sections/Facilities';
import Footer from '../sections/Footer';

export default function FacilitiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <Facilities />
      <Footer />
    </div>
  );
}
