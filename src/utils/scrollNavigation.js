const NAVBAR_OFFSET = 112;

export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
  return true;
}

export function scrollToHash(hash) {
  if (!hash) return false;
  return scrollToSection(decodeURIComponent(hash.replace(/^#/, "")));
}