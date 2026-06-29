"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CinematicReveal — A scroll-driven immersive section
 * Inspired by motion design: parallax text, counter-scrolling layers,
 * staggered reveals, and dramatic scale transitions.
 */
export default function CinematicReveal() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const textY1 = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const textY2 = useTransform(scrollYProgress, [0.05, 0.35], [60, 0]);
  const textY3 = useTransform(scrollYProgress, [0.1, 0.4], [70, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const lineScaleX = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const counterY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const productScale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);
  const productOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0.2, 0.8], [-5, 5]);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-hidden"
      style={{ height: '200vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-transparent">
        {/* Animated background scale layer */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)]/80 pointer-events-none" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        {/* Floating accent orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-primary/10 blur-[150px] rounded-full"
          style={{ y: counterY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-primary/5 blur-[120px] rounded-full"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
        />

        {/* Content */}
        <div className="relative z-10 container-solar flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left — Typography reveal */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Line 1 */}
            <motion.div style={{ y: textY1, opacity: opacity1 }}>
              <span className="font-mono text-[10px] font-bold tracking-[0.6em] text-accent-primary border border-accent-primary/20 px-3 py-1 rounded-full uppercase mb-6 inline-block">
                TRANSFORMEZ VOTRE QUOTIDIEN
              </span>
            </motion.div>

            {/* Line 2 — Big typography */}
            <motion.div style={{ y: textY2, opacity: opacity2 }}>
              <h2 className="font-condensed text-[12vw] lg:text-[7vw] font-black text-[var(--text-primary)] uppercase leading-[0.85] tracking-tight">
                ÉNERGIE
              </h2>
            </motion.div>

            {/* Line 3 — Serif contrast */}
            <motion.div style={{ y: textY3, opacity: opacity3 }}>
              <h2 className="font-heading italic text-[10vw] lg:text-[6vw] text-[var(--text-muted)] leading-[0.85]">
                sans limites.
              </h2>
            </motion.div>

            {/* Animated line */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-accent-primary via-accent-primary/50 to-transparent mt-8 origin-left"
              style={{ scaleX: lineScaleX }}
            />

            {/* Staggered stats */}
            <div className="flex gap-12 mt-10">
              {[
                { value: '249', unit: 'DH', label: 'Powerbank' },
                { value: '2', unit: 'DH/H', label: 'Kiosque' },
                { value: '15', unit: 'W', label: 'Qi Sans Fil' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col"
                  style={{
                    y: useTransform(scrollYProgress, [0.25 + i * 0.05, 0.5 + i * 0.05], [40, 0]),
                    opacity: useTransform(scrollYProgress, [0.25 + i * 0.05, 0.45 + i * 0.05], [0, 1]),
                  }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-condensed text-4xl lg:text-5xl font-black text-[var(--text-primary)]">{stat.value}</span>
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)] opacity-30">{stat.unit}</span>
                  </div>
                  <span className="font-mono text-[8px] text-accent-primary/80 tracking-[0.3em] uppercase mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Product with tilt */}
          <motion.div
            className="flex-1 relative flex justify-center"
            style={{ scale: productScale, opacity: productOpacity, rotateZ: rotate }}
          >
            {/* Glow ring behind product */}
            <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-accent-primary/[0.08] blur-[100px] rounded-full" />

            <img
              src="/product_studio.png"
              alt="SmartCharge V1"
              className="w-full max-w-lg h-auto object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(136, 8, 8,0.15)]"
            />

            {/* Floating detail tag */}
            <motion.div
              className="absolute bottom-[10%] right-[5%] px-5 py-3 glass-dark rounded-full z-20 border border-[var(--glass-border)]"
              style={{
                y: useTransform(scrollYProgress, [0.3, 0.7], [20, -20]),
              }}
            >
              <span className="font-mono text-[9px] font-bold text-accent-primary tracking-[0.2em]">
                SOLAR · QI2 · 2026
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom subtitle — counter-scroll */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 text-center"
          style={{
            y: useTransform(scrollYProgress, [0.4, 0.8], [30, 0]),
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.5]),
          }}
        >
          <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.5em] uppercase">
            SOLARIS LUX — L'AVENIR SE CHARGE AU SOLEIL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
