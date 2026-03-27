import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const panels = [
  {
    id: 0,
    tag: 'Vue Principale',
    title: 'Silhouette',
    desc: 'Le chassis aluminium usiné — chaque millimètre calculé pour l\'élégance fonctionnelle.',
    gradient: 'from-[#FBFBFB] via-[#F5F5F7] to-[#FFFFFF]',
    accent: '#007AFF',
    icon: '◎',
    stat: '15mm',
    statLabel: 'Tech Profil',
  },
  {
    id: 1,
    tag: 'Détail Technique',
    title: 'Bobine Qi',
    desc: 'La bobine de transfert haute fréquence — invisible, inaudible, parfaitement efficace.',
    gradient: 'from-[#F5F5F7] via-[#FFFFFF] to-[#FBFBFB]',
    accent: '#00F0FF',
    icon: '⊕',
    stat: '15W',
    statLabel: 'Flux Qi',
  },
  {
    id: 2,
    tag: 'Finition Surface',
    title: 'Brossé Mat',
    desc: 'Finition sablée micro-billes — résistante aux empreintes, douce au toucher, durable.',
    gradient: 'from-[#FFFFFF] via-[#F5F5F7] to-[#FBFBFB]',
    accent: '#5E5CE6',
    icon: '◈',
    stat: '2028',
    statLabel: 'Série Tech',
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const current = panels[active];

  return (
    <section id="gallery" className="relative py-32 lg:py-48 bg-transparent overflow-hidden transition-colors duration-500">
      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="subtitle-silk !font-sans !tracking-[0.3em] !text-[10px]">Galerie // Esthétique du détail</div>
          <h2 className="title-solar text-5xl lg:text-7xl !font-heading !font-black">
            L'art de <br />
            <em className="text-solar-accent-sun italic">la précision.</em>
          </h2>
        </motion.div>

        {/* Main interactive panel */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-stretch">

          {/* Left — Sketchfab 3D viewer */}
          <div
            className="relative overflow-hidden rounded-3xl border border-solar-glass-border shadow-inner"
            style={{ minHeight: '500px', background: 'var(--solar-bg-secondary)' }}
          >
            {/* Sketchfab iframe — remplissage total */}
            <iframe
              title="Wireless fast charging station — SmartCharge V1"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/5ab40a3f728242559672bf3aaaefd85e/embed?autostart=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_watermark=0&ui_watermark_link=0&transparent=1&bg_color=F8F9FA&camera=0"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0',
              }}
            />

            {/* Corner tag (changes with active panel) */}
            <div
              className="absolute top-6 left-6 px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-[0.25em] font-black z-10 pointer-events-none"
              style={{ background: `var(--color-bg-primary)`, color: `var(--solar-accent-sun)`, border: `1px solid var(--solar-glass-border)`, backdropFilter: 'blur(8px)' }}
            >
              {current.tag}
            </div>

            {/* Stat badge — bottom center */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="px-5 py-2 rounded-full backdrop-blur-md"
                  style={{ background: 'var(--solar-glass-bg)', border: '1px solid var(--solar-glass-border)' }}
                >
                  <span className="font-heading text-3xl font-black text-solar-accent-sun">{current.stat}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-solar-text-muted ml-2">{current.statLabel}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — panel list */}
          <div className="flex flex-col gap-4">
            {panels.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`text-left glass-solar p-7 rounded-2xl transition-all duration-500 cursor-pointer ${active === p.id ? 'border-solar-accent-sun bg-solar-bg-primary shadow-xl scale-[1.02]' : 'opacity-70 hover:opacity-100 hover:bg-white'}`}
                whileHover={{ y: -2 }}
              >
                <div
                  className="font-sans text-[10px] uppercase tracking-[0.3em] font-black mb-2"
                  style={{ color: `var(--solar-accent-sun)` }}
                >
                  {p.tag}
                </div>
                <h3 className="font-heading text-2xl text-solar-text-primary mb-2 tracking-tight uppercase font-black">{p.title}</h3>
                <p className="font-sans text-sm text-solar-text-secondary leading-relaxed font-normal opacity-80">{p.desc}</p>

                {/* Active indicator */}
                {active === p.id && (
                  <motion.div
                    layoutId="gallery-indicator"
                    className="mt-4 h-px"
                    style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }}
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
