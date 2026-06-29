"use client";
import Link from 'next/link';
import React, { useState, useEffect, lazy } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PresentationControls, ContactShadows, Float, Html, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

// ── Data ──
const specsData = [
  { label: 'CAPACITÉ', value: '10,000 MAH' },
  { label: 'CHARGE QI', value: '15W PD' },
  { label: 'CELLULE', value: 'SILICON' }
];

const socialLinks = [
  { icon: 'twitter', path: '#' },
  { icon: 'instagram', path: '#' }
];

// ── 3D Model ──
function ProductModel(props) {
  const { scene } = useGLTF('/product_model.glb');

  React.useLayoutEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale to occupy ~25-30% of screen width on desktop
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const s = 4.2 / maxDim; // Further reduced for optimal spacing
      scene.scale.setScalar(s);
    }

    // Shift slightly downward and back
    scene.position.y += 0.05;
    scene.position.z -= 0.5;
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Preload model
useGLTF.preload('/product_model.glb');

// ── Loader Fallback ──
const ModelLoader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-accent-primary/20 border-t-accent-secondary rounded-full animate-spin" />
      <span className="text-[10px] font-black tracking-[0.4em] text-accent-secondary uppercase font-heading animate-pulse">
        Chargement...
      </span>
    </div>
  </Html>
);

// ── Fallback Image (if WebGL fails) ──
const ModelFallback = () => (
  <div className="w-full h-full flex items-center justify-center pt-[10vh]">
    <img
      src="/product_model_fallback.png"
      alt="Solaris Lux"
      className="w-[80%] max-w-[500px] object-contain opacity-90 drop-shadow-[0_0_80px_rgba(136,8,8,0.5)]"
      loading="lazy"
    />
  </div>
);

// ── Floating Embers (reduced count for perf) ──
const FloatingParticle = ({ i }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 16,
      dx: (Math.random() - 0.5) * 60,
    });
  }, []);

  if (!config) return null;

  return (
    <motion.div
      className="absolute w-[2px] h-[2px] rounded-full"
      initial={{ left: `${config.x}%`, top: `${config.y}%`, opacity: 0 }}
      animate={{
        y: [0, -150, -300],
        x: [0, config.dx],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        delay: config.delay,
        ease: "easeOut"
      }}
      style={{
        background: i % 3 === 0 ? 'var(--color-accent-secondary)' : 'var(--color-accent-primary)',
        boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgba(184,134,11,0.6)' : 'rgba(136,8,8,0.6)'}`,
      }}
    />
  );
};

