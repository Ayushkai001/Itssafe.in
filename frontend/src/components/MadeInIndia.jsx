import Icon from './Icons';
import Reveal from './Reveal';
import { keepCompounds } from '../lib/text';

const LAYERS = [
  { icon: 'cpu', title: 'Embedded', copy: 'Systems developed in-house.' },
  { icon: 'circuitCard', title: 'Custom PCB', copy: 'Boards designed by us.' },
  { icon: 'burst', title: 'Own AI', copy: 'Proprietary architecture.' },
  { icon: 'shieldCheck', title: 'Patented', copy: 'Every technology.' },
];

export default function MadeInIndia() {
  return (
    <section id="made-in-india" className="india" aria-labelledby="india-title">
      <Reveal y={48} amount={0.15} className="wrap-wide india__card">
        <p className="t-eyebrow">Made in India</p>
        <h2 id="india-title" className="t-h2">
          Every layer, designed by us.
        </h2>
        <p className="t-lead">
          {keepCompounds(
            'Embedded systems, custom-designed PCB boards and proprietary AI architecture, all developed in-house in India. All our technologies are patented.',
          )}
        </p>

        <ul className="india__features">
          {LAYERS.map((l, i) => (
            <Reveal as="li" key={l.title} className="india-feature" delay={0.1 + i * 0.08} y={24} amount={0.5}>
              <Icon name={l.icon} strokeWidth={1.5} draw delay={0.25 + i * 0.1} />
              <div>
                <h3 className="t-card-title india-feature__title">{l.title}</h3>
                <p className="india-feature__copy">{keepCompounds(l.copy)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
