"use client";
import Link from 'next/link';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const panels = [
  {
    id: 0,
    tag: 'Produit Phare',
    title: 'SmartCharge V1',
    desc: 'La solution de recharge solaire portable. Une fusion de technologie et de design pour une autonomie optimale.',
    accent: 'var(--color-accent-primary)',
    stat: '249 DH',
    statLabel: 'PRIX ÉTUDIANT',
    modelId: '5ab40a3f728242559672bf3aaaefd85e', 
  },
  {
    id: 1,
    tag: 'Spécification',
    title: 'Bobine Induction',
    desc: 'Le cœur de la charge sans fil. Transfert d\'énergie à haute fréquence compatible avec tous les appareils Qi.',
    accent: 'var(--color-accent-secondary)',
    stat: '15W',
    statLabel: 'PUISSANCE QI',
    modelId: 'f8a25b0fd4104ee9ae4206b4420ecd36', 
  },
  {
    id: 2,
    tag: 'Installation',
    title: 'Kiosque Solaris',
    desc: 'Le point de recharge en libre-service à l\'ISTA Témara. Une solution collective pour les besoins quotidiens.',
    accent: '#5E0000',
    stat: '2 DH/h',
    statLabel: 'TARIF KIOSQUE',
    modelId: '1e5e408ec7394d6ea4f2e519280145c1', 
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const { playSound } = useSoundEffects();
  const current = panels[active];

  return (
    <section id="gallery" className="relative py-48 lg:py-64 bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-px h-full bg-[var(--glass-border)] hidden lg:block" />
      <div className="absolute top-0 right-[10%] w-px h-full bg-[var(--glass-border)] hidden lg:block" />

      <div className="container-solar relative z-10 px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6">
             <div className="h-[1px] w-12 bg-accent-secondary/30" />
             <span className="text-accent-secondary text-[11px] font-black uppercase tracking-[1em] font-heading">GALLERIE 3D</span>
             <div className="h-[1px] w-12 bg-accent-secondary/30" />
          </div>
          <h2 className="text-6xl md:text-[14rem] font-heading font-black text-[var(--text-primary)] leading-[0.75] uppercase tracking-tighter italic">
            Vision <br /> <span className="text-[var(--accent-primary)]">Technique.</span>
          </h2>
          <p className="font-sans text-xl text-[var(--text-muted)] italic max-w-2xl">
            Explorez nos produits sous chaque angle grâce à notre interface d'immersion 3D.
          </p>
        </motion.div>

        {/* Main interactive panel */}
        <div className="grid lg:grid-cols-[1fr_450px] gap-16 items-stretch">
          {/* Left — 3D viewer */}
          <motion.div
            className="relative overflow-hidden rounded-[4rem] border transition-all duration-1000 group/viewer bg-[var(--glass-bg)]"
            style={{ 
              minHeight: '650px', 
              borderColor: `${current.accent}20`,
              boxShadow: `0 0 100px ${current.accent}05`
            }}
            onMouseEnter={() => playSound('hoverMystic')}
          >
            <AnimatePresence mode="wait">
              <motion.iframe
                key={current.modelId}
                title={current.title}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                loading="lazy"
                src={`https://sketchfab.com/models/${current.modelId}/embed?autostart=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0&transparent=1&bg_color=000000`}
                className="absolute inset-0 w-full h-full border-none opacity-80 group-hover/viewer:opacity-100 transition-opacity duration-1000"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              />
            </AnimatePresence>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
            
            {/* Stat badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute bottom-12 left-12 z-10 flex items-center gap-8 bg-black/60 backdrop-blur-2xl px-10 py-6 rounded-2xl border border-white/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-[0.4em] text-accent-secondary uppercase font-heading">{current.statLabel}</span>
                  <span className="text-4xl font-black text-[var(--text-primary)] font-sans tracking-tighter">{current.stat}</span>
                </div>
                <div className="w-px h-10 bg-[var(--glass-border)]" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-[0.4em] text-[var(--text-muted)] uppercase font-heading">RÉFÉRENCE</span>
                  <span className="text-sm font-black text-[var(--text-muted)] font-mono">SOL-{current.id + 100}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <Maximize2 className="absolute top-10 right-10 text-white/20 group-hover/viewer:text-white/60 transition-colors cursor-pointer" size={24} />
          </motion.div>

          {/* Right — panel list */}
          <div className="flex flex-col gap-6 justify-center">
            {panels.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => {
                  playSound('click');
                  setActive(p.id);
                }}
                onMouseEnter={() => playSound('hoverSoft')}
                className={`text-left p-10 rounded-[2.5rem] transition-all duration-[600ms] ease-[var(--ease-out-expo)] cursor-pointer relative overflow-hidden border hover:scale-[1.02] active:scale-[0.98]
                  ${active === p.id
                    ? 'bg-[var(--glass-bg)] border-accent-primary/30 shadow-2xl'
                    : 'bg-transparent border-transparent opacity-30 hover:opacity-60 hover:bg-[var(--glass-bg)]'
                  }`}
              >
                <div className="relative z-10">
                  <div className="font-heading text-[10px] font-black tracking-[0.4em] uppercase mb-4"
                    style={{ color: active === p.id ? p.accent : '#fff' }}
                  >
                    {p.tag}
                  </div>
                  <h3 className="font-heading text-3xl text-[var(--text-primary)] mb-4 uppercase font-black tracking-tighter">
                    {p.title}
                  </h3>
                  <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed italic">
                    {p.desc}
                  </p>
                </div>

                {/* Animated progress line for active card */}
                {active === p.id && (
                  <motion.div
                    layoutId="gallery-line"
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