// ── Main Hero Component ──
export default function Hero() {
  const { playSound } = useSoundEffects();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * -15);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * -15);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none bg-[var(--bg-primary)] transition-colors duration-700"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 45%, var(--accent-primary-alpha), var(--bg-primary) 70%), url("/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ background: 'repeating-linear-gradient(transparent 0, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />

      {/* Dramatic halo behind model (centered) */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] pointer-events-none z-0"
           style={{
             background: 'radial-gradient(circle, var(--accent-secondary-alpha) 0%, var(--accent-primary-alpha-thin) 40%, transparent 70%)',
           }} />

      {/* Noise and particles - Reduced count for perf */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02] noise-overlay" />
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {[...Array(6)].map((_, i) => <FloatingParticle key={i} i={i} />)}
      </div>

      {/* ── 3D MODEL CONTAINER (Main Focal Point, Centered) ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full h-[55vh] lg:h-[70vh] max-w-[1200px] flex items-center justify-center lg:mt-[2vh] pointer-events-auto"
          onMouseEnter={() => playSound('hover')}
        >
          {/* Secondary glow reactive to mouse - Optimized without expensive CSS blur */}
          <motion.div
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, var(--accent-secondary-alpha) 0%, transparent 60%)',
              x: springX,
              y: springY
            }}
          />

          {/* 3D Canvas */}
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing z-10">
            {webGLSupported ? (
              <Canvas
                dpr={[1, 1.2]} // Cap dpr lower for smoother performance
                camera={{ position: [0, 0.5, 5], fov: 40 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                onCreated={({ gl, scene }) => {
                  gl.setClearColor(0x000000, 0);
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
                style={{ background: 'transparent' }}
                className="w-full h-full"
              >
                {/* Lighting — Optimized (reduced light count) */}
                <ambientLight intensity={0.6} />
                {/* Key light */}
                <directionalLight position={[4, 8, 4]} intensity={1.5} color="#ffffff" />
                {/* Rim / accent — warm gold from behind */}
                <pointLight position={[0, 4, -4]} intensity={1.5} color="#B8860B" />
                {/* Under-glow — dramatic red */}
                <pointLight position={[0, -2, 0]} intensity={0.8} color="#880808" />

                <Suspense fallback={<ModelLoader />}>
                  <PresentationControls
                    speed={1.5}
                    global
                    zoom={0.9}
                    polar={[-Math.PI / 8, Math.PI / 6]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    config={{ mass: 2, tension: 400 }}
                  >
                    {/* Subtle float animation (slow Y + slight rotation) */}
                    <Float
                      speed={1.5}
                      rotationIntensity={0.2}
                      floatIntensity={0.5}
                      floatingRange={[-0.05, 0.05]}
                    >
                      <ProductModel rotation={[0, Math.PI / 6, 0]} />
                    </Float>
                  </PresentationControls>
                </Suspense>

                {/* Ground reflection / soft shadow */}
                <ContactShadows
                  position={[0, -1.8, 0]}
                  opacity={0.7}
                  scale={10}
                  blur={2.5}
                  far={4}
                  color="#000000"
                  resolution={256}
                  frames={1}
                />
              </Canvas>
            ) : (
              <ModelFallback />
            )}
            
            {/* Vignette — Keeps background dark around model edges in dark mode, soft in light mode */}
            <div className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg-primary-alpha-heavy) 100%)'
              }}
            />
          </div>
          
          {/* Interactive label - Moved higher to avoid overlap */}
          <div className="flex items-center justify-center gap-3 pointer-events-none absolute bottom-24 left-0 right-0 z-20 opacity-30">
            <div className="h-[1px] w-6 bg-white/20" />
            <span className="text-[8px] text-white uppercase tracking-[0.4em] font-mono">Drag to rotate</span>
            <div className="h-[1px] w-6 bg-white/20" />
          </div>
        </motion.div>
      </div>

      {/* ── TEXT CONTENT (Aligned to Left & Right to balance composition) ── */}
      <div className="relative z-20 w-full max-w-[1900px] mx-auto px-12 lg:px-32 flex flex-col lg:flex-row items-center justify-between h-full pointer-events-none pt-[5vh] lg:pt-0">
        
        {/* Left column: Title and CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto"
        >
          {/* Tag line */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-accent-secondary/30" />
            <span className="text-accent-secondary text-[10px] font-black uppercase tracking-[0.6em] font-heading">
              ISTA Innovation
            </span>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="relative mb-10">
            <motion.h1
              className="text-[14vw] sm:text-[10vw] lg:text-[6.5rem] xl:text-[7.5rem] font-display font-bold text-[var(--text-primary)] leading-[0.85] tracking-[-0.02em] uppercase"
            >
              SOLARIS
            </motion.h1>
            <motion.h2
              className="text-[12vw] sm:text-[8vw] lg:text-[4rem] xl:text-[5rem] font-display font-bold text-accent-primary leading-[0.9] tracking-[-0.02em] uppercase italic mt-[-1vw]"
              style={{
                textShadow: '0 0 40px rgba(136, 8, 8, 0.3)'
              }}
            >
              LUX.
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--text-muted)] text-sm lg:text-base max-w-[320px] mb-12 font-serif italic leading-relaxed"
          >
            La première powerbank solaire conçue pour l'ISTA Témara.<br />
            Une autonomie infinie forgée pour l'excellence.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/boutique"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('action')}
              className="group relative px-12 py-4 bg-transparent border border-[var(--glass-border)] hover:border-accent-secondary transition-all duration-700 overflow-hidden inline-block"
            >
              <div className="absolute inset-0 bg-accent-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
              <span className="font-black text-[11px] text-[var(--text-primary)] tracking-[0.5em] uppercase font-heading group-hover:text-black transition-colors relative z-10">
                RÉSERVER MON ÉDITION
              </span>
            </Link>

            {/* Technical Labels (as seen in screenshot) */}
            <div className="mt-6 flex flex-col gap-1 opacity-25">
              <span className="text-[7px] font-black tracking-[0.4em] text-[var(--text-primary)] uppercase font-mono">AUDIO ATMOS.</span>
              <span className="text-[9px] italic font-serif text-[var(--text-subtle)] uppercase tracking-[0.2em]">SILENCIEUX</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: Specs and Price */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[25%] flex flex-col items-center lg:items-end gap-12 lg:gap-16 mt-16 lg:mt-0 pointer-events-auto"
        >
          <div className="flex flex-col items-center lg:items-end gap-12">
            {specsData.map((spec, i) => (
              <motion.div variants={itemVariants} key={i} className="flex flex-col items-center lg:items-end gap-2 group text-center lg:text-right">
                <span className="text-accent-secondary text-[9px] font-black tracking-[0.4em] uppercase font-heading opacity-40 group-hover:opacity-100 transition-opacity">
                  {spec.label}
                </span>
                <span className="text-[var(--text-primary)] text-xl lg:text-3xl font-bold tracking-tight uppercase font-sans group-hover:text-accent-secondary transition-colors">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Price */}
          <motion.div variants={itemVariants} className="flex items-baseline gap-2 lg:mt-8">
            <span className="text-5xl lg:text-7xl text-[var(--text-primary)] font-bold font-sans tracking-tight">249</span>
            <span className="text-sm lg:text-lg text-[var(--text-muted)] font-bold tracking-widest uppercase">DH</span>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Social Sidebar ── */}
      <motion.div 
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-10 z-30"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Link href="#" className="text-[var(--text-muted)] hover:text-accent-secondary transition-all hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>
        <Link href="#" className="text-[var(--text-muted)] hover:text-accent-secondary transition-all hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.353.061-2.277.276-3.086.591-.837.324-1.546.759-2.251 1.464s-1.14 1.413-1.464 2.251c-.315.809-.53 1.733-.591 3.086-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.061 1.353.276 2.277.591 3.086.324.837.759 1.546 1.464 2.251s1.413 1.14 2.251 1.464c.809.315 1.733.53 3.086.591 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.353-.061 2.277-.276 3.086-.591.837-.324 1.546-.759 2.251-1.464s1.14-1.413 1.464-2.251c.315-.809.53-1.733.591-3.086.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.061-1.353-.276-2.277-.591-3.086-.324-.837-.759-1.546-1.464-2.251s-1.413-1.14-2.251-1.464c-.809-.315-1.733-.53-3.086-.591-1.28-.058-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 pointer-events-auto group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.5 }}
        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-black tracking-[0.8em] uppercase font-heading text-[var(--text-primary)] group-hover:text-accent-secondary transition-colors">Découvrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-accent-secondary"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
