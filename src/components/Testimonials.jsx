import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    initials: 'SK',
    name: 'Salma K.',
    role: 'Étudiante en Développement Web',
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
    quote: 'J\'ai intégré le SmartCharge dans mon espace de formation. La concentration des stagiaires a clairement augmenté — moins de distractions liées aux batteries mortes.',
  },
  {
    initials: 'MZ',
    name: 'Meryem Z.',
    role: 'Étudiante en Comptabilité',
    location: 'ISTA Temara',
    stars: 5,
    quote: 'Le design est élégant et discret. Il s\'intègre parfaitement dans l\'ambiance du campus. Je l\'utilise dès que j\'arrive le matin — résultat garanti.',
  },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#FFB347] text-[#FFB347]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-32 lg:py-48 bg-bg-primary overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-sun/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="subtitle-silk">Témoignages // Communauté</div>
          <h2 className="title-solar text-5xl lg:text-7xl">
            Ils l'utilisent <br />
            <em className="text-gradient-sun">chaque jour.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="glass-solar flex flex-col gap-6 p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {/* Stars */}
              <StarRow count={r.stars} />

              {/* Quote */}
              <p className="font-serif text-xl text-text-secondary leading-relaxed flex-1 italic">
                "{r.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-8 mt-auto border-t border-glass-border/40">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-sans text-sm font-bold flex-shrink-0 
                             bg-[#FFF5EB] text-coral 
                             [data-theme='eclipse']:bg-coral [data-theme='eclipse']:text-white 
                             [data-theme='eclipse']:shadow-[0_0_15px_rgba(232,93,78,0.3)]
                             transition-all duration-300"
                >
                  {r.initials}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="font-sans text-[15px] font-semibold text-text-primary tracking-tight">{r.name}</div>
                  <div className="font-sans text-[11px] text-text-secondary opacity-70 uppercase tracking-wider font-medium">{r.role}</div>
                  <div className="font-sans text-[10px] text-coral font-bold uppercase tracking-[0.15em] mt-0.5">{r.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
