import { useEffect } from 'react';
import Discipline from '../sections/Discipline';
import Footer from '../sections/Footer';

export default function DisciplinePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <Discipline />
      <Footer />
    </div>
  );
}
