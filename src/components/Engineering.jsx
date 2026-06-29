"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Cpu, Activity, ArrowUpRight } from 'lucide-react';

const metrics = [
  { icon: <Zap />, title: 'FLUX PUR', desc: 'Distribution énergétique à haut débit via noyau magnétique Qi2', size: 'large' },
  { icon: <Gauge />, title: 'LATENCE <0.01s', desc: 'Sync instantanée par induction à haute fréquence', size: 'wide' },
  { icon: <Cpu />, title: 'CŒUR PRÉDICTIF', desc: 'Optimisation de charge adaptative via algorithme intelligent', size: 'standard' },
  { icon: <Activity />, title: 'CHÂSSIS AÉRO', desc: 'Structure en aluminium aerospace résistant aux torsions', size: 'standard' },
];

export default function Engineering() {
  return (
    <section id="engineering" className="relative py-32 lg:py-56 overflow-visible bg-transparent font-sans">
      
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[var(--accent-primary)]/5 blur-[200px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="container-solar relative z-10 px-6 md:px-16">
        <div className="flex flex-col items-start gap-12 mb-32 max-w-4xl">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-12 bg-[var(--accent-primary)]/40" />
               <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase italic pt-1">
                  Flux Technologique // Spec-01
               </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-[0.85] italic">
              Performance <br />
              <span className="text-[var(--accent-primary)] opacity-80">Absolue.</span>
            </h2>
          </motion.div>
           
          <motion.p
            className="max-w-2xl text-lg md:text-xl text-white/30 font-medium leading-relaxed italic tracking-tight border-l border-white/10 pl-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'architecture Solaris Lux repose sur une distribution énergétique à flux magnétique. Un écosystème conçu pour la résilience structurelle et l'optimisation cybernétique.
          </motion.p>
        </div>

        {/* Technical Grid — Obsidian Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              className={`flex flex-col justify-between group h-full relative p-12 rounded-[3.5rem] glass-obsidian border border-white/5 shadow-5xl transition-all duration-700 hover:border-[var(--accent-primary)]/30
                ${item.size === 'large' ? 'md:col-span-8 md:row-span-2 min-h-[450px]' : 
                  item.size === 'wide' ? 'md:col-span-8 min-h-[280px]' : 
                  'md:col-span-4 min-h-[280px]'}
              `}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[var(--accent-primary)] transition-all duration-500 border border-white/5 group-hover:border-[var(--accent-primary)]/20">
                  {React.cloneElement(item.icon, { size: 28, strokeWidth: 1.5 })}
                </div>
                <ArrowUpRight size={20} className="text-white/10 group-hover:text-[var(--accent-primary)] transition-colors" />
              </div>

              <div className="mt-12 relative z-10">
                <h4 className="font-heading text-4xl font-black uppercase tracking-tighter text-white italic mb-4">
                  {item.title}
                </h4>
                <p className="font-sans text-lg text-white/30 font-medium leading-relaxed italic">
                  {item.desc}
                </p>
              </div>

              {/* Technical Marker */}
              <div className="absolute top-12 right-12 font-mono text-[9px] font-black text-white/5 group-hover:text-[var(--accent-primary)]/20 tracking-[0.2em] transition-colors italic">
                REF_{String(i + 1).padStart(3, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
