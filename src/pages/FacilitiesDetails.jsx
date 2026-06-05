import { useEffect } from 'react';
import FacilitiesFull from '../sections/FacilitiesFull';
import Footer from '../sections/Footer';

export default function FacilitiesDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#03092E] min-h-screen pt-32">
      <FacilitiesFull />
      <Footer />
    </div>
  );
}
