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

// Particules dorées flottantes
const GoldDust = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#FFB347] rounded-full blur-[1px]"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0 
          }}
          animate={{ 
            y: [null, `-=${Math.random() * 100 + 50}`],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
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
    <section ref={containerRef} className="relative min-h-screen bg-[#FFFBF7]" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      <SunGlow />
      <GoldDust />
      
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, #E85D4E 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <motion.div 
        style={{ opacity }} 
        className="relative z-10 container-solar min-h-screen flex items-center pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">
          
          {/* Colonne Gauche - Contenu */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Meta header — animé par GSAP */}
            <div ref={metaRef} className="meta-text mb-8">
              POUR L'ISTA TÉMARA // PAR ADLANI &amp; ZHAR
            </div>

            {/* Titre principal — split-line reveal GSAP */}
            <h1 ref={titleRef} className="hero-title mb-8">
              <span className="split-line-wrap" style={{ display: 'block' }}>SmartCharge</span>
              <span className="split-line-wrap" style={{ display: 'block', color: '#E85D4E', fontStyle: 'italic', fontWeight: 300, marginTop: '0.25rem' }}>
                V1
              </span>
            </h1>

            {/* Description */}
            <motion.p 
              ref={subtitleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-subtitle mb-12"
            >
              La station de recharge sans fil pour le <em className="text-[#E85D4E] not-italic font-medium">campus de demain</em>. 
              L'outil pédagogique central face à la crise d'énergie quotidienne.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link 
                to="/boutique" 
                className="btn-primary group"
              >
                DÉCOUVRIR LE PROJET
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                to="/boutique" 
                className="btn-secondary"
              >
                VOIR LES TARIFS
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 w-full max-w-md lg:max-w-none pt-8 border-t border-[#E85D4E]/10"
            >
              {[
                { label: "Puissance", value: "15W Qi", icon: Sun, color: "#FFB347" },
                { label: "Vitesse", value: "2× Plus", icon: Zap, color: "#E85D4E" },
                { label: "Disponibilité", value: "24/7", icon: Shield, color: "#1E293B" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start gap-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div className="font-serif text-2xl text-[#1A1A1A] tracking-tight">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Colonne Droite - Produit */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 px-10">
            <motion.div 
              style={{ y }}
              className="relative w-full max-w-[380px] aspect-[4/5]"
            >
              {/* Halo doré derrière */}
              <div className="absolute inset-0 bg-gradient-radial from-[#FFB347]/30 via-[#FFB347]/10 to-transparent blur-2xl scale-110 transform translate-y-8" />
              
              {/* Carte Produit Glass */}
              <motion.div 
                style={{ y: floatY }}
                className="glass-card relative z-10"
              >
                {/* Carousel dots */}
                <div className="carousel-dots">
                  <div className="carousel-dot active"></div>
                  <div className="carousel-dot"></div>
                  <div className="carousel-dot"></div>
                </div>

                {/* Badge Énergie Pure */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="badge-float top-right"
                >
                  Énergie Pure
                </motion.div>

                {/* Badge Luxe Durable */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="badge-float mid-left"
                >
                  Luxe Durable
                </motion.div>

                {/* Contenu central */}
                <div className="flex-1 flex flex-col items-center justify-center w-full relative p-4">
                  {/* Image SmartCharge V1 avec effet de survol */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center scale-125 hover:scale-150 transition-transform duration-700">
                    <img 
                      src="/hero-image.png" 
                      alt="SmartCharge V1" 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 bg-[#FFB347]/20 rounded-full blur-3xl" />
                  </div>
                </div>

                {/* Code produit */}
                <div className="product-code">
                  <div className="label">Authenticité</div>
                  <div className="code">SL-2026-PRESTIGE</div>
                </div>

                {/* Shine effect */}
                <div className="shimmer-border" />
              </motion.div>

              {/* Ombre portée douce */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/5 blur-xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — ligne animée descendante (Lando-style) */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9CA3AF] font-medium">
          Initialiser
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#E85D4E] to-transparent relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-[#E85D4E]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
