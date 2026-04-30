import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The statement to reveal — adapted to ItsSAFE's identity
const STATEMENT =
  "When deploying in the field, we focus on how everything will work, feel, and protect. Built with experience across AI and industrial design, we choose technology that supports performance, clarity, and zero compromise.";

const QuoteStatement = () => {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  const words = STATEMENT.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub each word from dim → fully opaque as user scrolls through the section
      gsap.fromTo(
        wordsRef.current,
        { opacity: 0.08, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center py-28 md:py-40 px-6 md:px-16 overflow-hidden"
      style={{ backgroundColor: '#f2e8d9' }}
    >
      {/* Subtle vignette edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 60%, rgba(230,218,198,0.5) 100%)',
        }}
      />

      {/* Section eyebrow label */}
      <div className="absolute top-10 left-6 md:left-16 flex items-center gap-3 opacity-40">
        <div className="w-4 h-[1px] bg-[#1a1a1a]" />
        <span
          className="text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a] font-['Inter']"
        >
          Our Philosophy
        </span>
      </div>

      {/* Statement */}
      <p
        className="relative z-10 text-center font-['Space_Grotesk'] font-bold leading-[1.15] max-w-5xl"
        style={{ fontSize: 'clamp(1.6rem, 3.6vw, 4rem)', color: '#1a1612' }}
        aria-label={STATEMENT}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="inline-block mr-[0.22em] mb-[0.08em] will-change-transform"
            style={{ opacity: 0.08 }}
          >
            {word}
          </span>
        ))}
      </p>

      {/* Bottom separator line */}
      <div className="absolute bottom-10 left-6 md:left-16 right-6 md:right-16 h-[1px] bg-[#1a1a1a]/10" />
    </section>
  );
};

export default QuoteStatement;
