import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.current.style.left = mouseX + 'px';
      dot.current.style.top = mouseY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.current.style.left = ringX + 'px';
      ring.current.style.top = ringY + 'px';
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      dot.current.classList.add('scale-150');
      ring.current.style.width = '56px';
      ring.current.style.height = '56px';
      ring.current.style.borderColor = 'rgba(245,158,11,0.6)';
    };
    const onLeave = () => {
      dot.current.classList.remove('scale-150');
      ring.current.style.width = '36px';
      ring.current.style.height = '36px';
      ring.current.style.borderColor = 'rgba(56,189,248,0.5)';
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed w-3 h-3 bg-sky rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 mix-blend-screen"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        ref={ring}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300"
        style={{ border: '1.5px solid rgba(56,189,248,0.5)' }}
      />
    </>
  );
}