import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import poster1 from '../assets/poster1.png';
import poster4 from '../assets/poster4.png';
import ai_visualization from '../assets/poster.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7L7 12L12 17L17 12L12 7Z" fill="currentColor" />
      </svg>
    ),
    title: 'Edge AI Processing',
    description: 'Our Own Trained LSTM based sequential Model think faster than danger moves.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" fill="currentColor" />
      </svg>
    ),
    title: 'Biometric Surveillance',
    description: 'Continuous vitals tracking — heart rate, oxygen saturation, heat stress — with autonomous emergency protocols on Top of AI Model.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Hazard Prediction',
    description: 'Pattern recognition across 60lakhs+ data points. We forecast failures before they become incidents.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Safety Report Generations',
    description: 'AI based weekly reports on safety performance, hazards identified, incidents prevented, and overall risk reduction in the mining operations.',
  },
];

const HAZARD_IMAGES = [
  { src: poster1, label: 'Gas Leak Detection', stat: '4 min', statLabel: 'Early Warning' },
];

const BODY_TEXT =
  `ITSSAFE SOLUTIONS is an AIoT company headquartered in Dhanbad, Jharkhand, India, with a footprint across the mining, construction, and energy sectors. We engineer intelligent safety ecosystems that fuse biometric monitoring, real-time hazard detection, and autonomous emergency response into a unified, adaptive system.

Our technology stack leverages edge computing, neural AI processors, and Industrial grade hardware.The result is not just faster response—but predictive prevention at scale.

We don’t respond to danger—we anticipate and eliminate it before it emerges.`;
/* ─── COMPONENT ─── */
const CompanyIdentitySection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline cinematic reveal
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 75%' }
        }
      );

      // Pillar cards stagger
      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 50, rotateX: 8 },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' }
        }
      );



      // Parallax camo background
      gsap.to('.camo-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section_1a"
      className="relative text-[#1a1a1a] overflow-hidden"
      style={{ backgroundColor: '#f2e8d9' }}
    >
      {/* ═══ INSTITUTIONAL BACKGROUND ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#1B2D6E 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#1B2D6E]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3FE56C]/[0.05] rounded-full blur-[100px]" />
      </div>
      {/* ═══ BLOCK 3: The Research Manifesto ═══ */}
      <div className="relative py-32 px-6 md:px-16 lg:px-24 z-10" style={{ backgroundColor: '#f2e8d9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">

            {/* Left: Research Visual */}
            <div className="flex-1 relative order-2 lg:order-1">
              <div className="relative bg-gray-900 overflow-hidden shadow-2xl border-[12px] border-brown-500">
                <img
                  src={ai_visualization}
                  alt="Research Visualization"
                  className="w-full h-auto opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2D6E]/40 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 p-6">
                </div>
              </div>
            </div>

            {/* Right: The Commitment */}
            <div className="flex-1 max-w-2xl order-1 lg:order-2">
              <h3 className="font-['Space_Grotesk'] text-3xl md:text-4xl text-[#1B2D6E] font-bold mb-8 leading-tight">
                Empowering the <span className="text-[#3FE56C]">Next Generation</span> of Mining Safety.
              </h3>

              <div className="identity-body-text font-['Rubik']  font-normal text-lg md:text-xl leading-relaxed text-[#1a1a1a]/70">
                {BODY_TEXT}
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="bg-gray-50 px-6 py-4 border border-black/5 text-center">
                  <p className="text-[9px] text-[#1B2D6E] uppercase font-bold tracking-widest mb-1 ">Operational Office</p>
                  <p className="text-sm text-black font-bold">Dhanbad, Jharkhand, India </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BLOCK 1: The Identity ═══ */}
      <div id="focus-area" className=" bg-[#ffedbd] relative flex items-center py-24 md:py-32 px-6 md:px-16 lg:px-24 z-10">
        <div ref={headlineRef} className="max-w-7xl mx-auto w-full opacity-0">

          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
            {/* Left: Authority & Vision */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">

                <span className="text-[11px] uppercase tracking-[0.3em] text-[#1B2D6E] font-bold">
                  OUR FOCUS AREA
                </span>
              </div>

              <h2 className="font-['Space_Grotesk'] font-bold text-[#1B2D6E] leading-[1.1] tracking-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                Innovation in <br />
                <span className="text-[#3FE56C] drop-shadow-sm">Industry 4.0</span>
              </h2>

              <p className="font-['Rubik'] text-[#1a1a1a]/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                Established at the heart of India's mining capital, ITSSAFE Solutions bridges the gap between academic research and industrial reality. We specialize in transforming high-risk environments into digitally-aware, autonomous safe zones.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <button className="px-8 py-4 bg-[#1B2D6E] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-[#253b8d] hover:shadow-xl active:scale-95">
                  View Our Scope
                </button>
                <div className="flex items-center gap-3 grayscale opacity-40">
                </div>
              </div>

              <div className="mt-12 w-full max-w-[900px]">
                <img src={poster4} alt="Safety Poster" className="w-full h-auto object-contain mix-blend-multiply" />
              </div>
            </div>

            {/* Right: The Showcase */}
            <div className="relative w-full lg:w-[600px] flex-shrink-0">
              {HAZARD_IMAGES.map((img, i) => (
                <div key={i} className="group relative bg-[#1a1a1a] overflow-hidden border border-black/5 flex items-center justify-center">
                  <img src={img.src} alt={img.label} className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BLOCK 2: Strategic Pillars ═══ */}
      <div ref={pillarsRef} className="relative py-24 px-6 md:px-16 lg:px-24 z-10 border-y border-black/5" style={{ backgroundColor: '#fccb82ff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h3 className="text-xl font-bold text-[#1B2D6E] uppercase tracking-[0.3em] mb-4">Strategic Focus</h3>
            <div className="w-20 h-1 bg-[#3FE56C]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PILLARS.map((pillar, i) => (
              <motion.div key={i} className="pillar-card opacity-0">
                <div className="text-2xl text-[#3FE56C] mb-6">{pillar.icon}</div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#1B2D6E] text-lg uppercase mb-4 tracking-wider">{pillar.title}</h4>
                <p className="font-['Inter'] text-[#1a1a1a]/60 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIdentitySection;
