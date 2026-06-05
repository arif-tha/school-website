import React, { useEffect } from "react";
import CalendarFull from "../sections/CalendarFull";
import Footer from "../sections/Footer";

export default function AcademicCalendar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#03092E]">
       <CalendarFull />
       <Footer />
    </main>
  );
}
