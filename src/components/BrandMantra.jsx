import React from 'react';
import { motion } from 'framer-motion';

export default function BrandMantra() {
  return (
    <section className="relative py-40 lg:py-60 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #0F172A 100%)' }}>
      {/* Subtle warm grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(255,179,71,1) 1px, transparent 1px), linear-gradient(rgba(255,179,71,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#E85D4E]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-solar relative z-10 flex flex-col items-center text-center gap-16">
        {/* Label */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFB347]" />
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#FFB347]/70 font-semibold">
            Notre Philosophie
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFB347]" />
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="font-serif text-[10vw] lg:text-[7vw] text-white leading-[0.85] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          L'énergie
          <br />
          <span
            className="font-light italic"
            style={{
              WebkitTextStroke: '1px rgba(255,179,71,0.6)',
              color: 'transparent',
            }}
          >
            libérée.
          </span>
        </motion.h2>

        {/* Quote */}
        <motion.p
          className="max-w-3xl font-sans text-lg lg:text-xl text-white/40 font-light leading-relaxed italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          "La perfection n'est pas une destination. C'est le seul standard que nous acceptons.
          Conçu pour le campus de demain — pour que l'énergie ne soit plus jamais un obstacle."
        </motion.p>

        {/* Vertical line */}
        <motion.div
          className="w-px h-24 bg-gradient-to-b from-[#FFB347]/40 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  );
}
