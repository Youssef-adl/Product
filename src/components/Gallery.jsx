import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const panels = [
  {
    id: 0,
    tag: 'Vue Principale',
    title: 'Silhouette',
    desc: 'Le chassis aluminium usiné — chaque millimètre calculé pour l\'élégance fonctionnelle.',
    gradient: 'from-[#FFF5EB] via-[#FFE4D1] to-[#FDF6F0]',
    accent: '#E85D4E',
    icon: '◎',
    stat: '15mm',
    statLabel: 'Épaisseur',
  },
  {
    id: 1,
    tag: 'Détail Technique',
    title: 'Bobine Qi',
    desc: 'La bobine de transfert haute fréquence — invisible, inaudible, parfaitement efficace.',
    gradient: 'from-[#FDF6F0] via-[#FFF9F5] to-[#FFFBF7]',
    accent: '#FFB347',
    icon: '⊕',
    stat: '15W',
    statLabel: 'Puissance',
  },
  {
    id: 2,
    tag: 'Finition Surface',
    title: 'Brossé Mat',
    desc: 'Finition sablée micro-billes — résistante aux empreintes, douce au toucher, durable.',
    gradient: 'from-[#FFFBF7] via-[#FFF5EB] to-[#FDF6F0]',
    accent: '#D14D3F',
    icon: '◈',
    stat: '2 ans',
    statLabel: 'Garantie',
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const current = panels[active];

  return (
    <section id="gallery" className="relative py-32 lg:py-48 bg-solar-warm overflow-hidden">
      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="subtitle-silk">Galerie // Esthétique du détail</div>
          <h2 className="title-solar text-5xl lg:text-7xl">
            L'art de <br />
            <em className="text-gradient-sun">la précision.</em>
          </h2>
        </motion.div>

        {/* Main interactive panel */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-stretch">

          {/* Left — Sketchfab 3D viewer */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ minHeight: '500px', background: 'linear-gradient(135deg, #FFF5EB 0%, #FFE4D1 100%)' }}
          >
            {/* Sketchfab iframe — remplissage total */}
            <iframe
              title="Wireless fast charging station — SmartCharge V1"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/5ab40a3f728242559672bf3aaaefd85e/embed?autostart=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_watermark=0&ui_watermark_link=0&transparent=0&bg_color=fff5eb&camera=0"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '24px',
              }}
            />

            {/* Corner tag (changes with active panel) */}
            <div
              className="absolute top-6 left-6 px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-[0.25em] font-semibold z-10 pointer-events-none"
              style={{ background: `${current.accent}18`, color: current.accent, border: `1px solid ${current.accent}28`, backdropFilter: 'blur(8px)' }}
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
                  style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.9)' }}
                >
                  <span className="font-serif text-3xl font-light" style={{ color: current.accent }}>{current.stat}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-slate-400 ml-2">{current.statLabel}</span>
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
                className={`text-left glass-solar p-7 transition-all duration-500 cursor-pointer ${active === p.id ? 'border-[#E85D4E]/30 shadow-xl' : 'opacity-70 hover:opacity-100'}`}
                whileHover={{ y: -2 }}
              >
                <div
                  className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold mb-2"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </div>
                <h3 className="font-serif text-2xl text-slate-800 mb-2 tracking-tight">{p.title}</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed font-light">{p.desc}</p>

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
