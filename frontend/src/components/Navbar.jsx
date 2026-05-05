import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/itssafe_logo.png';

const NavMenu = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const overlayRef = useRef(null);

  const links = [
    { label: 'Home', id: null },
    { label: 'About', id: 'section_1a' },
    { label: 'Our Focus Area', id: 'focus-area' },
    { label: 'Contact', id: 'section_2c' },
    { label: 'Team', id: 'team' },
  ];

  const scrollTo = (id) => {
    onClose();
    setTimeout(() => {
      if (!id) {
        window.lenis?.scrollTo(0);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        window.lenis?.scrollTo(el, {
          offset: -80, // adjust for navbar height
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }, 400); // wait for panel close animation
  };


  useEffect(() => {
    if (isOpen) {
      // Slide in panel
      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.7,
        ease: 'power4.out',
      });
      // Fade in overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      // Stagger links from below
      gsap.fromTo(
        linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.to(panelRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <>
      {/* Dark overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Slide-out Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-50 h-full w-full md:w-[58vw] bg-[#0a0a0a] border-l border-white/5 flex flex-col justify-between px-10 md:px-16 py-12"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-white rounded-xl px-3 py-1 shadow-sm">
            <img src={logo} alt="ITS SAFE" className="h-8 w-auto object-contain" />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#3FE56C]/50 transition-colors duration-300 group"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#3FE56C] transition-colors" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#3FE56C] transition-colors" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center gap-1">
          {links.map((link, i) => (
            <button
              key={i}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={() => scrollTo(link.id)}
              className="group relative flex items-baseline justify-between py-5 border-b border-white/5 overflow-hidden w-full text-left"
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-[#3FE56C]/3 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

              <span className="relative text-5xl md:text-7xl font-['Space_Grotesk'] font-bold uppercase tracking-tighter text-white group-hover:text-[#3FE56C] transition-colors duration-300">
                {link.label}
              </span>
              <span className="relative text-xs text-white/20 font-['Inter'] uppercase tracking-[0.3em]">
                0{i + 1}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-1 font-['Inter']">Based In</p>
            <p className="text-sm text-white/50 font-['Inter']">India   </p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/itssafe-solutions" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-white/30 hover:text-[#3FE56C] transition-colors duration-200 font-['Inter']">LinkedIn</a>
            <a href="mailto:itssafewithus@itssafe.in" className="text-[11px] uppercase tracking-widest text-white/30 hover:text-[#3FE56C] transition-colors duration-200 font-['Inter']">Email</a>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Fade in navbar on load
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });

    // Scroll-based background
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 60) {
          navRef.current.classList.add('nav-scrolled');
        } else {
          navRef.current.classList.remove('nav-scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500"
        style={{ opacity: 0 }}
      >
        {/* Logo / Brand */}
        <a href="#" className="flex items-center group bg-white rounded-xl px-1 py-0 shadow-sm transition-transform duration-200 hover:scale-105">
          <img src={logo} alt="ITS SAFE" className="h-10 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/8 rounded-full px-2 py-1 backdrop-blur-xl">
          {[
            { label: 'About', id: 'section_1a' },
            { label: 'Our Focus Area', id: 'focus-area' },
            { label: 'Team', id: 'team' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) {
                  window.lenis?.scrollTo(el, { offset: -80, duration: 1.5 });
                }
              }}
              className="px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200 font-['Inter']"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('section_2c');
              if (el) window.lenis?.scrollTo(el, { offset: -80, duration: 1.5 });
            }}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 text-[11px] uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-[#3FE56C]/50 transition-all duration-300 font-['Inter'] hover:bg-[#3FE56C]/10"
          >
            Buy Now
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 hover:border-[#3FE56C]/40 transition-all duration-300 group"
            aria-label="Open menu"
          >
            <span className="w-4 h-[1px] bg-white group-hover:bg-[#3FE56C] transition-all duration-300" />
            <span className="w-3 h-[1px] bg-white/50 group-hover:bg-[#3FE56C]/70 group-hover:w-4 transition-all duration-300" />
          </button>
        </div>
      </nav>

      <NavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        .nav-scrolled {
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
      `}</style>
    </>
  );
};

export default Navbar;