import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Shield, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import gsap from 'gsap';

// Effet de glow solaire qui suit la souris
const SunGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 179, 71, 0.12), transparent 50%)`
      }}
    />
  );
};

// Grille technique industrielle
const TechnicalGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, var(--solar-glass-border) 1px, transparent 1px), linear-gradient(to bottom, var(--solar-glass-border) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, var(--solar-glass-border) 1px, transparent 1px), linear-gradient(to bottom, var(--solar-glass-border) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: 0.3
        }} 
      />
      {/* Marqueurs de coordonnées */}
      <div className="absolute top-10 left-10 text-[8px] font-mono text-text-muted uppercase tracking-widest">Ref. SL-2026 / 40.7128° N, 74.0060° W</div>
      <div className="absolute bottom-10 right-10 text-[8px] font-mono text-text-muted uppercase tracking-widest">Hardware Dev Kit v1.0.4</div>
    </div>
  );
};

// Particules dorées flottantes (plus ordonnées)
const GoldDust = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-12 bg-gradient-to-b from-coral/0 via-coral/40 to-coral/0"
          initial={{ 
            x: `${15 + i * 15}%`, 
            y: `-20%`,
            opacity: 0 
          }}
          animate={{ 
            y: ['0%', '120%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation de flottement douce pour la carte
  const floatY = useSpring(0, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    let frame;
    const animate = () => {
      const time = Date.now() / 1500;
      floatY.set(Math.sin(time) * 10);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [floatY]);

  // GSAP split-line reveal — inspiré de l'animation de texte Lando Norris
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Meta text
      if (metaRef.current) {
        gsap.from(metaRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.1,
        });
      }

      // Chaque ligne du titre principal (cibler les spans)
      const lines = titleRef.current?.querySelectorAll('.split-line-wrap');
      if (lines && lines.length > 0) {
        gsap.from(lines, {
          y: 60,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.2,
        });
      }

      // Sous-titre
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.7,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-bg-primary transition-colors duration-500">
      <SunGlow />
      <TechnicalGrid />
      <GoldDust />
      
      <motion.div 
        style={{ opacity }} 
        className="relative z-10 container-solar min-h-screen flex items-center pt-32 pb-32"
      >
        <div className="relative w-full flex flex-col lg:block">
          
          {/* BACKGROUND TEXT (Asymmetric Anchor) */}
          <div className="hidden lg:block absolute -top-12 -left-12 pointer-events-none select-none">
             <span className="font-serif text-[12rem] text-text-primary/5 italic opacity-20 -rotate-12 block">Solaris</span>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:max-w-3xl relative z-20">
            <div ref={metaRef} className="flex items-center gap-4 mb-10">
               <div className="w-12 h-[1px] bg-coral"></div>
               <span className="meta-text text-coral">Industrial Design / Edition 2026</span>
            </div>

            <h1 ref={titleRef} className="hero-title !text-[clamp(4rem,10vw,8rem)] !leading-[0.85] mb-10 mix-blend-multiply">
              <span className="split-line-wrap" style={{ display: 'block' }}>SmartCharge</span>
              <div className="flex items-baseline gap-4">
                 <span className="split-line-wrap text-coral italic font-light">V1</span>
                 <span className="text-[10px] uppercase tracking-[0.5em] font-black text-text-muted">Pro Edition</span>
              </div>
            </h1>

            <motion.p 
              ref={subtitleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hero-subtitle !max-w-md text-lg text-text-secondary mb-12 border-l-2 border-glass-border pl-8"
            >
              L'excellence de la recharge par induction pour les environnements de haute technologie. 
              <span className="block mt-4 italic text-sm text-text-muted">Conçu à Témara. Propulsé par le soleil.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6"
            >
               <Link to="/boutique" className="btn-primary">
                  Commander Maintenant
               </Link>
               <Link to="/boutique" className="text-xs font-black tracking-[0.3em] uppercase hover:text-coral transition-colors flex items-center gap-2">
                  Spécifications <ArrowRight size={14} />
               </Link>
            </motion.div>
          </div>

          {/* ASYMMETRIC PRODUCT AREA */}
          <div className="lg:absolute lg:top-[-40px] lg:right-[-50px] w-full lg:w-[600px] pointer-events-none mt-20 lg:mt-0">
             <motion.div 
               style={{ y: floatY }}
               className="relative flex items-center justify-center p-12"
             >
                {/* Image principale avec effet de profondeur */}
                <div className="relative group pointer-events-auto">
                   <div className="absolute inset-0 bg-coral/5 rounded-full blur-[100px] animate-pulse" />
                   <img 
                     src="/product-v1.png" 
                     alt="SmartCharge V1" 
                     className="relative z-10 w-[400px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] scale-[1.1] transition-transform duration-1000"
                   />
                </div>

                {/* Technical Micro-Card Overlap */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-[20%] left-0 z-30 pointer-events-auto"
                >
                   <div className="glass-solar !p-6 !rounded-sm border-l-4 border-l-coral shadow-2xl backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-2 h-2 bg-coral rounded-full animate-ping" />
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-primary">Status: En Stock</span>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between gap-12 items-center">
                            <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Technologie</span>
                            <span className="text-[10px] font-mono text-text-primary">MagSafe Qi Gen 3</span>
                         </div>
                         <div className="flex justify-between gap-12 items-center">
                            <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Puissance</span>
                            <span className="text-[10px] font-mono text-text-primary">15W Adaptive</span>
                         </div>
                      </div>
                   </div>
                </motion.div>

                {/* Floating Badges */}
                <div className="absolute top-[10%] right-[10%] pointer-events-auto">
                   <span className="badge-float !bg-text-primary !text-white !border-none !text-[10px] !px-6">Luxe Durable</span>
                </div>
             </motion.div>
          </div>

          {/* BOTTOM STATS BAR (Non-Absolute to prevent overlap) */}
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-full lg:max-w-xl flex gap-12 pt-10 border-t border-glass-border mt-20"
            >
              {[
                { label: "Performance", value: "15W", icon: Sun },
                { label: "Sourcing", value: "Bio-Tech", icon: Shield },
                { label: "Inertie", value: "Nulle", icon: Zap }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-coral font-black">{stat.label}</div>
                  <div className="font-serif text-3xl text-text-primary tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </motion.div>
        </div>
      </motion.div>

      {/* Industrial Axis Indicator */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30">
         <div className="w-[1px] h-32 bg-coral" />
         <span className="text-[8px] font-mono [writing-mode:vertical-lr] text-text-muted uppercase tracking-widest">Axis Vector 2026.04</span>
         <div className="w-[1px] h-32 bg-coral" />
      </div>

    </section>
  );
}
