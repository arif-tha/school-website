import React, { useEffect } from "react";
import ParentCornerFull from "../sections/ParentCornerFull";
import Footer from "../sections/Footer";

export default function Library() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <ParentCornerFull />
      <Footer />
    </main>
  );
}
