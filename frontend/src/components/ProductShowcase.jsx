import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── PRODUCTS DATA ───────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'sentinel-x01',
    name: 'Sentinel X-01',
    tagline: 'The world\'s first AI-neural safety helmet.',
    price: '$2,499',
    deposit: '$299',
    image: '/sentinel-helmet.png',
    tag: 'FLAGSHIP PRODUCT',
    color: '#3FE56C',
    specs: 'Titanium-alloy / Neural AI / IP68',
    badge: 'NEW',
  },
  {
    id: 'senso-band',
    name: 'SensoBand Pro',
    tagline: 'Biometric wearable for continuous worker vitals.',
    price: '$499',
    deposit: '$99',
    image: '/sentinel-wearable.png',
    tag: 'WEARABLE',
    color: '#B0C6FF',
    specs: 'SpO2 / HRV / Heat Index',
    badge: null,
  },
];

// ─── FEATURE CARDS DATA ───────────────────────────────────────────────────────
const FEATURES = [
  {
    category: 'NEURAL AI',
    title: 'Superhuman Hazard Detection',
    body: 'Our edge AI processor identifies 500+ hazard signatures in real-time. Sub-3ms response — faster than any human reflex.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#3FE56C" strokeWidth="1.5" />
        <path d="M14 8v6l4 2" stroke="#3FE56C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-[#3FE56C]/20 to-transparent',
    size: 'large',
  },
  {
    category: 'BIOMETRICS',
    title: 'Continuous Vitals Monitoring',
    body: 'Heart rate, SpO₂, heat stress, and fatigue index — tracked silently and continuously. Every second, every worker.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14h4l3-6 4 12 3-8 3 4h3" stroke="#B0C6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-[#B0C6FF]/20 to-transparent',
    size: 'small',
  },
  {
    category: 'CONNECTIVITY',
    title: 'Mesh-Link Zero Latency',
    body: 'Private mesh network with 2km range. No cloud dependency. Maximum uptime and data sovereignty.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4Z" stroke="#3FE56C" strokeWidth="1.5" />
        <path d="M9 14h10M14 9v10" stroke="#3FE56C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-[#3FE56C]/15 to-transparent',
    size: 'small',
  },
  {
    category: 'COMPLIANCE',
    title: 'Auto-Generated Safety Reports',
    body: 'ISO 45001, OSHA, and MSHA-compliant incident reports generated automatically. One-click regulatory submissions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="4" width="16" height="20" rx="2" stroke="#B0C6FF" strokeWidth="1.5" />
        <path d="M10 10h8M10 14h8M10 18h5" stroke="#B0C6FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-[#B0C6FF]/15 to-transparent',
    size: 'large',
  },
];

// ─── SPECS BOX ────────────────────────────────────────────────────────────────
const TECH_SPECS = [
  { label: 'PROCESSOR', value: 'Sentinel AI v3' },
  { label: 'BATTERY', value: '72hr Active' },
  { label: 'PROTECTION', value: 'IP68 / MIL-STD-810H' },
  { label: 'WEIGHT', value: '680g' },
  { label: 'CONNECTIVITY', value: 'Mesh / BLE 5.3' },
  { label: 'CERTIFICATIONS', value: 'ANSI Z89.1 / EN 397' },
];

