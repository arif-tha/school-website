import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrolled / total) * 100;
      if (bar.current) bar.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9990] bg-transparent">
      <div
        ref={bar}
        className="h-full w-0"
        style={{ background: 'linear-gradient(90deg, #2563eb, #38bdf8, #f59e0b)' }}
      />
    </div>
  );
}