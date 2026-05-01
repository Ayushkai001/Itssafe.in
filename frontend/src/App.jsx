import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Preserved Global Components ──────────────────────────────────────────────
import Navbar from './components/Navbar.jsx';


// ── Preserved Sections (untouched) ──────────────────────────────────────────
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import TeamCarousel from './components/TeamCarousel.jsx';
import Footer from './components/Footer.jsx';

// ── New Section 1: Company Showcase ──────────────────────────────────────────
import CompanyIdentitySection from './components/CompanyIdentitySection.jsx';
import SuccessStorySection from './components/SuccessStorySection.jsx';

// ── New Section 2: Product Experience ────────────────────────────────────────
import CheckoutFlow from './components/CheckoutFlow.jsx';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // ── Optimized Lenis configuration for a premium, weighted feel ──
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1, // Added lerp for smoother interpolation
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Optimized RAF loop
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis to window for use in other components (like Navbar)
    window.lenis = lenis;

    // ── Optimized Burn Section Transition ──
    const burnSections = gsap.utils.toArray('.burn-section');
    burnSections.forEach((section) => {
      gsap.set(section, { 
        willChange: 'filter, transform, opacity',
        transformOrigin: 'center center'
      });

      gsap.fromTo(
        section,
        {
          filter: 'brightness(2) contrast(1.1) sepia(0.5) hue-rotate(-10deg)',
          opacity: 0,
          scale: 0.98,
        },
        {
          filter: 'brightness(1) contrast(1) sepia(0) hue-rotate(0deg)',
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            end: 'top 40%',
            scrub: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        }
      );
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="antialiased text-white bg-black selection:bg-[#3FE56C] selection:text-black min-h-screen relative">

      {/* ── Film Grain Overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── ISO 27001 Badge ── */}
      <a
        href="https://drive.google.com/file/d/17d763UN_hCj1pfiwkKuEvo-JyF3D8ahF/view"
        target="_blank"
        rel="noopener noreferrer"
        title="View DPIIT Certificate"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center bg-white text-black px-1 md:px-1.5 py-4 md:py-6 select-none shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:shadow-green-400/40"
      >
        <span
          className="font-['Space_Grotesk'] font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          DPIIT<span className="text-green-700 my-3 inline-block">●</span> CERTIFIED
        </span>
      </a>

      <Navbar />

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />

        <div className="burn-section"><Marquee /></div>

        <div id="section_1c" className="burn-section"><SuccessStorySection /></div>
        
        <div id="section_1a" className="burn-section"><CompanyIdentitySection /></div>

        <div id="section_2c" className="burn-section"><CheckoutFlow /></div>

        <div id="team" className="burn-section">
          <div className="bg-gray-800 py-24 border-t border-white/5 relative z-20">
            <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-[21px] uppercase tracking-[0.45em] text-gray-50 font-['Inter']">
                  OUR TEAM
                </span>
              </div>
              <h2 className="font-['Space_Grotesk'] font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                Meet the Minds
              </h2>
              <p className="text-[#86868b] mt-4 font-['Inter'] font-light text-lg">
                The visionaries behind ITSSAFE SOLUTIONS.
              </p>
            </div>
            <TeamCarousel />
          </div>
        </div>

        <div className="burn-section"><Footer /></div>
      </main>
    </div>
  );
}

export default App;