// ─── PRODUCT SHOWCASE COMPONENT ───────────────────────────────────────────────
const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const productImgRef = useRef(null);
  const configCardRef = useRef(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [configExpanded, setConfigExpanded] = useState(true);

  const product = PRODUCTS[activeProduct];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero intro animation ──
      gsap.fromTo('.ps-intro-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.ps-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.15,
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.ps-hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }
        }
      );

      // ── Product image float animation ──
      gsap.to(productImgRef.current, {
        y: -18,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ── Config card slide in ──
      gsap.fromTo(configCardRef.current,
        { opacity: 0, x: 60, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power4.out', delay: 0.6,
          scrollTrigger: { trigger: heroRef.current, start: 'top 75%' }
        }
      );

      // ── Feature cards ──
      gsap.fromTo('.ps-feature-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ps-features-grid',
            start: 'top 75%',
          }
        }
      );

      // ── Specs ──
      gsap.fromTo('.ps-spec-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ps-specs-row',
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Swap product image with a mini animation
  const handleProductSwitch = (idx) => {
    if (idx === activeProduct) return;
    gsap.to(productImgRef.current, {
      opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActiveProduct(idx);
        gsap.fromTo(productImgRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#080808] text-white overflow-hidden"
    >
      {/* ── Decorative background rings ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
          style={{ width: '900px', height: '900px' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
          style={{ width: '1200px', height: '1200px' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.02]"
          style={{ width: '1600px', height: '1600px' }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3FE56C]/[0.04] blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#B0C6FF]/[0.04] blur-[100px] rounded-full" />
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO PRODUCT DISPLAY
      ══════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">

        {/* Intro tag */}
        <div className="ps-intro-tag flex items-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-[#3FE56C]" />
          <span className="text-[11px] uppercase tracking-[0.45em] text-[#3FE56C] font-['Inter']">
            ITSSAFE INTRODUCES
          </span>
          <div className="w-6 h-[1px] bg-[#3FE56C]" />
        </div>

        {/* Product name */}
        <h2
          className="ps-hero-title text-center font-['Space_Grotesk'] font-bold leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          {product.name}
        </h2>
        <p className="ps-hero-sub text-[#86868b] text-lg md:text-xl font-['Inter'] font-light text-center mb-16 max-w-lg">
          {product.tagline}
        </p>

        {/* ── Main product stage ── */}
        <div className="relative w-full max-w-4xl mx-auto">

          {/* Product image — centered, floating */}
          <div
            ref={productImgRef}
            className="relative mx-auto flex items-center justify-center"
            style={{ width: 'clamp(280px, 50vw, 500px)', aspectRatio: '1' }}
          >
            {/* Circular glow halo behind product */}
            <div
              className="absolute inset-0 rounded-full blur-[60px] opacity-20"
              style={{ background: 'radial-gradient(circle, #3FE56C 0%, transparent 70%)' }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 40px rgba(63,229,108,0.15))' }}
            />
          </div>

          {/* ── Config card (bottom right, glassmorphism) ── */}
          <div
            ref={configCardRef}
            className="absolute bottom-0 right-0 md:right-[-2rem] w-[280px] md:w-[320px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(20,20,22,0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between p-4 pb-3">
              <div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-white text-base">{product.name}</h3>
                <p className="text-[#86868b] text-xs mt-0.5">
                  Deposit <span className="text-white font-medium">{product.deposit}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Quantity control */}
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all text-sm"
                >−</button>
                <span className="text-white text-sm w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all text-sm"
                >+</button>
              </div>
            </div>

            {/* Your config section */}
            <div className="border-t border-white/[0.07] px-4 py-3">
              <button
                className="flex items-center justify-between w-full"
                onClick={() => setConfigExpanded(e => !e)}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#3FE56C]/80 font-['Inter']">
                  YOUR CONFIGURATION
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className={`text-white/40 transition-transform duration-300 ${configExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              {configExpanded && (
                <p className="text-[#86868b] text-xs mt-2 leading-relaxed">
                  {product.specs}
                </p>
              )}
            </div>

            {/* Pricing note */}
            <div className="border-t border-white/[0.07] px-4 py-2.5">
              <p className="text-[10px] text-white/30 text-center font-['Inter']">
                Pay when ships: {product.price} · Reserve today: {product.deposit}
              </p>
            </div>

            {/* CTA button */}
            <div className="px-3 pb-3 mt-1">
              <button className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-['Space_Grotesk'] font-bold tracking-wide hover:bg-[#3FE56C] transition-all duration-300 active:scale-95">
                Reserve · {product.deposit}
              </button>
            </div>
          </div>

          {/* ── Other products thumbnail (bottom left) ── */}
          <div className="absolute bottom-0 left-0 md:left-[-2rem]">
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-2 font-['Inter']">OTHER PRODUCTS</p>
            <div className="flex flex-col gap-2">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => handleProductSwitch(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border transition-all duration-300 ${
                    activeProduct === i
                      ? 'border-[#3FE56C]/60 shadow-[0_0_16px_rgba(63,229,108,0.2)]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{ background: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(10px)' }}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-24 right-6 md:right-16 px-3 py-1.5 rounded-full text-[10px] font-['Inter'] font-bold tracking-widest uppercase"
            style={{ background: 'rgba(63,229,108,0.15)', border: '1px solid rgba(63,229,108,0.3)', color: '#3FE56C' }}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 2: FEATURE GRID (iyo.ai style)
      ══════════════════════════════════════════════ */}
      <div className="relative bg-[#0a0f1e] py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* Light mode section indicator */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-6 h-[1px] bg-[#3FE56C]" />
            <span className="text-[11px] uppercase tracking-[0.45em] text-[#3FE56C] font-['Inter']">WHAT MAKES IT DIFFERENT</span>
          </div>
          <h3
            className="font-['Space_Grotesk'] font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Built for the most<br />
            <span className="text-white/25">demanding environments.</span>
          </h3>
        </div>

        {/* Feature cards grid */}
        <div className="ps-features-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className={`ps-feature-card group relative rounded-3xl overflow-hidden cursor-default ${
                feat.size === 'large' ? 'md:row-span-1' : ''
              }`}
              style={{
                background: i % 2 === 0 ? '#111' : '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Gradient bg accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-60 group-hover:opacity-90 transition-opacity duration-500`} />

              <div className="relative p-8 md:p-10 flex flex-col gap-6 min-h-[220px] justify-between">
                {/* Top row: icon + category */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    {feat.icon}
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-['Inter'] pt-1">
                    {feat.category}
                  </span>
                </div>

                {/* Title + body */}
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-xl md:text-2xl mb-3 leading-tight group-hover:text-[#3FE56C] transition-colors duration-400">
                    {feat.title}
                  </h4>
                  <p className="text-white/40 text-sm font-['Inter'] leading-relaxed">
                    {feat.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 3: TECH SPECS (dark, editorial)
      ══════════════════════════════════════════════ */}
      <div className="relative bg-[#080808] py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-6 h-[1px] bg-[#3FE56C]" />
                <span className="text-[11px] uppercase tracking-[0.45em] text-[#3FE56C] font-['Inter']">TECHNICAL SPECIFICATIONS</span>
              </div>
              <h3
                className="font-['Space_Grotesk'] font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Engineered for<br />
                <span className="text-white/25">zero compromise.</span>
              </h3>
            </div>
            <a
              href="#contact"
              className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-['Inter'] uppercase tracking-widest shrink-0"
            >
              Full datasheet
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>

          {/* Specs grid */}
          <div className="ps-specs-row grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]">
            {TECH_SPECS.map((spec, i) => (
              <div
                key={i}
                className="ps-spec-item bg-[#080808] p-8 group hover:bg-[#0e0e0e] transition-colors duration-300"
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-['Inter'] mb-3">{spec.label}</p>
                <p className="font-['Space_Grotesk'] font-semibold text-white text-lg group-hover:text-[#3FE56C] transition-colors duration-300">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="mt-12 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: 'linear-gradient(135deg, rgba(63,229,108,0.08) 0%, rgba(176,198,255,0.06) 100%)',
              border: '1px solid rgba(63,229,108,0.12)',
            }}
          >
            <div>
              <h4 className="font-['Space_Grotesk'] font-bold text-white text-xl md:text-2xl mb-2">
                Ready to protect your workforce?
              </h4>
              <p className="text-[#86868b] text-sm font-['Inter']">
                Join 500+ global industrial facilities already using Sentinel.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="#contact"
                className="group px-7 py-3.5 rounded-full border border-white/15 text-sm uppercase tracking-widest text-white/60 hover:text-white hover:border-white/40 transition-all font-['Inter']"
              >
                Book Demo
              </a>
              <a
                href="#products"
                className="group px-7 py-3.5 rounded-full bg-[#3FE56C] text-black text-sm uppercase tracking-widest font-['Space_Grotesk'] font-bold hover:bg-white transition-all"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
