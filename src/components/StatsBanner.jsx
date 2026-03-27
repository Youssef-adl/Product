import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Star, Clock } from 'lucide-react';

const stats = [
  { icon: Users,  value: '2 000+', label: 'Appareils compatibles',     sub: 'Qi universel' },
  { icon: Zap,    value: '15W',    label: 'Puissance de recharge',      sub: 'Charge rapide certifiée' },
  { icon: Star,   value: '98%',    label: 'Satisfaction utilisateurs',  sub: 'Évaluation campus' },
  { icon: Clock,  value: '24/7',   label: 'Disponibilité garantie',     sub: 'Accès permanent' },
];

export default function StatsBanner() {
  return (
    <section className="relative py-16 bg-solar-bg-secondary border-y border-solar-glass-border overflow-hidden transition-colors duration-500">
      {/* subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,95,21,0.06), transparent)' }} />

      <div className="container-solar relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass-solar flex flex-col items-center text-center gap-4 p-8 rounded-none border-solar-glass-border bg-white shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className="solar-icon">
                <s.icon size={22} />
              </div>
              <div>
                <div className="font-heading text-4xl font-black text-solar-accent-sun leading-none mb-1 uppercase italic">{s.value}</div>
                <div className="font-sans text-sm font-black text-solar-text-primary mb-1 uppercase italic">{s.label}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-solar-text-muted font-bold">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
