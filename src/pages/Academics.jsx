import { useEffect } from 'react';
import Academics from '../sections/Academics';
import Footer from '../sections/Footer';

export default function AcademicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <Academics />
      <Footer />
    </div>
  );
}
