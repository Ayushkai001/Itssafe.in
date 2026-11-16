import { useState } from 'react';
import band480 from '../assets/warble/hero-band-480.webp';
import band800 from '../assets/warble/hero-band-800.webp';
import splash from '../assets/warble/splash-band.png';
import sensorImg from '../assets/warble/sensor.png';
import exploded800 from '../assets/warble/exploded-800.webp';
import exploded1600 from '../assets/warble/exploded-1600.webp';
import Physiology from '../assets/warble/physiology.png';
import { useViewer3D } from './viewer3d/context';
import Reveal from './Reveal';
import { keepCompounds } from '../lib/text';

const ITEMS = [
  {
    id: 'physiology',
    label: 'Physiology',
    text: 'Expert in physiological understanding.',
    img: { src: Physiology, w: 1070, h: 908 },
    fit: 'physiology',
    alt: 'Physiological signals: ECG, RPW, EMG, and FMG fused monitoring',
  },
  {
    id: 'sensors',
    label: 'Sensors',
    text: 'Capturing precise, real-time data with our own PCB board for reliable monitoring and prediction.',
    img: { src: sensorImg, w: 1110, h: 1320 },
    fit: 'sensor',
    alt: 'Custom in-house Warble AI PCB board with sensors',
  },
  {
    id: 'design',
    label: 'Design',
    text: 'Hexagonal-vent loop band in bold orange, with a rugged, minimal case.',
    img: { src: band800, srcSet: `${band480} 480w, ${band800} 800w`, w: 800, h: 1129 },
    fit: 'band',
    alt: 'Warble AI, three-quarter view of the module and orange loop band',
  },
  {
    id: 'Predictive',
    label: 'Predictive',
    text: 'Custom developed AI architecture and model for India and Indians trained over crores of data windows.',
    img: { src: band800, srcSet: `${band480} 480w, ${band800} 800w`, w: 800, h: 1129 },
    fit: 'AI',
    alt: 'AI model trained over crores of data windows ',
  },
  {
    id: 'water',
    label: 'Water resistance',
    text: 'Light enough to forget, tough enough to trust. Water-resistant, built for the moments that push back.',
    img: { src: splash, w: 600, h: 623 },
    fit: 'splash',
    alt: 'Warble AI splashing into water',
  },
  {
    id: 'inside',
    label: 'Inside',
    text: 'Embedded systems, custom-designed PCB boards and proprietary AI architecture, all developed in-house in India.',
    img: { src: exploded1600, srcSet: `${exploded800} 800w, ${exploded1600} 1600w`, w: 1600, h: 900 },
    fit: 'wide',
    alt: 'Exploded view of Warble AI: cover, circuit board and base above the band',
  },
];

/** "Take a closer look." — pick a detail and the product view crossfades to it. */
export default function CloserLook() {
  const [active, setActive] = useState(0);
  const { openViewer } = useViewer3D();

  return (
    <section id="closer-look" className="cl" data-theme="light" aria-labelledby="cl-title">
      <div className="wrap-wide">
        <div className="cl__head">
          <Reveal as="h2" id="cl-title" className="t-section-title">
            Take a closer look.
          </Reveal>
          <button
            type="button"
            className="v3d-badge-btn v3d-badge-btn--light"
            onClick={openViewer}
            aria-label="Inspect Warble AI 3.0 in 3D"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>360° Inspect in 3D</span>
          </button>
        </div>

        <Reveal y={48} amount={0.15} className="cl__stage">
          <div className="cl__media">
            {ITEMS.map((it, i) => (
              <img
                key={it.id}
                className={`cl__img cl__img--${it.fit}`}
                data-active={i === active}
                src={it.img.src}
                srcSet={it.img.srcSet}
                sizes="(min-width: 1024px) 760px, 90vw"
                width={it.img.w}
                height={it.img.h}
                alt={i === active ? it.alt : ''}
                aria-hidden={i !== active}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <ul className="cl__pills">
            {ITEMS.map((it, i) => {
              const open = i === active;
              return (
                <li key={it.id} className="cl-pill" data-active={open}>
                  <button type="button" className="cl-pill__button" aria-expanded={open} onClick={() => setActive(i)}>
                    <span className="cl-pill__icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="cl-pill__content">
                      <span className="cl-pill__swap cl-pill__swap--label" aria-hidden={open}>
                        <span className="cl-pill__label">{it.label}</span>
                      </span>
                      <span className="cl-pill__swap cl-pill__swap--text" aria-hidden={!open}>
                        <span className="cl-pill__text">
                          <strong>{it.label}.</strong> {keepCompounds(it.text)}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
