"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BatteryWarning, Flame, PlugZap, CreditCard, AlertTriangle, Frown } from 'lucide-react';

const problems = [
  {
    icon: BatteryWarning,
    title: 'BATTERIE VIDE',
    description: 'Batterie qui se vide en pleine journée de cours. Les étudiants cherchent des prises partout.',
    accent: '#FF4444',
  },
  {
    icon: Flame,
    title: 'RISQUE DE SURCHAUFFE',
    description: 'Les chargeurs bon marché se cassent vite et présentent des risques de surchauffe et de danger.',
    accent: '#FF6B35',
  },
  {
    icon: CreditCard,
    title: 'PRODUITS TROP CHERS',
    description: 'Les bonnes marques coûtent très cher — inaccessibles pour le budget étudiant.',
    accent: '#FF8C00',
  },
  {
    icon: PlugZap,
    title: 'AUCUNE BORNE SUR LE CAMPUS',
    description: 'Pas de borne de recharge sur le campus ISTA. Les étudiants sont constamment à court d\'énergie.',
    accent: '#FFA500',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-transparent text-white noise-overlay">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-red-500/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-8 mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-red-500/30" />
            <span className="font-mono font-bold text-[10px] tracking-[0.5em] text-red-400/80 uppercase">
              LE PROBLÈME ACTUEL
            </span>
            <span className="w-12 h-px bg-red-500/30" />
          </div>
          
          <h2 className="font-condensed text-6xl lg:text-[8rem] font-black text-white uppercase tracking-tight leading-[0.85]">
            POURQUOI<br />
            <span className="font-heading italic font-normal text-white/40">nous existons.</span>
          </h2>

          <p className="max-w-xl text-white/50 font-sans text-lg leading-relaxed font-medium">
            Chaque jour, des centaines d'étudiants à l'ISTA Témara font face aux mêmes frustrations.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="group relative p-10 lg:p-14 rounded-[2rem] glass-dark transition-all duration-500 hover:bg-white/[0.06]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Number */}
              <div className="absolute top-8 right-8 font-mono text-[10px] font-bold text-white/[0.06] tracking-[0.3em]">
                0{i + 1}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500"
                style={{ background: `${problem.accent}15` }}
              >
                <problem.icon size={24} strokeWidth={1.5} style={{ color: problem.accent }} />
              </div>

              <h3 className="font-condensed text-2xl font-bold text-white mb-4 tracking-wider uppercase">
                {problem.title}
              </h3>
              <p className="font-sans text-base text-white/50 leading-relaxed font-medium">
                {problem.description}
              </p>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] rounded-full"
                style={{ background: problem.accent }}
                initial={{ width: 0 }}
                whileInView={{ width: '30%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Transition statement */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-heading italic text-3xl lg:text-5xl text-white/20 leading-tight">
            "Il fallait une solution concrète,<br />
            <span className="text-accent-primary/60">construite par nous, pour nous."</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
