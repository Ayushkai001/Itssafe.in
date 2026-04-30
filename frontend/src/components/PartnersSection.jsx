import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  { name: 'TATA Steel', category: 'STEEL & MINING' },
  { name: 'Coal India Limited', category: 'ENERGY' },
  { name: 'L&T Construction', category: 'INFRASTRUCTURE' },
  { name: 'ONGC', category: 'PETROCHEMICAL' },
  { name: 'NTPC Limited', category: 'POWER' },
  { name: 'Adani Ports', category: 'LOGISTICS' },
];

// Duplicate for seamless infinite loop
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      );
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      );

      // Marquee row 1 — left
      gsap.to(track1Ref.current, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });

      // Marquee row 2 — right (opposite direction)
      gsap.fromTo(track2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 35,
          ease: 'none',
          repeat: -1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section_1b"
      className="relative py-24 overflow-hidden border-t border-white/[0.05]"
      style={{ backgroundColor: '#080808' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16 mb-16">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-6 opacity-0">
          <div className="w-8 h-[1px] bg-[#3FE56C]" />
          <span className="text-[11px] uppercase tracking-[0.45em] text-[#3FE56C] font-['Inter']">
            TRUSTED BY
          </span>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="font-['Inter'] font-light text-white/40 text-base max-w-2xl leading-relaxed opacity-0"
        >
          From underground mining operations to high-rise construction and petrochemical refineries, ITS SAFE Solutions partners with industry leaders who refuse to compromise on the safety of their workforce. Our deployments span 15+ countries across four continents.
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative overflow-hidden h-20 mb-px border-y border-white/[0.04]">
        <div
          ref={track1Ref}
          className="flex will-change-transform"
          style={{ width: 'max-content' }}
        >
          {MARQUEE_ITEMS.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-10 shrink-0 group cursor-default"
            >
              <span className="font-['Space_Grotesk'] font-semibold text-white/25 text-xl uppercase tracking-wide group-hover:text-white transition-colors duration-300">
                {p.name}
              </span>
              <span className="text-[9px] font-['Inter'] uppercase tracking-[0.35em] text-[#3FE56C]/50 group-hover:text-[#3FE56C] transition-colors duration-300">
                {p.category}
              </span>
              <span className="text-white/[0.08] text-2xl">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reversed */}
      <div className="relative overflow-hidden h-20">
        <div
          ref={track2Ref}
          className="flex will-change-transform"
          style={{ width: 'max-content', transform: 'translateX(-50%)' }}
        >
          {MARQUEE_ITEMS.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-10 shrink-0 group cursor-default"
            >
              <span className="text-[9px] font-['Inter'] uppercase tracking-[0.35em] text-[#B0C6FF]/30 group-hover:text-[#B0C6FF] transition-colors duration-300">
                {p.category}
              </span>
              <span className="font-['Space_Grotesk'] font-semibold text-white/15 text-xl uppercase tracking-wide group-hover:text-white/60 transition-colors duration-300">
                {p.name}
              </span>
              <span className="text-white/[0.05] text-2xl">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
