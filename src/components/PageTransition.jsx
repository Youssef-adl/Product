"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransition — Cinematic split-reveal entrance
 * Two panels slide apart revealing the site beneath,
 * while SOLARIS logo reveals letter-by-letter.
 */
export default function PageTransition() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Pre-compute random values to avoid hydration mismatch
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      top: `${15 + Math.random() * 70}%`,
      x: Math.random() * 20 - 10,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 1.5,
    }));
  }, []);

  useEffect(() => {
    // Animate progress bar
    const start = performance.now();
    const duration = 2000;
    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    setMounted(true);
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const logoLetters = 'SOLARIS'.split('');
  const luxLetters = 'LUX'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
          style={{ 
            cursor: 'wait',
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-primary-bg)'
          }}
        >
          {/* Top panel slides up */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 z-10"
            style={{ background: 'var(--color-primary-bg)' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1], delay: 0.1 }}
          />
          
          {/* Bottom panel slides down */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 z-10"
            style={{ background: 'var(--color-primary-bg)' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1], delay: 0.1 }}
          />

          {/* Aurora glow behind logo */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full z-20"
            style={{
              background: 'radial-gradient(circle, rgba(139,148,116,0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Logo — letter by letter reveal */}
          <div className="relative z-30 flex flex-col items-center gap-4">
            <div className="flex items-center overflow-hidden">
              {logoLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-5xl md:text-7xl font-black tracking-[0.15em] text-deep-olive"
                  initial={{ y: 60, opacity: 0, rotateX: -80 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center overflow-hidden">
              {luxLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-xl md:text-2xl font-light tracking-[0.6em] text-sage-green"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated accent line */}
            <motion.div
              className="h-[2px] rounded-full mt-4"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--solar-accent-sun), transparent)',
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Progress bar */}
            <motion.div
              className="w-48 h-[1px] bg-deep-olive/10 mt-6 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--solar-accent-sun), var(--solar-accent-hover))',
                  boxShadow: '0 0 8px rgba(139, 148, 116, 0.5)',
                }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="flex items-center gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.span
                className="font-mono text-[10px] tracking-[0.8em] uppercase text-[var(--accent-primary)] font-bold italic"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Initialisation Solaris
              </motion.span>
              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating particles — generated client-side only to avoid hydration mismatch */}
          {mounted && particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-sage-green/20 z-20"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, p.x, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
