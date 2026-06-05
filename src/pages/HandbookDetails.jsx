import React, { useEffect } from "react";
import HandbookFull from "../sections/HandbookFull";
import Footer from "../sections/Footer";

export default function HandbookDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#03092E]">
      <HandbookFull />
      <Footer />
    </main>
  );
}
