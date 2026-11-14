import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import sensor800 from '../assets/warble/sensor-glow-800.webp';
import sensor1600 from '../assets/warble/sensor-glow-1600.webp';
import orb from '../assets/warble/ai-orb.webp';
import splash from '../assets/warble/splash-band.webp';
import band480 from '../assets/warble/hero-band-480.webp';
import band800 from '../assets/warble/hero-band-800.webp';
import pcb800 from '../assets/warble/pcb-made-in-india-800.webp';
import pcb1600 from '../assets/warble/pcb-made-in-india-1600.webp';
import Reveal from './Reveal';
import { keepCompounds } from '../lib/text';

const DURATION = 6000;

const SLIDES = [
  {
    id: 'physiology',
    lead: 'Expert in physiological understanding.',
    text: 'Capturing precise, real-time data for reliable monitoring and prediction.',
  },
  {
    id: 'intelligence',
    lead: 'Custom-developed AI for India and Indians.',
    text: 'A model built by us, for the people who wear it.',
  },
  {
    id: 'always',
    tone: 'light',
    lead: 'Light. Tough. Always there.',
    text: 'Water-resistant, built for the moments that push back.',
  },
  {
    id: 'design',
    lead: 'Comfort and sleek design.',
    text: 'Hexagonal-vent loop band in bold orange, with a rugged, minimal case.',
  },
  {
    id: 'india',
    lead: 'Every layer, designed by us.',
    text: 'Embedded systems, custom-designed PCB boards and proprietary AI architecture, all developed in-house in India.',
  },
];

function SlideMedia({ id }) {
  switch (id) {
    case 'physiology':
      return (
        <img
          className="hl-media hl-media--sensor"
          src={sensor1600}
          srcSet={`${sensor800} 800w, ${sensor1600} 1600w`}
          sizes="(min-width: 1024px) 760px, 100vw"
          width="1600"
          height="909"
          alt="The sensor window on the back of Warble AI, glowing red and green"
          loading="lazy"
          decoding="async"
        />
      );
    case 'intelligence':
      return <img className="hl-media hl-media--orb" src={orb} width="880" height="912" alt="" loading="lazy" decoding="async" />;
    case 'always':
      return (
        <img
          className="hl-media hl-media--splash"
          src={splash}
          width="600"
          height="623"
          alt="Warble AI splashing into water"
          loading="lazy"
          decoding="async"
        />
      );
    case 'design':
      return (
        <div className="hl-media hl-media--band">
          <span className="hl-aura" aria-hidden="true" />
          <img
            src={band800}
            srcSet={`${band480} 480w, ${band800} 800w`}
            sizes="(min-width: 1024px) 300px, 50vw"
            width="800"
            height="1129"
            alt="Warble AI with its orange hexagonal-vent loop band"
            loading="lazy"
            decoding="async"
          />
        </div>
      );
    default:
      return (
        <img
          className="hl-media hl-media--pcb"
          src={pcb1600}
          srcSet={`${pcb800} 800w, ${pcb1600} 1600w`}
          sizes="(min-width: 1024px) 760px, 100vw"
          width="1600"
          height="900"
          alt="The Warble AI circuit board, marked Made in India"
          loading="lazy"
          decoding="async"
        />
      );
  }
}

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
    <path d="M2 1.6v12.8a.8.8 0 0 0 1.2.7l10.6-6.4a.8.8 0 0 0 0-1.4L3.2.9A.8.8 0 0 0 2 1.6Z" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
    <rect x="2" y="1" width="3.6" height="14" rx="1.2" fill="currentColor" />
    <rect x="8.4" y="1" width="3.6" height="14" rx="1.2" fill="currentColor" />
  </svg>
);
const ReplayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M3.3 9a5.7 5.7 0 1 0 1.9-4.25M3.3 2.6v3.2h3.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * "Get the highlights." — Apple-style gallery. Advances on its own while in view, shows the
 * running time in the active dot, and hands control to the visitor the moment they swipe,
 * scroll or pick a dot.
 */
export default function Highlights() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const programmatic = useRef(false);
  const settleTimer = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.45 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);
  const autoplay = playing && !reduce && inView && !ended;

  const scrollToIndex = useCallback(
    (i) => {
      const track = trackRef.current;
      const card = track?.children[i];
      if (!card) return;
      const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      // Our own smooth scroll is in flight until the track settles (see onScroll).
      programmatic.current = true;
      track.scrollTo({ left: card.offsetLeft - pad, behavior: reduce ? 'auto' : 'smooth' });
      setIndex(i);
    },
    [reduce],
  );

  // Advance while playing and on screen; stop on the last card and offer a replay.
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => {
      if (index >= SLIDES.length - 1) {
        setEnded(true);
        setPlaying(false);
      } else {
        scrollToIndex(index + 1);
      }
    }, DURATION);
    return () => window.clearTimeout(t);
  }, [autoplay, index, scrollToIndex]);

  const nearestCard = () => {
    const track = trackRef.current;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    let nearest = 0;
    let best = Infinity;
    [...track.children].forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - pad - track.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    return nearest;
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    window.clearTimeout(settleTimer.current);
    // Once the track stops moving, sync the dots to wherever it actually came to rest.
    settleTimer.current = window.setTimeout(() => {
      programmatic.current = false;
      if (trackRef.current) setIndex(nearestCard());
    }, 140);
    if (programmatic.current) return;
    // The visitor moved the gallery themselves: follow them and stop autoplay.
    setPlaying(false);
    setEnded(false);
    setIndex(nearestCard());
  };

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const onToggle = () => {
    if (ended) {
      setEnded(false);
      setPlaying(true);
      scrollToIndex(0);
      return;
    }
    setPlaying((p) => !p);
  };

  const label = ended ? 'Replay highlights' : autoplay || (playing && !reduce) ? 'Pause highlights' : 'Play highlights';

  return (
    <section id="highlights" ref={sectionRef} className="hl" data-theme="dark" aria-labelledby="hl-title">
      <div className="wrap-wide">
        <Reveal as="h2" id="hl-title" className="t-section-title">
          Get the highlights.
        </Reveal>
      </div>

      <Reveal y={60} amount={0.1}>
        <ul
          ref={trackRef}
          className="hl__track"
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Warble AI highlights"
          aria-roledescription="carousel"
        >
          {SLIDES.map((s, i) => (
            <li
              key={s.id}
              className={`hl-card hl-card--${s.id}`}
              data-tone={s.tone ?? 'dark'}
              data-active={i === index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
            >
              <p className="hl-card__caption">
                <span className="hl-card__lead">{keepCompounds(s.lead)}</span> {keepCompounds(s.text)}
              </p>
              <SlideMedia id={s.id} />
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="hl__controls">
        <div className="hl-dots" role="group" aria-label="Choose a highlight">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="hl-dot"
              aria-current={i === index}
              aria-label={`Show highlight ${i + 1}: ${s.lead}`}
              onClick={() => {
                setPlaying(false);
                setEnded(false);
                scrollToIndex(i);
              }}
            >
              <span className="hl-dot__track">
                <span
                  key={`${index}-${autoplay}`}
                  className="hl-dot__fill"
                  data-running={i === index && autoplay}
                  style={{ animationDuration: `${DURATION}ms` }}
                />
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="hl-play" onClick={onToggle} aria-label={label}>
          {ended ? <ReplayIcon /> : label.startsWith('Pause') ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </section>
  );
}
