import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import videoSrc from '../assets/warble/warble-physiology.mp4';
import posterSrc from '../assets/warble/warble-physiology-poster.webp';

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
 * The original Figma animation, streamed bit-for-bit. It loads only as it nears the viewport,
 * plays while visible, pauses off-screen, and never autoplays for reduced-motion users.
 */
export default function WarbleVideo({ className = '' }) {
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
    <div ref={wrapRef} className={`warble-video ${className}`}>
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
