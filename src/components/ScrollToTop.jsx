import { useEffect, useState } from 'react';

const SHOW_AFTER = 240;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > SHOW_AFTER);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    const visibilityInterval = window.setInterval(updateVisibility, 100);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.clearInterval(visibilityInterval);
    };
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="scroll-to-top"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 14 6-6 6 6" />
      </svg>
    </button>
  );
}