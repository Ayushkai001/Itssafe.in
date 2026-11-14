import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import videoSrc from '../assets/warble/warble-physiology.mp4';
import posterSrc from '../assets/warble/warble-physiology-poster.webp';
import orb from '../assets/warble/ai-orb.webp';
import splash from '../assets/warble/splash-band.webp';
import design760 from '../assets/warble/design-band-760.webp';
import design1240 from '../assets/warble/design-band-1240.webp';
import Reveal from './Reveal';
import { EASE_OUT } from '../lib/motion';
import { keepCompounds } from '../lib/text';

const LEAD = 'A smart wearable for continuous health monitoring and early alerts, combining'.split(' ');

/** The opening statement. Its words fill in from grey to black as it scrolls into view. */
function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.42'] });

  return (
    <div ref={ref} className="statement wrap-text">
      <p className="t-statement">
        {LEAD.map((word, i) =>
          reduce ? (
            <span key={i}>{word} </span>
          ) : (
            <Word key={i} progress={scrollYProgress} range={[i / LEAD.length, (i + 1) / LEAD.length]}>
              {word}
            </Word>
          ),
        )}
        <span className="is-muted">{keepCompounds('comfort and sleek design for real-world performance.')}</span>
      </p>
    </div>
  );
}

function Word({ progress, range, children }) {
  const color = useTransform(progress, range, ['#d2d2d7', '#000000']);
  return (
    <>
      <m.span style={{ color }}>{children}</m.span>{' '}
    </>
  );
}

function Tile({ id, dark = false, className = '', eyebrow, title, copy, children }) {
  return (
    <Reveal
      as="article"
      y={48}
      amount={0.15}
      className={`tile${dark ? ' tile--dark' : ''} ${className}`}
      aria-labelledby={id}
    >
      <p className="t-tile-eyebrow">{eyebrow}</p>
      <h3 id={id} className="t-tile-title tile__title">
        {keepCompounds(title)}
      </h3>
      <p className="t-tile-copy tile__copy">{keepCompounds(copy)}</p>
      {children}
    </Reveal>
  );
}

const PlayIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
    <path d="M1.5 1.4v11.2a.6.6 0 0 0 .9.52l9.4-5.6a.6.6 0 0 0 0-1.04L2.4.88a.6.6 0 0 0-.9.52Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
    <rect x="1.5" y="1" width="3" height="12" rx="1" fill="currentColor" />
    <rect x="7.5" y="1" width="3" height="12" rx="1" fill="currentColor" />
  </svg>
);

/**
 * The original Figma animation, streamed bit-for-bit. It loads only as it nears the
 * viewport, plays while visible, pauses off-screen, and never autoplays for users who
 * prefer reduced m.
 */
function PhysiologyVideo() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const near = useInView(wrapRef, { once: true, margin: '600px 0px' });
  const visible = useInView(wrapRef, { amount: 0.3 });
  const [choice, setChoice] = useState(null); // null = automatic, true = play, false = pause
  const [playing, setPlaying] = useState(false);
  const wantsPlay = choice ?? !reduce;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near) return;
    if (visible && wantsPlay) {
      v.muted = true;
      v.play()?.catch(() => {});
    } else {
      v.pause();
    }
  }, [near, visible, wantsPlay]);

  return (
    <div ref={wrapRef} className="tile__video">
      <video
        ref={videoRef}
        src={near ? videoSrc : undefined}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload={near ? 'auto' : 'none'}
        disablePictureInPicture
        disableRemotePlayback
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Animation of the Warble AI module opening to reveal its custom circuit board and sensors"
      />
      <button
        type="button"
        className="video-toggle"
        data-paused={!playing}
        onClick={() => setChoice(!playing)}
        aria-label={playing ? 'Pause animation' : 'Play animation'}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

function Orb() {
  const reduce = useReducedMotion();
  return (
    <div className="tile__orb" aria-hidden="true">
      <m.img
        src={orb}
        alt=""
        width="880"
        height="912"
        loading="lazy"
        decoding="async"
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={reduce ? undefined : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  );
}

function Splash() {
  const reduce = useReducedMotion();
  return (
    <m.div
      className="tile__splash"
      initial={reduce ? false : { opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.1 }}
    >
      <img
        src={splash}
        alt="The Warble AI band splashing into water"
        width="600"
        height="623"
        loading="lazy"
        decoding="async"
      />
    </m.div>
  );
}

function DesignTile() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <Reveal
      ref={ref}
      as="article"
      y={48}
      amount={0.15}
      className="tile tile--dark tile--design"
      aria-labelledby="tile-design"
    >
      <div className="tile__bg">
        <m.img
          src={design1240}
          srcSet={`${design760} 760w, ${design1240} 1240w`}
          sizes="(min-width: 1280px) 1240px, 100vw"
          width="1240"
          height="634"
          alt="Side view of the Warble AI module on its orange band"
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { scale }}
        />
      </div>
      <p className="t-tile-eyebrow">Design</p>
      <h3 id="tile-design" className="t-tile-title tile__title">
        Comfort and sleek design.
      </h3>
      <p className="t-tile-copy tile__copy">
        {keepCompounds('Hexagonal-vent loop band in bold orange, with a rugged, minimal case.')}
      </p>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <h2 id="features-title" className="sr-only">
        Warble AI features
      </h2>
      <Statement />
      <div className="wrap-wide bento">
        <Tile
          id="tile-physiology"
          className="tile--physiology"
          eyebrow="Physiology"
          title="Expert in physiological understanding."
          copy="Capturing precise, real-time data for reliable monitoring and prediction."
        >
          <PhysiologyVideo />
        </Tile>

        <div className="bento__row">
          <Tile
            id="tile-intelligence"
            dark
            eyebrow="Predictive intelligence"
            title="Custom-developed AI for India and Indians."
            copy="A model built by us, for the people who wear it."
          >
            <Orb />
          </Tile>
          <Tile
            id="tile-always"
            eyebrow="Always there"
            title="Light. Tough. Always there."
            copy="Light enough to forget, tough enough to trust. Water-resistant, built for the moments that push back."
          >
            <Splash />
          </Tile>
        </div>

        <DesignTile />
      </div>
    </section>
  );
}
