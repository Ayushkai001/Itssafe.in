import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import logo from '../assets/brand/logo2.png';
import { useContact } from './contact/context';
import { EASE, scrollToId } from '../lib/motion';

/**
 * Corporate / Global navigation for ITSSAFE Solutions.
 * Delineated from the product-specific LocalNav by focusing on enterprise,
 * technology, company mission, leadership, and official accreditation.
 */
const LINKS = [
  { label: 'Warble AI', id: 'top' },
  { label: 'Technology', id: 'inside' },
  { label: 'Company', id: 'company' },
  { label: 'Leadership', id: 'team' },
  {
    label: 'DPIIT Certified',
    href: 'https://drive.google.com/file/d/17d763UN_hCj1pfiwkKuEvo-JyF3D8ahF/view',
    external: true,
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { openContact } = useContact();
  const reduce = useReducedMotion();

  // While the mobile menu is open: lock scrolling, make the page inert, close on Escape
  // or when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const inertTargets = [document.getElementById('main'), document.getElementById('site-footer')].filter(Boolean);
    inertTargets.forEach((el) => el.setAttribute('inert', ''));
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 768px)');
    const onViewport = (e) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onViewport);
    return () => {
      root.style.overflow = prevOverflow;
      inertTargets.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onViewport);
    };
  }, [open]);

  const goFromMenu = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  const contactFromMenu = () => {
    setOpen(false);
    openContact();
  };

  return (
    <m.header
      className="gnav"
      data-open={open}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="gnav__bg" aria-hidden="true" />
      <nav className="gnav__bar" aria-label="Global">
        <a href="#top" className="gnav__logo" aria-label="ITSSAFE Solutions — back to top">
          <img src={logo} alt="" width="28" height="24" />
        </a>

        <ul className="gnav__links">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.external ? (
                <a
                  className="gnav__item"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View official DPIIT Recognition Certificate"
                >
                  {l.label}
                </a>
              ) : (
                <a className="gnav__item" href={`#${l.id}`}>
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="gnav__end">
          <button type="button" className="gnav__cta" onClick={openContact}>
            Contact
          </button>
          <button
            type="button"
            className="gnav__toggle"
            aria-expanded={open}
            aria-controls="gnav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="gnav-menu"
            className="gnav__menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <m.li
                  key={l.label}
                  initial={reduce ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.06 + i * 0.04 }}
                >
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a href={`#${l.id}`} onClick={goFromMenu(l.id)}>
                      {l.label}
                    </a>
                  )}
                </m.li>
              ))}
              <m.li
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.06 + LINKS.length * 0.04 }}
              >
                <button type="button" className="gnav__menu-cta" onClick={contactFromMenu}>
                  Get in touch
                </button>
              </m.li>
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}
