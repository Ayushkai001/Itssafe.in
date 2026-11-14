import { m, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

const TAGS = {
  div: m.div,
  p: m.p,
  h2: m.h2,
  h3: m.h3,
  li: m.li,
  article: m.article,
  figure: m.figure,
};

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Renders the final state immediately when the user prefers reduced motion.
 */
export default function Reveal({ as = 'div', delay = 0, y = 28, amount = 0.2, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as] ?? m.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
