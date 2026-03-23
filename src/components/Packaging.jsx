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
    <section className="relative py-32 lg:py-48 bg-bg-primary transition-colors duration-500 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-sun/10 dark:bg-lunar-violet/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

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
              <div className="subtitle-silk mb-6">Unboxing // Expérience</div>
              <h2 className="title-solar text-5xl lg:text-6xl mb-6">
                Le rituel <br />
                <em className="text-gradient-sun">de l'ouverture.</em>
              </h2>
              <p className="font-sans text-base text-text-secondary font-light leading-relaxed italic max-w-sm">
                Chaque SmartCharge V1 est livré dans un coffret en carton recyclé haute densité, scellé par un ruban d'authenticité. L'expérience commence avant même la première charge.
              </p>
            </div>

            {/* Inclusions list */}
            <div className="flex flex-col gap-3">
              <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-text-muted mb-2">Contenu de la boîte</div>
              {inclusions.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <CheckCircle2 size={16} className="text-coral flex-shrink-0" />
                  <span className="font-sans text-sm text-text-primary">{item}</span>
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
              className="glass-solar p-16 flex flex-col items-center justify-center gap-8 w-full aspect-square max-w-sm mx-auto"
              style={{ 
                background: 'var(--color-glass-bg)',
                borderColor: 'var(--color-glass-border)'
              }}
            >
              {/* Box icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-lg transition-colors duration-500"
                style={{ 
                  background: 'var(--color-bg-secondary)', 
                  border: '1px solid var(--color-glass-border)' 
                }}
              >
                <Package size={52} className="text-coral" />
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <div className="font-serif text-2xl text-text-primary mb-1">SmartCharge V1</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-text-muted">Édition Solaris Lux — 2026</div>
              </div>

              {/* Seal */}
              <div
                className="px-6 py-2 rounded-full font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-coral flex items-center gap-2"
                style={{ 
                  background: 'var(--color-bg-secondary)', 
                  border: '2px solid var(--color-coral)' 
                }}
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
