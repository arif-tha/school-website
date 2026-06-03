import { useEffect } from 'react';
import CoCurricular from '../sections/CoCurricular';
import Footer from '../sections/Footer';

export default function ActivitiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <CoCurricular />
      <Footer />
    </div>
  );
}
