import { m, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

// 24-unit line icons matching the glyphs used in the Figma design.
const RAY = (a, r1 = 5, r2 = 10) => {
  const rad = (a * Math.PI) / 180;
  const p = (r) => `${(12 + r * Math.cos(rad)).toFixed(2)} ${(12 + r * Math.sin(rad)).toFixed(2)}`;
  return { d: `M${p(r1)}L${p(r2)}` };
};

const ICONS = {
  shieldCheck: [
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
    { d: 'm9 12 2 2 4-4' },
  ],
  burst: [{ circle: [12, 12, 2.6] }, ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) => RAY(a))],
  watchPulse: [
    { rect: [6, 6, 12, 12, 3] },
    { d: 'M9 6l.55-2.75A1.5 1.5 0 0 1 11.02 2h1.96a1.5 1.5 0 0 1 1.47 1.25L15 6' },
    { d: 'M9 18l.55 2.75A1.5 1.5 0 0 0 11.02 22h1.96a1.5 1.5 0 0 0 1.47-1.25L15 18' },
    { d: 'M8.75 12h1.6l1.15-2.1 1.5 4.2 1.15-2.1h1.1' },
  ],
  users: [
    { circle: [9, 8, 3.25] },
    { d: 'M3 19.5V19a6 6 0 0 1 12 0v.5' },
    { circle: [16.75, 8.75, 2.5] },
    { d: 'M15.4 13.6A5 5 0 0 1 21 18.5v1' },
  ],
  cpu: [
    { rect: [5, 5, 14, 14, 2.5] },
    { d: 'M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3' },
  ],
  circuitCard: [
    { rect: [2.5, 5, 19, 14, 2.5] },
    { dot: [7, 9.5, 1.15] },
    { d: 'M7 9.5h3.75v5H7.25' },
    { d: 'M15.5 9.5v5' },
  ],
};

export default function Icon({ name, strokeWidth = 2, draw = false, delay = 0, className, title }) {
  const reduce = useReducedMotion();
  const parts = ICONS[name] ?? [];
  const animate = draw && !reduce;

  const drawProps = (i) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: {
            pathLength: { duration: 1.1, ease: EASE, delay: delay + i * 0.08 },
            opacity: { duration: 0.2, delay: delay + i * 0.08 },
          },
        }
      : {};

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {parts.map((p, i) => {
        if (p.dot) {
          const [cx, cy, r] = p.dot;
          return (
            <m.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="currentColor"
              stroke="none"
              {...(animate
                ? {
                    initial: { scale: 0 },
                    whileInView: { scale: 1 },
                    viewport: { once: true, amount: 0.6 },
                    transition: { duration: 0.5, ease: EASE, delay: delay + 0.5 },
                  }
                : {})}
            />
          );
        }
        if (p.circle) {
          const [cx, cy, r] = p.circle;
          return <m.circle key={i} cx={cx} cy={cy} r={r} {...drawProps(i)} />;
        }
        if (p.rect) {
          const [x, y, w, h, rx] = p.rect;
          return <m.rect key={i} x={x} y={y} width={w} height={h} rx={rx} {...drawProps(i)} />;
        }
        return <m.path key={i} d={p.d} {...drawProps(i)} />;
      })}
    </svg>
  );
}
