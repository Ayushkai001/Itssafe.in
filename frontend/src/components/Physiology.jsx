import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import sensor800 from '../assets/warble/sensor-glow-800.webp';
import sensor1600 from '../assets/warble/sensor-glow-1600.webp';
import Reveal from './Reveal';
import Statement from './Statement';

/**
 * Health story on black: the sensor window eases out of a close-up as it scrolls into view,
 * and its light keeps a slow resting heartbeat.
 */
export default function Physiology() {
  const visualRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const glow = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  return (
    <section id="physiology" className="phys" data-theme="dark" aria-labelledby="phys-title">
      <div className="wrap-text phys__head">
        <Reveal as="p" className="t-eyebrow">
          Physiology
        </Reveal>
        <Reveal as="h2" id="phys-title" className="t-h2" delay={0.06}>
          Expert in physiological understanding.
        </Reveal>
      </div>

      <div ref={visualRef} className="phys__visual">
        <m.div className="phys__frame" style={reduce ? undefined : { scale }}>
          <img
            src={sensor1600}
            srcSet={`${sensor800} 800w, ${sensor1600} 1600w`}
            sizes="(min-width: 1280px) 1240px, 100vw"
            width="1600"
            height="909"
            alt="The sensor window on the back of Warble AI, lit red and green"
            loading="lazy"
            decoding="async"
          />
          <m.span className="phys__pulse" style={reduce ? undefined : { opacity: glow }} aria-hidden="true" />
        </m.div>
      </div>

      <Statement tone="dark" className="phys__statement" />

      <div className="wrap-text">
        <Reveal as="p" className="t-lead phys__copy">
          Capturing precise, real-time data for reliable monitoring and prediction.
        </Reveal>
      </div>
    </section>
  );
}
