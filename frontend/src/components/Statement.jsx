import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { keepCompounds } from '../lib/text';

const WORDS =
  'A smart wearable for continuous health monitoring and early alerts, combining comfort and sleek design for real-world performance.'.split(
    ' ',
  );

const TONES = {
  light: { from: '#d2d2d7', to: '#000000' },
  dark: { from: '#3a3a3c', to: '#f5f5f7' },
};

function Word({ progress, range, from, to, children }) {
  const color = useTransform(progress, range, [from, to]);
  return (
    <>
      <m.span style={{ color }}>{keepCompounds(children)}</m.span>{' '}
    </>
  );
}

/** The opening statement. Its words light up one by one as it scrolls into view. */
export default function Statement({ tone = 'light', className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { from, to } = TONES[tone];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });

  return (
    <div ref={ref} className={`statement statement--${tone} wrap-text ${className}`}>
      <p className="t-statement">
        {WORDS.map((word, i) =>
          reduce ? (
            <span key={i} style={{ color: to }}>
              {keepCompounds(word)}{' '}
            </span>
          ) : (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / WORDS.length, Math.min(1, (i + 1.2) / WORDS.length)]}
              from={from}
              to={to}
            >
              {word}
            </Word>
          ),
        )}
      </p>
    </div>
  );
}
