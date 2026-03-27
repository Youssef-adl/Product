import React from 'react';
import { motion } from 'framer-motion';

export default function BrandMantra() {
  return (
    <section className="relative py-40 lg:py-60 overflow-hidden bg-transparent transition-colors duration-500 border-y border-solar-glass-border">
      {/* Subtle warm grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, var(--solar-accent-sun) 1px, transparent 1px), linear-gradient(var(--solar-accent-sun) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solar-accent-sun/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-solar-accent-sun/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-solar relative z-10 flex flex-col items-center text-center gap-16">
        {/* Label */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-solar-accent-sun" />
          <span className="font-heading text-[10px] uppercase tracking-[0.5em] text-solar-accent-sun/70 font-black">
            Notre Philosophie
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-solar-accent-sun" />
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="font-heading text-[10vw] lg:text-[7vw] text-solar-text-primary leading-[0.85] tracking-tight font-black uppercase"
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
              WebkitTextStroke: '1px var(--solar-accent-sun)',
              color: 'transparent',
            }}
          >
            libérée.
          </span>
        </motion.h2>

        {/* Quote */}
        <motion.p
          className="max-w-4xl font-sans text-lg lg:text-xl text-solar-text-muted font-normal leading-relaxed text-center opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Avec <span className="text-solar-text-primary font-black uppercase tracking-wider">SOLARIS LUX</span>, notre objectif était de réinventer l’expérience e-commerce traditionnelle en créant un univers digital immersif pour le lancement du <span className="text-solar-accent-sun font-black uppercase tracking-wider">SmartCharge V1</span>. 
          <br /><br />
          J'ai conçu cette plateforme comme une véritable vitrine technologique, où le design industriel rencontre la performance du web moderne. En fusionnant <span className="text-solar-text-primary font-bold">React 19</span> avec la 3D interactive, j'ai développé une interface qui ne se contente pas de présenter un produit, mais qui raconte son histoire à chaque interaction.
        </motion.p>

        {/* Vertical line */}
        <motion.div
          className="w-px h-24 bg-gradient-to-b from-solar-accent-sun/40 to-transparent"
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
