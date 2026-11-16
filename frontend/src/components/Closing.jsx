import { useState, useRef, useCallback } from 'react';
import cutout from '../assets/warble/band.png';
import Reveal from './Reveal';
import { useContact } from './contact/context';

export default function Closing() {
  const { openContact } = useContact();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tz: 0, scale: 1, active: false });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1
    setTilt({
      rx: -(py * 14), // dynamic 3D pitch
      ry: px * 16,    // dynamic 3D yaw
      tz: 70,
      scale: 1.2,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, tz: 0, scale: 1, active: false });
  }, []);

  return (
    <section id="meet" className="closing" data-theme="dark" aria-labelledby="meet-title">
      <Reveal y={56} amount={0.2} className="wrap-wide">
        <div
          ref={cardRef}
          className="closing__card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="closing__visual" aria-hidden="true">
            <span className="closing__halo" />
            <img
              src={cutout}
              width="372"
              height="562"
              alt="Warble AI watch band"
              loading="lazy"
              decoding="async"
              style={
                tilt.active
                  ? {
                      transform: `perspective(1000px) scale(${tilt.scale}) translateZ(${tilt.tz}px) translateY(-16px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
                      zIndex: 10,
                    }
                  : undefined
              }
            />
          </div>
          <div className="closing__copy">
            <div className="closing__badge">
              <span className="closing__badge-dot" />
              <span>Warble AI</span>
            </div>
            <h2 id="meet-title" className="t-h2 closing__title">
              Get Warble AI
            </h2>
            <p className="t-lead closing__sub">The health band that never stops watching over you.</p>
            <div className="actions closing__actions">
              <button type="button" className="btn closing__cta" onClick={openContact}>
                Get in touch
              </button>
              <a className="link closing__link" href="#top">
                <span>Back to top</span>
                <span className="chev" aria-hidden="true">
                  &nbsp;›
                </span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
