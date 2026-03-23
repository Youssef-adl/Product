import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Target, Smartphone, Wind, Maximize } from 'lucide-react';

const features = [
  { icon: Zap,        title: 'Charge Turbo 15W',      desc: 'Puissance maximale sans compromis — vitesse certifiée Qi pour chaque smartphone.' },
  { icon: Shield,     title: 'Dissipation Thermique', desc: 'Système de gestion de chaleur actif pour une sécurité totale en continu.' },
  { icon: Target,     title: 'Alignement Magnétique', desc: 'Positionnement automatique pour une connexion instantanée et fiable.' },
  { icon: Wind,       title: 'Profil Ultra-mince',    desc: 'Seulement 15mm d\'épaisseur — s\'intègre naturellement à tout espace.' },
  { icon: Smartphone, title: 'Protocole Universel',   desc: 'Compatibilité totale iOS & Android. Un seul chargeur pour tous les appareils.' },
  { icon: Maximize,   title: 'Aluminium Usiné CNC',   desc: 'Châssis en alliage d\'aluminium pour une durabilité et une esthétique premium.' },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 lg:py-48 bg-bg-primary overflow-hidden transition-colors duration-500">
      {/* Background solar glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-sun/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="subtitle-silk">L'ADN de la Performance</div>
          <h2 className="title-solar text-5xl lg:text-7xl">
            Six innovations <br />
            <em className="text-gradient-sun">essentielles.</em>
          </h2>
          <p className="max-w-xl text-text-muted font-light text-lg leading-relaxed italic font-sans">
            Chaque détail du SmartCharge V1 a été conçu pour répondre aux besoins réels du campus.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-glass-bg backdrop-blur-3xl border border-glass-border rounded-3xl group cursor-default p-10 shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="solar-icon mb-6">
                <f.icon size={22} />
              </div>
              <h3 className="font-serif text-2xl text-text-primary mb-3 tracking-tight">{f.title}</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed font-light">{f.desc}</p>
              {/* Accent line */}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-coral to-accent-sun transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
