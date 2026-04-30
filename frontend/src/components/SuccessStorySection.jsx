import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import mine_high_res from '../assets/mine_high_res.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SuccessStorySection = () => {
  const bgRef = useRef(null);

  useGSAP(() => {
    if (!bgRef.current) return;
    gsap.fromTo(bgRef.current,
      { scale: 1, x: 10 },
      {
        scale: 1.15,
        x: -10,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }
    );
  }, { scope: bgRef });

  return (
    <section
      id="section_1c"
      className="relative min-h-[90vh] flex items-center justify-center py-24 px-6 md:px-16 overflow-hidden bg-black"
    >
      {/* ── Background: The Provided Aerial Mine Visual ── */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div
          style={{
            backgroundImage: `url(${mine_high_res})`,
            filter: 'brightness(1.1) contrast(1.1) saturate(1.2) sepia(10%) blur(4px)', // Earthy/Industrial warm tone
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0"
        />
        {/* Subtle cinematic overlay to blend with dark site but keep the "earthy" feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* ── The Glassmorphism Card (OPTIMIZED) ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1100px] h-auto min-h-[500px] rounded-[48px] overflow-hidden p-10 md:p-20 flex flex-col items-center justify-center gap-12 text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Top Section: High-Contrast Heading */}
        <div className="max-w-4xl">
          <div className="flex justify-center mb-8">
            <a href="https://www.sciencedirect.com/science/article/pii/S209044792300312X?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: '#404040' }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 bg-[#2d2d2d] transition-colors rounded-full px-6 py-2.5 w-fit shadow-lg cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-white font-['Inter'] font-medium text-sm tracking-wide">Research Insights</span>
              </motion.div>
            </a>
          </div>
          
          <h2 className="font-['Space_Grotesk'] font-bold text-white leading-[1.2] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            According to the <span className="text-blue-400">ILO</span>,
            <br />
            <span className="text-white/90">
              2.78 million workers die annually due to occupational accidents.
            </span>
          </h2>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <span className="block text-4xl font-bold text-blue-400 mb-2 font-['Space_Grotesk']">2.4M</span>
              <p className="text-white/60 text-sm font-['Inter'] leading-relaxed">Annual fatalities attributed specifically to occupational diseases worldwide.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <span className="block text-4xl font-bold text-blue-400 mb-2 font-['Space_Grotesk']">374M</span>
              <p className="text-white/60 text-sm font-['Inter'] leading-relaxed">Workers suffer from non-fatal occupational accidents requiring extended leave.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center mt-4">
          <a href="https://www.sciencedirect.com/science/article/pii/S209044792300312X?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-full px-10 py-4 w-fit shadow-2xl font-bold uppercase tracking-[0.2em] text-xs"
            >
              Continue Reading
            </motion.button>
          </a>
        </div>

        {/* Inner glow effect */}
        <div className="absolute inset-0 pointer-events-none rounded-[48px] ring-1 ring-inset ring-white/10" />
      </motion.div>
    </section>
  );
};

export default SuccessStorySection;
