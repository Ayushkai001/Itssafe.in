import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import mineviz from '../assets/mineviz.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const robotRef = useRef(null);
  const glowRef = useRef(null);
  const scanRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Text reveal
    gsap.fromTo('.reveal-text',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
    );

    // 2. Initial Fade-in (Fast)
    gsap.to(robotRef.current, {
      opacity: 0.9,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.2
    });

    // 2b. Cinematic Drift/Zoom (Continuous)
    gsap.fromTo(robotRef.current,
      { scale: 1.1, x: 20 },
      {
        scale: 1.25,
        x: -20,
        duration: 5,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      }
    );

    // 3. Ambient Glow
    gsap.to(glowRef.current, {
      opacity: 0.4,
      scale: 1.2,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // 4. Scan Sweep
    gsap.fromTo(scanRef.current,
      { y: '-10%', opacity: 0 },
      {
        y: '800%',
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className='hero-section h-screen relative overflow-hidden bg-black font-["Inter",sans-serif]'
    >
      {/* ── Background Aesthetics ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Core Brand Gradient - Logo Navy to Deep Teal */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 10% 10%, #1B2D6E 0%, transparent 60%), radial-gradient(circle at 90% 90%, #0D7E8A 0%, transparent 60%)'
          }}
        />

        {/* The Robot Subject */}
        <div
          ref={robotRef}
          className="absolute inset-[-10%] bg-no-repeat bg-center bg-cover will-change-transform"
          style={{
            backgroundImage: `url(${mineviz})`,
            filter: 'brightness(1.1) contrast(1.1) saturate(0.8)',
            mixBlendMode: 'plus-lighter', // Allows dark parts to be transparent and lights to pop
          }}
        />

        {/* Central Spotlight - Logo Lime Core */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(109,184,64,0.12) 0%, rgba(13,126,138,0.08) 30%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Scan line - High Intensity Lime */}
        <div
          ref={scanRef}
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #6DB840, transparent)',
            boxShadow: '0 0 20px #6DB840',
            mixBlendMode: 'screen',
          }}
        />

        {/* Noise Grain for Premium Feel */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* ── Typography Layer ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center pointer-events-none px-4 md:px-6">
        <div
          className="max-w-6xl w-full text-center rounded-[32px] md:rounded-[48px] overflow-hidden py-12 px-4 md:py-16 md:px-16 relative"
          style={{
            background: 'rgba(194, 107, 0, 0)',
            backdropFilter: 'blur(2px) saturate(150%)',
            WebkitBackdropFilter: 'blur(100px) saturate(150%)',
            border: '1px solid rgba(19, 10, 1, 0.65)',

          }}
        >
          {/* Inner glow effect matching SuccessStorySection */}
          <div className="absolute inset-0 pointer-events-none rounded-[48px] ring-1 ring-inset ring-white/10" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <span className="text-[10px] md:text-[16px] font-['Space_Grotesk'] font-bold text-[#FF9933] uppercase tracking-[0.5em] ml-[0.5em] md:tracking-[1em] md:ml-[1em]">
                NOW IN BHARAT
              </span>
            </motion.div>

            <h1
              className="reveal-text font-['Space_Grotesk'] font-bold text-white leading-[0.8] tracking-tight m-0 p-0"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 13rem)' }}
            >
              ITSSAFE<span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(230, 231, 228, 1)' }}></span>
            </h1>

            <div className="reveal-text flex items-center justify-center gap-6 mt-12">

              <p className="font-['Inter'] font-bold text-white/50 text-[12px] md:text-[18px] uppercase tracking-[0.5em]">
                <span className="text-[10px] md:text-[14px] font-['Space_Grotesk'] font-bold text-[#00D100] uppercase tracking-[0.5em] ml-[0.5em] md:tracking-[1em] md:ml-[1em]">
                  WITH US
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-10 left-0 right-0 z-30 px-8 md:px-16 pointer-events-none">
        <div className="reveal-text flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
          <div className="text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6DB840]" />
            Dhanbad Operation Center
          </div>
          <div className="flex gap-8 text-[9px] font-bold text-white uppercase tracking-widest">
            <span>Est. 2026</span>
          </div>
        </div>
      </div>

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
    </section>
  );
};

export default Hero;