import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Icon from './Icons';
import Reveal from './Reveal';
import { keepCompounds } from '../lib/text';
import preventImg from '../assets/promise/prevent.jpg';
import predictImg from '../assets/promise/predict.jpg';
import protectImg from '../assets/warble/hero-band-800.webp';

const DURATION = 6000;

const PILLARS = [
  {
    id: 'prevent',
    title: 'Prevent',
    icon: 'shieldCheck',
    lead: 'Identifying risks before they become disasters.',
    text: 'Continuous real-time industrial hazard surveillance and environmental telemetry to detect collapse, gas leaks, and machinery threats before they escalate.',
    image: preventImg,
  },
  {
    id: 'predict',
    title: 'Predict',
    icon: 'burst',
    lead: 'AI/ML models for real-time monitoring and early warnings.',
    text: 'Custom in-house algorithms trained over crores of data windows to forecast worker fatigue, heat stress, and hazardous anomalies seconds in advance.',
    image: predictImg,
  },
  {
    id: 'protect',
    title: 'Protect',
    icon: 'watchPulse',
    lead: 'Smart wearable devices for health monitoring and prediction.',
    text: 'Rugged IP68 Warble AI hardware equipped with multimodal physiological sensors guarding industrial workforces 24/7 in extreme conditions.',
    image: protectImg,
  },
  // {
  //   id: 'preserve',
  //   title: 'Preserve',
  //   icon: 'users',
  //   lead: 'Saving lives and building a culture of safety.',
  //   text: 'Eliminating preventable industrial risks and empowering teams with predictive safety systems. Because every human life is valuable.',
  //   image: preserveImg,
  // },
];

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
 * "Our Promise" — Apple-style interactive gallery representing Prevent, Predict,
 * Protect, and Preserve with custom vector watermarks, ambient atmospheric lighting,
 * smooth snap carousel, and progress controls.
 */
export default function OurPromise() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const programmatic = useRef(false);
  const settleTimer = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);
  const [protectTilt, setProtectTilt] = useState({ rx: 0, ry: 0, tz: 0, active: false });
  const autoplay = playing && !reduce && inView && !ended;

  const onProtectMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1
    setProtectTilt({
      rx: -(py * 14),
      ry: px * 16,
      tz: 70,
      active: true,
    });
  }, []);

  const onProtectMouseLeave = useCallback(() => {
    setProtectTilt({ rx: 0, ry: 0, tz: 0, active: false });
  }, []);

  const scrollToIndex = useCallback(
    (i) => {
      const track = trackRef.current;
      const card = track?.children[i];
      if (!card) return;
      const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      programmatic.current = true;
      track.scrollTo({ left: card.offsetLeft - pad, behavior: reduce ? 'auto' : 'smooth' });
      setIndex(i);
    },
    [reduce],
  );

  // Auto-advance through pillars when in view
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => {
      if (index >= PILLARS.length - 1) {
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
    if (!track) return 0;
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
    settleTimer.current = window.setTimeout(() => {
      programmatic.current = false;
      if (trackRef.current) setIndex(nearestCard());
    }, 140);
    if (programmatic.current) return;
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

  const label = ended
    ? 'Replay our promise'
    : autoplay || (playing && !reduce)
      ? 'Pause promise gallery'
      : 'Play promise gallery';

  return (
    <section id="promise" ref={sectionRef} className="promise" data-theme="dark" aria-labelledby="promise-title">
      <div className="wrap-text promise__head">
        <Reveal as="p" className="t-eyebrow">
          Our promise
        </Reveal>
        <Reveal as="h2" id="promise-title" className="t-section-title" delay={0.06}>
          Prevent. Predict. Protect. <br className="br-xl" />
          <span className="promise__tagline">Save life at penny amount</span>
        </Reveal>
      </div>

      <Reveal y={48} amount={0.1}>
        <ul
          ref={trackRef}
          className="promise__track"
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Warble AI promise pillars"
          aria-roledescription="carousel"
        >
          {PILLARS.map((p, i) => (
            <li
              key={p.id}
              className={`promise-card promise-card--${p.id}`}
              data-active={i === index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${PILLARS.length}: ${p.title}`}
              onClick={() => {
                if (i !== index) scrollToIndex(i);
              }}
              onMouseMove={p.id === 'protect' ? onProtectMouseMove : undefined}
              onMouseLeave={p.id === 'protect' ? onProtectMouseLeave : undefined}
            >
              {/* Atmospheric 3D Render & Ambient Lighting Layer */}
              <div className="promise-card__watermark" aria-hidden="true">
                <span className={`promise-card__aura promise-card__aura--${p.id}`} />
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`promise-media promise-media--${p.id}`}
                  width="1024"
                  height="1024"
                  style={
                    p.id === 'protect'
                      ? {
                          '--tilt-rx': `${protectTilt.rx.toFixed(2)}deg`,
                          '--tilt-ry': `${protectTilt.ry.toFixed(2)}deg`,
                          '--tilt-tz': `${protectTilt.tz}px`,
                          '--tilt-scale': protectTilt.active ? '1.24' : '1.15',
                        }
                      : undefined
                  }
                />
              </div>

              {/* Foreground Typography */}
              <div className="promise-card__caption">
                <div className={`promise-card__badge promise-card__badge--${p.id}`}>
                  <Icon name={p.icon} strokeWidth={2.2} />
                  <span>{p.title}</span>
                </div>
                <h3 className="promise-card__lead">{keepCompounds(p.lead)}</h3>
                <p className="promise-card__text">{keepCompounds(p.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Highlights-style Progress Dots & Playback Controls */}
      <div className="promise__controls">
        <div className="promise-dots" role="group" aria-label="Choose a promise pillar">
          {PILLARS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="promise-dot"
              aria-current={i === index}
              aria-label={`Show ${p.title} pillar`}
              onClick={() => {
                setPlaying(false);
                setEnded(false);
                scrollToIndex(i);
              }}
            >
              <span className="promise-dot__track">
                <span
                  key={`${index}-${autoplay}`}
                  className="promise-dot__fill"
                  data-running={i === index && autoplay}
                  style={{ animationDuration: `${DURATION}ms` }}
                />
              </span>
              <span className="promise-dot__title">{p.title}</span>
            </button>
          ))}
        </div>
        <button type="button" className="promise-play" onClick={onToggle} aria-label={label}>
          {ended ? <ReplayIcon /> : label.startsWith('Pause') ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </section>
  );
}
