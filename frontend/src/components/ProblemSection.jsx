import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HazardStats = [
  { label: 'DAILY FATALITIES', value: '15', unit: 'DEATHS', detail: 'In US industrial sectors' },
  { label: 'GAS EXPOSURE', value: '42%', unit: 'RISK', detail: 'In underground mining' },
  { label: 'FALL INCIDENTS', value: '1.2M', unit: 'YEARLY', detail: 'Reported worldwide' },
];

const ProblemSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, y: 0, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Stats animation
      gsap.fromTo('.stat-card', 
        { opacity: 0, scale: 0.9, y: 30 }, 
        { 
          opacity: 1, scale: 1, y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );

      // Background HUD lines animation
      gsap.to('.hud-line', {
        width: '100%',
        duration: 2,
        stagger: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#131313] text-[#E5E2E1] overflow-hidden py-24 px-6 md:px-24">
      {/* Background Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border border-[#3FE56C] rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-[#3FE56C] rounded-full animate-pulse"></div>
        </div>
        <div className="hud-line absolute top-1/4 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#3FE56C] to-transparent w-0"></div>
        <div className="hud-line absolute bottom-1/4 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B0C6FF] to-transparent w-0"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <span className="text-[#3FE56C] font-['Inter'] uppercase tracking-[0.5em] text-xs mb-4 block">Section 01 // The Crisis</span>
          <h2 className="text-5xl md:text-8xl font-['Space_Grotesk'] font-bold leading-tight uppercase tracking-tighter">
            INDUSTRIAL<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">INVISIBILITY</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl font-['Manrope'] text-gray-400 max-w-2xl font-light leading-relaxed">
            In the heart of high-risk environments, silence is a threat. Every day, professionals face unseen hazards—gas leaks, mechanical failures, and physiological stress—without a reliable sentinel.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HazardStats.map((stat, i) => (
            <div key={i} className="stat-card group relative p-8 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-xl hover:border-[#3FE56C]/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-[#3FE56C] transition-all duration-500 rounded-l-2xl"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#3FE56C]/60 mb-8 block font-['Inter']">{stat.label}</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-['Space_Grotesk'] font-bold text-white">{stat.value}</span>
                <span className="text-lg font-['Space_Grotesk'] font-bold text-[#3FE56C]">{stat.unit}</span>
              </div>
              <p className="text-sm font-['Manrope'] text-gray-500 uppercase tracking-widest">{stat.detail}</p>
              
              {/* HUD element inside card */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3FE56C" strokeWidth="1" className="animate-spin-slow">
                  <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6">
                <h3 className="text-2xl font-['Space_Grotesk'] font-bold uppercase tracking-wide">The Blind Spot</h3>
                <p className="text-gray-400 font-['Manrope'] leading-relaxed">
                    Standard safety gear hasn't evolved in decades. While the machines become smarter, the protection remains analog. We identified a critical gap: the inability to see the unseen.
                </p>
                <div className="flex gap-4">
                    <div className="w-12 h-[1px] bg-[#3FE56C] self-center"></div>
                    <span className="text-xs uppercase tracking-widest text-[#3FE56C]">Reactive Protection is Outdated</span>
                </div>
           </div>
           <div className="flex-1 w-full aspect-video bg-white/5 rounded-3xl border border-white/5 overflow-hidden relative group">
                {/* Visual representation of problem - maybe a blurry industrial scene with HUD overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="text-center p-8">
                        <span className="text-[#ffb4ab] text-4xl block mb-2 animate-pulse font-['Space_Grotesk']">⚠ HAZARD DETECTED</span>
                        <span className="text-xs text-gray-400 uppercase tracking-[0.5em] font-['Inter']">Environmental Breach Imminent</span>
                     </div>
                </div>
                {/* Animated HUD scan lines */}
                <div className="absolute inset-x-0 h-[2px] bg-[#3FE56C]/30 z-30 animate-scan"></div>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
