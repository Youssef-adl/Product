"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Shield, Target, Smartphone, Wind, Leaf } from 'lucide-react';

const features = [
  { icon: Sun,        title: 'ÉNERGIE SOLAIRE',            desc: 'Recharge gratuite grâce à l\'énergie propre du soleil. Écologique et économique pour l\'étudiant.' },
  { icon: Shield,     title: 'SÉCURITÉ THERMIQUE',         desc: 'Système intelligent de dissipation de chaleur. Aucun risque de surchauffe, produit certifié et sécurisé.' },
  { icon: Target,     title: 'CHARGE SANS FIL QI 15W',     desc: 'Positionnement magnétique de précision pour une connexion instantanée. Technologie Qi2 certifiée.' },
  { icon: Wind,       title: 'FORMAT POCHE',               desc: 'Ultra-compact et léger, conçu pour être emporté partout. Se glisse dans n\'importe quelle poche.' },
  { icon: Smartphone, title: 'COMPATIBILITÉ UNIVERSELLE',  desc: "Compatible avec tout l'écosystème Qi : iPhone, Samsung, Pixel et tous les smartphones modernes." },
  { icon: Leaf,       title: 'ÉCO-RESPONSABLE',            desc: "Energie solaire = propre et gratuite. Un choix responsable pour la planète et pour votre portefeuille." },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="features" className="relative py-40 lg:py-56 bg-transparent overflow-hidden font-sans">
      {/* Structural Accent Glow */}
      <motion.div
        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[var(--accent-primary)]/[0.03] blur-[150px] pointer-events-none rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-solar relative z-10 px-6 md:px-16">
        {/* Cinematic Header */}
        <motion.div
          className="flex flex-col items-start gap-8 mb-32"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-[var(--accent-primary)]/40" />
            <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase italic pt-1">
              ARCHIVES TECHNOLOGIQUES // V1
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none italic">
            Spécifications <br />
            <span className="text-[var(--accent-primary)] opacity-80">Avancées.</span>
          </h2>
          <p className="max-w-2xl text-lg md:text-xl text-white/30 font-medium leading-relaxed italic tracking-tight border-l border-white/10 pl-10 mt-4">
            Une ingénierie de précision fusionnant captation photonique et distribution magnétique. Le standard Obsidian.
          </p>
        </motion.div>

        {/* Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="group flex flex-col gap-10 p-12 rounded-[3.5rem] glass-obsidian border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all duration-700 cursor-default relative overflow-hidden shadow-5xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Feature Icon - Spotify Style */}
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500 border border-white/5 group-hover:border-[var(--accent-primary)]/20">
                <f.icon size={28} strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-2xl text-white tracking-widest font-black uppercase italic">
                  {f.title}
                </h3>
                <p className="font-sans text-base text-white/30 leading-relaxed font-medium italic">
                  {f.desc}
                </p>
              </div>

              {/* Dynamic Scan Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent animate-scan opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
