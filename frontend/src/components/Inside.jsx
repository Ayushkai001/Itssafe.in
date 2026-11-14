import Icon from './Icons';
import Reveal from './Reveal';
import WarbleVideo from './WarbleVideo';
import { keepCompounds } from '../lib/text';

const LAYERS = [
  { icon: 'cpu', title: 'Embedded', copy: 'Systems developed in-house.' },
  { icon: 'circuitCard', title: 'Custom PCB', copy: 'Boards designed by us.' },
  { icon: 'burst', title: 'Own AI', copy: 'Proprietary architecture.' },
  { icon: 'shieldCheck', title: 'Patented', copy: 'Every technology.' },
];

/** Made in India: the original Figma animation, untouched, and the four layers we build. */
export default function Inside() {
  return (
    <section id="inside" className="inside" data-theme="light" aria-labelledby="inside-title">
      <div className="wrap-text inside__head">
        <Reveal as="p" className="t-eyebrow">
          Made in India
        </Reveal>
        <Reveal as="h2" id="inside-title" className="t-h2" delay={0.06}>
          Every layer, designed by us.
        </Reveal>
        <Reveal as="p" className="t-lead inside__lead" delay={0.12}>
          {keepCompounds(
            'Embedded systems, custom-designed PCB boards and proprietary AI architecture, all developed in-house in India. All our technologies are patented.',
          )}
        </Reveal>
      </div>

      <Reveal y={56} amount={0.1} className="inside__stage">
        <WarbleVideo className="inside__video" />
      </Reveal>

      <ul className="wrap-wide inside__layers">
        {LAYERS.map((l, i) => (
          <Reveal as="li" key={l.title} className="inside-layer" delay={0.08 * i} y={24} amount={0.5}>
            <Icon name={l.icon} strokeWidth={1.5} draw delay={0.2 + i * 0.1} />
            <h3 className="t-card-title inside-layer__title">{l.title}</h3>
            <p className="inside-layer__copy">{keepCompounds(l.copy)}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
