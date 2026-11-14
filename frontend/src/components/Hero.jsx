import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import band480 from '../assets/warble/hero-band-480.webp';
import band800 from '../assets/warble/hero-band-800.webp';
import { useContact } from './contact/context';
import { EASE, EASE_OUT } from '../lib/motion';

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { openContact } = useContact();

  // The band drifts down slightly slower than the page as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="wrap-wide">
        <m.p className="t-eyebrow" {...rise(0.1)}>
          Warble AI
        </m.p>
        <m.h1 id="hero-title" className="t-hero hero__title" {...rise(0.18)}>
          Machine conscious.
        </m.h1>
        <m.p className="t-lead hero__sub" {...rise(0.28)}>
          The health band that never stops watching over you.
        </m.p>
        <m.div className="actions hero__actions" {...rise(0.38)}>
          <button type="button" className="btn" onClick={openContact}>
            Get in touch
          </button>
          <a className="link" href="#features">
            <span>Explore the features</span>
            <span className="chev" aria-hidden="true">
              &nbsp;›
            </span>
          </a>
        </m.div>
      </div>

      <m.div className="hero__media" style={reduce ? undefined : { y, scale }}>
        <m.img
          src={band800}
          srcSet={`${band480} 480w, ${band800} 800w`}
          sizes="(min-width: 1280px) 385px, (min-width: 768px) 330px, min(64vw, 280px)"
          width="800"
          height="1129"
          alt="The Warble AI health band — a rugged black module on an orange hexagonal-vent strap"
          fetchPriority="high"
          initial={reduce ? false : { opacity: 0, y: 70, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.7, ease: EASE_OUT, delay: 0.3 }}
        />
      </m.div>
    </section>
  );
}
