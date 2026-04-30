import React, { useRef, useState } from 'react';

const MouseReactiveButton = ({ children, className = '' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden px-8 py-4 rounded-full font-medium tracking-wide text-white bg-black border border-[#3FE56C]/30 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(63,229,108,0.2)] group ${className}`}
      style={{
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
      }}
    >
      {/* Iridescent Glow that follows the mouse wrapper */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 100px at var(--x) var(--y), rgba(63, 229, 108, 0.4), transparent 100%)`
        }}
      />
      
      {/* Dynamic striking border */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#3FE56C] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default MouseReactiveButton;
