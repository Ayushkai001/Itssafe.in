import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const enhanceCursor = () => {
      gsap.to(cursor, {
        scale: 3.5,
        backgroundColor: 'rgba(63, 229, 108, 0.4)',
        borderColor: 'transparent',
        duration: 0.3
      });
    };

    const normalizeCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,0.4)',
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Watch for interactions
    const addListeners = () => {
      const interactables = document.querySelectorAll('button, a, .tc-card');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', enhanceCursor);
        el.addEventListener('mouseleave', normalizeCursor);
      });
    };

    // Delay to let DOM elements render
    setTimeout(addListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactables = document.querySelectorAll('button, a, .tc-card');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', enhanceCursor);
        el.removeEventListener('mouseleave', normalizeCursor);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/40 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      style={{ willChange: 'transform' }}
    />
  );
};

export default CustomCursor;
