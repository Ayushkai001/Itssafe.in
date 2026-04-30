import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import BrandLogo3D from './BrandLogo3D';

// ─────────────────────────────────────────────────────────
// MOUSE TRACKING
// ─────────────────────────────────────────────────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return mouse;
}

// ─────────────────────────────────────────────────────────
// SHARED SCROLL PROGRESS
// ─────────────────────────────────────────────────────────
const scrollProgress = { value: 0 };

// ─────────────────────────────────────────────────────────
// 3D LOGO
// ─────────────────────────────────────────────────────────
function LogoModel({ modelRef }) {
  const innerRef = useRef();
  const mouse = useMouse();

  const lerpedMX = useRef(0);
  const lerpedMY = useRef(0);

  useFrame(({ clock }) => {
    if (!innerRef.current || !modelRef.current) return;

    const t = clock.getElapsedTime();
    const p = scrollProgress.value || 0;

    // Smooth mouse
    lerpedMX.current += (mouse.current.x * 0.15 - lerpedMX.current) * 0.06;
    lerpedMY.current += (mouse.current.y * 0.12 - lerpedMY.current) * 0.06;

    // Scale
    const scaleVal =
      p < 0.6 ? 0.65 + p * 1.25 : 1.4 - (p - 0.6) * 0.75;

    const s = Math.max(0.3, scaleVal);
    modelRef.current.scale.set(s, s, s);

    // Position X
    let posX = 0;
    if (p < 0.33) posX = 0;
    else if (p < 0.66) posX = ((p - 0.33) / 0.33) * 0.6;
    else posX = 0.6 * (1 - (p - 0.66) / 0.34);

    modelRef.current.position.x = posX + lerpedMX.current * 0.3;

    // Position Y
    modelRef.current.position.y =
      Math.sin(t * 0.5) * 0.12 + p * 0.4 + lerpedMY.current * 0.2;

    // Rotation
    modelRef.current.rotation.y =
      p * Math.PI * 2 + lerpedMX.current * 0.3;

    const tiltX = Math.sin(p * Math.PI) * 0.2;
    modelRef.current.rotation.x =
      tiltX + lerpedMY.current * 0.15;

    modelRef.current.rotation.z =
      Math.sin(p * Math.PI * 2) * 0.06 + lerpedMX.current * 0.05;

    // Inner animation
    innerRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <Float floatIntensity={0.4} speed={1.5} rotationIntensity={0.04}>
        <BrandLogo3D ref={innerRef} position={[0, -0.8, 0]} scale={0.65} />
      </Float>
    </group>
  );
}

// ─────────────────────────────────────────────────────────
// LIGHTS
// ─────────────────────────────────────────────────────────
function DynamicLights({ phase }) {
  const configs = [
    { c1: '#B0C6FF', c2: '#3FE56C' },
    { c1: '#3FE56C', c2: '#00ffcc' },
    { c1: '#ffb347', c2: '#3FE56C' },
    { c1: '#3FE56C', c2: '#ffffff' },
  ];

  const cfg = configs[Math.min(phase, 3)];

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} />
      <pointLight position={[-5, 3, 2]} intensity={2.0} color={cfg.c1} />
      <pointLight position={[5, 3, 2]} intensity={2.0} color={cfg.c2} />
      <pointLight position={[0, -4, 4]} intensity={0.9} color="#00C853" />
    </>
  );
}

// ─────────────────────────────────────────────────────────
// PANELS
// ─────────────────────────────────────────────────────────
const PANELS = [
  { id: 'genesis', side: 'left', num: '01', title: ['THE', 'GENESIS'], body: 'Forged in uncertainty.' },
  { id: 'neural', side: 'right', num: '02', title: ['NEURAL', 'LINK'], body: 'Real-time feedback.' },
  { id: 'titanium', side: 'left', num: '03', title: ['TITANIUM', 'CORE'], body: 'Adaptive AI.' },
  { id: 'cta', side: 'center', num: '04', title: ['EMBRACE', 'THE FUTURE'], body: 'Join the mission.' },
];

// ─────────────────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────────────────
function StoryPanel({ panel }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const els = ref.current.querySelectorAll('.anim-el');

      gsap.set(els, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 70%',
        onEnter: () => gsap.to(els, { opacity: 1, y: 0, stagger: 0.1 }),
        onLeaveBack: () => gsap.to(els, { opacity: 0, y: 30 }),
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center">
      <div className="anim-el text-white text-3xl">
        {panel.title[0]} {panel.title[1]}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────
const Story3D = () => {
  const containerRef = useRef();
  const modelRef = useRef();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          scrollProgress.value = self.progress;

          const p = self.progress;
          let newPhase = 0;

          if (p < 0.25) newPhase = 0;
          else if (p < 0.5) newPhase = 1;
          else if (p < 0.75) newPhase = 2;
          else newPhase = 3;

          setPhase(prev => (prev !== newPhase ? newPhase : prev));
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[400vh] bg-black relative">
      <div className="sticky top-0 h-screen">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0.2, 6.5] }}>
          <DynamicLights phase={phase} />
          <Environment preset="studio" />
          <LogoModel modelRef={modelRef} />
        </Canvas>
      </div>

      <div className="absolute top-0 w-full">
        {PANELS.map(p => <StoryPanel key={p.id} panel={p} />)}
      </div>
    </section>
  );
};

export default Story3D;