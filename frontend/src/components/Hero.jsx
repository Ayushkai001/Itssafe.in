import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import design760 from '../assets/warble/design-band-760.webp';
import design1240 from '../assets/warble/design-band-1240.webp';
import { useContact } from './contact/context';
import { EASE, EASE_OUT } from '../lib/motion';

/**
 * Cinematic opener: the copy settles in, the band rises out of the dark on an orange aura,
 * then the scene drifts and zooms gently as the page scrolls away.
 */
export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { openContact } = useContact();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, ease: EASE, delay },
        };

  return (
    <section id="top" ref={ref} className="hero" data-theme="dark" aria-labelledby="hero-title">
      <m.div className="hero__copy wrap-wide" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
        <m.p className="t-eyebrow" {...rise(0.15)}>
          Warble AI
        </m.p>
        <m.h1 id="hero-title" className="t-hero hero__title" {...rise(0.25)}>
          Machine conscious.
        </m.h1>
        <m.p className="t-lead hero__sub" {...rise(0.35)}>
          The health band that never stops watching over you.
        </m.p>
        <m.div className="actions hero__actions" {...rise(0.45)}>
          <button type="button" className="btn" onClick={openContact}>
            Get in touch
          </button>
          <a className="link" href="#highlights">
            <span>Explore the features</span>
            <span className="chev" aria-hidden="true">
              &nbsp;›
            </span>
          </a>
        </m.div>
      </m.div>

      <m.div className="hero__visual" style={reduce ? undefined : { scale: visualScale, y: visualY }}>
        <div className="hero__aura" aria-hidden="true" />
        <m.img
          src={design1240}
          srcSet={`${design760} 760w, ${design1240} 1240w`}
          sizes="(min-width: 1280px) 1240px, 100vw"
          width="1240"
          height="634"
          alt="The Warble AI module in profile, its orange hexagonal-vent band catching the light"
          fetchPriority="high"
          initial={reduce ? false : { opacity: 0, scale: 1.08, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.2, ease: EASE_OUT, delay: 0.2 }}
        />
      </m.div>
    </section>
  );
}
