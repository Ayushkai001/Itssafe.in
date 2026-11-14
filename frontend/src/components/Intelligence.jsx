import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import orb from '../assets/warble/ai-orb.webp';
import { keepCompounds } from '../lib/text';

/**
 * Predictive intelligence: a pinned scene in which the AI orb rises out of the dark and settles
 * beneath the headline as the visitor scrolls.
 */
export default function Intelligence() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const orbY = useTransform(scrollYProgress, [0, 0.35], ['32%', '0%']);
  const orbScale = useTransform(scrollYProgress, [0, 0.35], [0.75, 1]);
  const orbRotate = useTransform(scrollYProgress, [0, 0.6], [-10, 4]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.08], [0.3, 1]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.08], [0.4, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.08], [24, 0]);

  return (
    <section id="intelligence" ref={ref} className="ai" data-theme="dark" aria-labelledby="ai-title">
      <div className="ai__sticky">
        <m.div className="ai__copy wrap-text" style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}>
          <p className="t-eyebrow">Predictive intelligence</p>
          <h2 id="ai-title" className="t-h2">
            {keepCompounds('Custom-developed AI for India and Indians.')}
          </h2>
          <p className="t-lead ai__lead">A model built by us, for the people who wear it.</p>
        </m.div>

        <m.div
          className="ai__orb"
          style={reduce ? undefined : { y: orbY, scale: orbScale, rotate: orbRotate, opacity: orbOpacity }}
          aria-hidden="true"
        >
          <span className="ai__halo" />
          <img src={orb} alt="" width="880" height="912" loading="lazy" decoding="async" />
        </m.div>
      </div>
    </section>
  );
}
