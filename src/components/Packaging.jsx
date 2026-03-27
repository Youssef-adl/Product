import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle2 } from 'lucide-react';

const inclusions = [
  'SmartCharge V1 — station principale',
  'Câble Solaris Precision (2m)',
  'Adaptateur Mural 45W Plus',
  'Ruban d\'authenticité Solaris Lux',
  'Guide de démarrage rapide',
  'Garantie 2 ans ISTA Témara',
];

export default function Packaging() {
  return (
    <section className="relative py-32 lg:py-48 bg-solar-bg-secondary transition-colors duration-500 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-solar-accent-sun/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container-solar relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="subtitle-silk mb-6 !font-sans !tracking-[0.3em] !text-[10px]">Unboxing // Expérience</div>
              <h2 className="title-solar text-5xl lg:text-6xl mb-6 !font-heading !font-black uppercase">
                Le rituel <br />
                <em className="text-solar-accent-sun italic">de l'ouverture.</em>
              </h2>
              <p className="font-sans text-base text-solar-text-muted font-normal leading-relaxed italic max-w-sm opacity-80">
                Chaque SmartCharge V1 est livré dans un coffret en carton recyclé haute densité, scellé par un ruban d'authenticité. L'expérience commence avant même la première charge.
              </p>
            </div>

            {/* Inclusions list */}
            <div className="flex flex-col gap-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-solar-accent-sun mb-2 font-bold">Contenu de la boîte</div>
              {inclusions.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <CheckCircle2 size={16} className="text-solar-accent-sun flex-shrink-0" />
                  <span className="font-sans text-sm text-solar-text-primary uppercase tracking-wider font-black">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — visual box */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="glass-solar p-16 flex flex-col items-center justify-center gap-8 w-full aspect-square max-w-sm mx-auto rounded-none border-solar-glass-border bg-solar-glass-bg backdrop-blur-3xl shadow-2xl"
            >
              {/* Box icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 rounded-none flex items-center justify-center shadow-2xl transition-colors duration-500 bg-solar-bg-primary/40 border border-solar-glass-border"
              >
                <Package size={52} className="text-solar-accent-sun" />
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <div className="font-heading text-2xl text-solar-text-primary mb-1 uppercase font-black italic">SmartCharge V1</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-solar-accent-sun font-bold">Édition Solaris Lux — 2027</div>
              </div>

              {/* Seal */}
              <div
                className="px-6 py-2 rounded-none font-sans text-[10px] uppercase tracking-[0.25em] font-black text-solar-accent-sun flex items-center gap-2 border-2 border-solar-accent-sun bg-solar-accent-sun/5"
              >
                <span className="text-xs">✦</span> Authenticité Garantie
              </div>
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-black/20 blur-xl rounded-full opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
