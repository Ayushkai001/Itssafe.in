import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import '@google/model-viewer';
import posterImg from '../../assets/warble/design-band-1240.webp';
import { EASE } from '../../lib/motion';

const PRESETS = [
  { id: 'beauty', label: '3/4 Angle', orbit: '45deg 75deg auto' },
  { id: 'front', label: 'Front', orbit: '0deg 75deg auto' },
  { id: 'sensors', label: 'Sensors', orbit: '180deg 85deg auto' },
  { id: 'profile', label: 'Profile', orbit: '90deg 85deg auto' },
  { id: 'top', label: 'Top View', orbit: '0deg 15deg auto' },
];

export default function ModelViewerModal({ open, onClose }) {
  const viewerRef = useRef(null);
  const [activePreset, setActivePreset] = useState('beauty');
  const [autoRotate, setAutoRotate] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Handle loading and events
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !open) return;

    const handleLoad = () => setLoaded(true);
    el.addEventListener('load', handleLoad);
    return () => {
      el.removeEventListener('load', handleLoad);
    };
  }, [open]);

  // Set camera preset
  const handlePreset = (preset) => {
    setActivePreset(preset.id);
    if (viewerRef.current) {
      viewerRef.current.cameraOrbit = preset.orbit;
    }
  };

  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    setAutoRotate((prev) => {
      const next = !prev;
      if (viewerRef.current) {
        if (next) {
          viewerRef.current.setAttribute('auto-rotate', '');
        } else {
          viewerRef.current.removeAttribute('auto-rotate');
        }
      }
      return next;
    });
  };

  // Reset view to default
  const resetView = () => {
    setActivePreset('beauty');
    if (viewerRef.current) {
      viewerRef.current.cameraOrbit = '45deg 75deg auto';
      viewerRef.current.cameraTarget = 'auto auto auto';
      viewerRef.current.jumpCameraToGoal();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="v3d-overlay" role="dialog" aria-modal="true" aria-labelledby="v3d-title">
          {/* Backdrop */}
          <m.div
            className="v3d-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <m.div
            className="v3d-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Header */}
            <div className="v3d-header">
              <div className="v3d-header__info">
                <span className="v3d-pill">360° Interactive Model</span>
                <h2 id="v3d-title" className="v3d-title">
                  Warble AI 3.0
                </h2>
              </div>

              <button
                type="button"
                className="v3d-close"
                onClick={onClose}
                aria-label="Close 3D viewer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* 3D Canvas Stage */}
            <div className="v3d-stage">
              <span className="v3d-aura" aria-hidden="true" />

              {!loaded && (
                <div className="v3d-loader" aria-live="polite">
                  <span className="v3d-spinner" />
                  <span className="v3d-loader__text">Loading Warble AI 3.0 model...</span>
                </div>
              )}

              <model-viewer
                ref={viewerRef}
                src="/models/warble-3.0.glb"
                poster={posterImg}
                alt="Warble AI 3.0 interactive 3D model"
                camera-controls
                touch-action="pan-y"
                auto-rotate={autoRotate ? '' : undefined}
                auto-rotate-delay="2000"
                rotation-per-second="18deg"
                shadow-intensity="1.5"
                shadow-softness="0.8"
                exposure="1.05"
                camera-orbit="45deg 75deg auto"
                min-camera-orbit="auto auto 40%"
                max-camera-orbit="auto auto 200%"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                interaction-prompt="auto"
                class="v3d-canvas"
              >
                <button slot="ar-button" className="v3d-ar-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>View in your space (AR)</span>
                </button>
              </model-viewer>
            </div>

            {/* Bottom Controls Bar */}
            <div className="v3d-controls">
              <div className="v3d-presets">
                <span className="v3d-controls__label">Perspectives:</span>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`v3d-preset-btn ${activePreset === p.id ? 'is-active' : ''}`}
                    onClick={() => handlePreset(p)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="v3d-actions">
                <button
                  type="button"
                  className={`v3d-action-btn ${autoRotate ? 'is-active' : ''}`}
                  onClick={toggleAutoRotate}
                  title={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>{autoRotate ? 'Rotate On' : 'Rotate Off'}</span>
                </button>

                <button
                  type="button"
                  className="v3d-action-btn"
                  onClick={resetView}
                  title="Reset camera view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>

              <p className="v3d-tip">
                Drag to rotate 360° · Scroll or pinch to zoom
              </p>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

