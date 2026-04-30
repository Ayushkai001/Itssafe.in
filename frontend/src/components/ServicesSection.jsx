import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';

const SERVICE_CARDS = [
  {
    id: '01',
    title: 'IoT Ecosystem',
    image: pic1,
    description: 'Autonomous sensor mesh networking for heavy industry.',
    size: 'col-span-2 row-span-2', // Large featured card
  },
  {
    id: '02',
    title: 'Biometric HUD',
    image: pic2,
    description: 'Vitals tracking via integrated helmet sensors.',
    size: 'col-span-1 row-span-1',
  },
  {
    id: '03',
    title: 'Threat AI',
    image: pic3,
    description: 'Predictive hazard detection with sub-3ms response.',
    size: 'col-span-1 row-span-1',
  },
  {
    id: '04',
    title: 'Cloud Ledger',
    image: pic4,
    description: 'ISO-compliant automated reporting and analytics.',
    size: 'col-span-2 row-span-1',
  }
];

const InteractiveServiceGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card', 
        {
          opacity: 0,
          scale: 0.9,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#ebe1d2] py-24 px-6 md:px-16 border-y border-black/5">
      <div className="max-w-7xl mx-auto">

        {/* Header with institutional feel */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-l-2 border-[#1B2D6E] pl-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-[#1B2D6E] leading-none mb-4 tracking-tight">
              CAPABILITY <span className="text-[#3FE56C] drop-shadow-sm">VISUALS</span>
            </h2>
            <p className="text-[#1a1a1a]/60 font-['Inter'] text-sm tracking-widest uppercase font-bold">System deployment architecture v1.02</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-[#1B2D6E] font-bold text-6xl opacity-10 font-mono">002</span>
          </div>
        </div>

        {/* Bento-style Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`service-card group relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#1B2D6E] shadow-xl transition-all duration-500 hover:shadow-2xl ${card.size}`}
            >
              {/* Image Layer with Navy Overlay */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A194E] via-[#1B2D6E]/40 to-transparent opacity-90" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[#3FE56C] font-mono text-xs font-bold">[{card.id}]</span>
                  <div className="w-2 h-2 rounded-full bg-[#3FE56C] shadow-[0_0_10px_#3FE56C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight font-['Space_Grotesk']">{card.title}</h4>
                  <p className="text-sm text-white/70 font-['Inter'] max-w-[240px] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Tactical Scanning Line Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3FE56C]/40 shadow-[0_0_15px_rgba(63,229,108,0.6)] -translate-y-full group-hover:animate-scan" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default InteractiveServiceGrid;