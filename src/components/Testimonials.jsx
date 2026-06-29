"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    initials: 'SK',
    name: 'Salma K.',
    role: 'Étudiante — Développement Web',
    location: 'ISTA Témara',
    stars: 5,
    quote: 'Plus besoin de se battre pour une prise murale. Le SmartCharge est posé sur ma table depuis le début du semestre — mes batteries finissent toujours la journée à 80%.',
  },
  {
    initials: 'YA',
    name: 'Youssef A.',
    role: 'Formateur Informatique',
    location: 'ISTA Témara',
    stars: 5,
    quote: "J'ai intégré le SmartCharge dans mon espace de formation. La concentration des stagiaires a clairement augmenté — moins de distractions liées aux batteries mortes.",
  },
  {
    initials: 'MZ',
    name: 'Meryem Z.',
    role: 'Étudiante — Comptabilité',
    location: 'ISTA Temara',
    stars: 5,
    quote: "Le design est élégant et discret. Il s'intègre parfaitement dans l'ambiance du campus. Je l'utilise dès que j'arrive le matin — résultat garanti.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 lg:py-48 bg-transparent overflow-hidden transition-colors duration-500">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-silk-white via-white to-silk-white pointer-events-none" />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sage-green/5 rounded-full blur-[180px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-8 mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Témoignages // Communauté</div>
          <h2 className="section-title text-5xl lg:text-7xl">
            Ils l'utilisent <br />
            <em>chaque jour.</em>
          </h2>
          <motion.div
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-sage-green/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="glass-solar flex flex-col gap-8 p-10 relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(139,148,116,0.06) 0%, transparent 60%)',
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Quote icon with fade-in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.15, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Quote size={32} className="text-sage-green" />
              </motion.div>

              {/* Stars with stagger */}
              <div className="flex gap-1.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + i * 0.1 + j * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Star size={14} className="fill-sage-green text-sage-green" />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-xl text-deep-olive leading-relaxed flex-1 italic font-medium"
              >
                "{r.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 mt-auto border-t border-glass-border">
                {/* Avatar with gradient ring */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-heading text-sm font-black flex-shrink-0 bg-sage-green text-white shadow-lg shadow-sage-green/20 relative z-10">
                    {r.initials}
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--solar-accent-sun), transparent)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style2={{ borderRadius: '50%', opacity: 0.3 }}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="font-heading text-sm font-black text-deep-olive tracking-tight uppercase">
                    {r.name}
                  </div>
                  <div className="font-sans text-[11px] text-slate-gray opacity-70 tracking-wider">
                    {r.role}
                  </div>
                  <div className="font-condensed text-[10px] text-sage-green font-bold uppercase tracking-[0.25em] mt-0.5">
                    {r.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
