"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';

import { ArrowRight, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  const [counter, setCounter] = useState({ h: 23, m: 59, s: 47 });

  useEffect(() => {
    const tick = setInterval(() => {
      setCounter((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section id="cta" className="relative py-40 lg:py-64 overflow-visible bg-transparent will-change-transform">
      {/* High-Performance Static Glow (GPU Optimized) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-primary-alpha)_0%,transparent_70%)] opacity-60" />
      </div>

      <div className="container-solar relative z-10 text-center flex flex-col items-center gap-16">
        <motion.div
          className="flex flex-col gap-8 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-px bg-accent-primary/30" />
            <span className="font-mono text-[10px] font-black tracking-[0.6em] text-accent-primary uppercase">
              STOCK LIMITÉ // DERNIÈRES UNITÉS
            </span>
            <div className="w-12 h-px bg-accent-primary/30" />
          </div>

          <h2 className="font-condensed text-7xl lg:text-[12rem] leading-[0.8] tracking-tighter font-black uppercase text-[var(--text-primary)]">
            REJOIGNEZ<br />
            <span className="font-heading italic font-normal text-[var(--text-muted)]">le mouvement.</span>
          </h2>

          {/* Premium Urgency Timer */}
          <motion.div
            className="mt-8 px-12 py-5 rounded-2xl bg-[var(--glass-bg)] border border-accent-primary/20 backdrop-blur-2xl shadow-xl flex items-center gap-8 relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
             {/* Animated Scanline for the counter */}
             <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-gradient-to-b from-transparent via-accent-primary to-transparent h-1/2 group-hover:animate-scan" />

             <div className="flex flex-col items-center relative z-10">
                <span className="font-mono text-4xl font-black text-[var(--text-primary)] tracking-tighter">{pad(counter.h)}</span>
                <span className="font-mono text-[7px] font-black text-[var(--text-muted)] tracking-[0.4em] uppercase">HRS</span>
             </div>
             <span className="text-accent-primary font-black text-2xl opacity-40 relative z-10">:</span>
             <div className="flex flex-col items-center relative z-10">
                <span className="font-mono text-4xl font-black text-[var(--text-primary)] tracking-tighter">{pad(counter.m)}</span>
                <span className="font-mono text-[7px] font-black text-[var(--text-muted)] tracking-[0.4em] uppercase">MIN</span>
             </div>
             <span className="text-accent-primary font-black text-2xl opacity-40 relative z-10">:</span>
             <div className="flex flex-col items-center relative z-10">
                <span className="font-mono text-4xl font-black text-accent-primary tracking-tighter">{pad(counter.s)}</span>
                <span className="font-mono text-[7px] font-black text-accent-primary/50 tracking-[0.4em] uppercase">SEC</span>
             </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="max-w-3xl text-xl lg:text-3xl text-[var(--text-muted)] leading-relaxed font-sans font-medium italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Le <span className="text-[var(--text-primary)] font-black italic">SmartCharge V1</span> à seulement{' '}
          <span className="text-[var(--text-primary)] font-black">249 DH</span>.{' '}
          <br className="hidden md:block" />
          Offre exclusive valable uniquement pour{' '}
          <span className="text-accent-primary font-black italic tracking-tighter">ISTA TÉMARA</span>.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/boutique"
            className="group relative px-16 py-8 text-[11px] font-black bg-accent-primary text-black hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 rounded-sm uppercase tracking-[0.4em] flex items-center gap-6 active:scale-95 shadow-[0_0_30px_rgba(136,8,8,0.2)]"
          >
            COMMANDER MAINTENANT <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          <Link
            href="/technique"
            className="px-16 py-8 text-[11px] font-black bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-accent-primary hover:text-accent-primary transition-all duration-500 rounded-sm uppercase tracking-[0.4em] active:scale-95 backdrop-blur-md"
          >
            DÉCOUVRIR L'INGÉNIERIE
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
