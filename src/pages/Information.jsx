import { useEffect } from 'react';
import Timings from '../sections/Timings';
import Footer from '../sections/Footer';

export default function InformationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <Timings />
      <Footer />
    </div>
  );
}
