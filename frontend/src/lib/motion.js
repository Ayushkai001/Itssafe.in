// Apple-style easing curves shared by every animation on the page.
export const EASE = [0.28, 0.11, 0.32, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

// Scroll smoothly to a section, respecting the user's reduced-motion preference.
export function scrollToId(id) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = id === 'top' ? document.body : document.getElementById(id);
  if (!target) return;
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  history.replaceState(null, '', `#${id}`);
}
