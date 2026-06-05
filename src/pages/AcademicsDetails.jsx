import { useEffect } from 'react';
import AcademicsFull from '../sections/AcademicsFull';
import Footer from '../sections/Footer';

export default function AcademicsDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <AcademicsFull />
      <Footer />
    </div>
  );
}
