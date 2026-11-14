import Icon from './Icons';
import Reveal from './Reveal';
import { keepCompounds } from '../lib/text';

const PILLARS = [
  { icon: 'shieldCheck', title: 'Prevent', lines: ['Identifying risks', 'before they', 'become disasters.'] },
  { icon: 'burst', title: 'Predict', lines: ['AI/ML models for', 'real-time', 'monitoring and early', 'warnings.'] },
  {
    icon: 'watchPulse',
    title: 'Protect',
    lines: ['Smart wearable', 'devices for', 'worker safety and', 'health', 'monitoring.'],
  },
  { icon: 'users', title: 'Preserve', lines: ['Saving lives and', 'building a', 'culture of safety.'] },
];

export default function OurPromise() {
  return (
    <section id="promise" className="promise" aria-labelledby="promise-title">
      <div className="wrap-text">
        <Reveal as="p" className="t-eyebrow">
          Our promise
        </Reveal>
        <Reveal as="h2" id="promise-title" className="t-h2" delay={0.06}>
          Prevent. Predict. Protect. <br className="br-xl" />
          Preserve.
        </Reveal>
      </div>

      <ul className="promise__grid">
        {PILLARS.map((p, i) => (
          <Reveal as="li" key={p.title} className="promise-card" delay={i * 0.08} y={36}>
            <span className="promise-card__icon">
              <Icon name={p.icon} strokeWidth={2} draw delay={0.2 + i * 0.08} />
            </span>
            <div>
              <h3 className="t-card-title promise-card__title">{p.title}</h3>
              <p className="t-card-copy promise-card__copy">
                {p.lines.map((line, j) => (
                  <span key={j}>
                    {keepCompounds(line)}
                    {j < p.lines.length - 1 ? (
                      <>
                        {' '}
                        <br className="br-xl" />
                      </>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
