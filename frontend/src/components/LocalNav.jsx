import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useContact } from './contact/context';
import { EASE, scrollToId } from '../lib/motion';
import logo from '../assets/brand/itssafe-logo.webp';

const LINKS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'closer-look', label: 'Closer look' },
  { id: 'inside', label: 'Inside' },
  { id: 'company', label: 'Company' },
];

/**
 * Apple-style product bar. It sticks to the top once the global nav scrolls away, takes on the
 * light or dark glass of whichever section sits beneath it, and marks the section in view.
 */
export default function LocalNav() {
  const ref = useRef(null);
  const [theme, setTheme] = useState('dark');
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const bar = ref.current;
      if (!bar) return;
      const barRect = bar.getBoundingClientRect();
      const probe = barRect.bottom + 1;
      setStuck(barRect.top <= 0.5);
      for (const section of document.querySelectorAll('[data-theme]')) {
        if (section === bar) continue;
        const r = section.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTheme(section.dataset.theme);
          break;
        }
      }
      const marker = window.innerHeight * 0.4;
      let active = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= marker && r.bottom > marker) active = id;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    frame = requestAnimationFrame(measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (e.key === 'Escape' || (e.type === 'pointerdown' && !ref.current?.contains(e.target))) setOpen(false);
    };
    window.addEventListener('keydown', close);
    window.addEventListener('pointerdown', close);
    return () => {
      window.removeEventListener('keydown', close);
      window.removeEventListener('pointerdown', close);
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // Start the scroll after the menu has closed; a scroll begun inside the tap gets cancelled.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  };

  return (
    <nav
      ref={ref}
      className="lnav"
      data-theme={theme}
      data-stuck={stuck}
      data-open={open}
      aria-label="Warble AI"
    >
      <div className="lnav__bg" aria-hidden="true" />
      <div className="lnav__bar">
        <a href="#top" className="lnav__title" onClick={go('top')}>
          <img src={logo} alt="" className="lnav__logo" width="28" height="24" />
          <span>Warble AI</span>
        </a>
        <div className="lnav__end">
          <ul className="lnav__links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a className="lnav__link" href={`#${l.id}`} aria-current={current === l.id} onClick={go(l.id)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="lnav__chevron"
            aria-expanded={open}
            aria-controls="lnav-menu"
            aria-label={open ? 'Close sections menu' : 'Open sections menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="lnav__cta" onClick={openContact}>
            Get in touch
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="lnav-menu"
            className="lnav__menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ul>
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={go(l.id)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
