import Reveal from './Reveal';
import { keepCompounds as k } from '../lib/text';

export default function Company() {
  return (
    <section id="company" className="company" aria-labelledby="company-title">
      <div className="wrap-text company__intro">
        <Reveal as="p" className="t-eyebrow">
          Our focus area
        </Reveal>
        <Reveal as="h2" id="company-title" className="t-h2" delay={0.06}>
          Innovation in Industry 4.0.
        </Reveal>
        <Reveal as="p" className="t-lead" delay={0.12}>
          Established at the heart of India’s mining capital, <br className="br-xl" />
          ITSSAFE Solutions bridges the gap between <br className="br-xl" />
          academic research and industrial reality. We <br className="br-xl" />
          specialize in transforming {k('high-risk')} environments into <br className="br-xl" />
          {k('digitally-aware,')} autonomous safe zones.
        </Reveal>
        <Reveal delay={0.18}>
          <a className="link" href="#promise">
            <span>View our scope</span>
            <span className="chev" aria-hidden="true">
              &nbsp;›
            </span>
          </a>
        </Reveal>
      </div>

      <div className="wrap-wide company__cards">
        <Reveal as="article" y={48} amount={0.25} className="mv-card" aria-labelledby="mission-title">
          <p className="t-tile-eyebrow">Our mission</p>
          <h3 id="mission-title" className="t-quote mv-card__title">
            Prevent today. <span className="mv-card__accent">Protect tomorrow.</span>
          </h3>
          <p className="t-subhead mv-card__sub">
            Intelligent Technology. Safer Mines. Stronger <br className="br-xl" />
            Tomorrow.
          </p>
          <p className="t-small mv-card__body">
            ITSSAFE Solutions is on a mission to prevent <br className="br-xl" />
            disasters in mines through the power of AI/ML, IoT <br className="br-xl" />
            and {k('next-gen')} wearable devices. Because every life <br className="br-xl" />
            is valuable.
          </p>
        </Reveal>

        <Reveal
          as="article"
          y={48}
          amount={0.25}
          delay={0.1}
          className="mv-card mv-card--vision"
          aria-labelledby="vision-title"
        >
          <p className="t-tile-eyebrow">Our vision</p>
          <h3 id="vision-title" className="t-quote mv-card__title">
            To revolutionize industry through intelligent systems.
          </h3>
          <p className="t-small mv-card__body">
            Which eliminate preventable industrial risks, making every worker’s environment predictively safe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
