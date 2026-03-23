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
    <section className="relative py-16 bg-solar-cream border-y border-sand overflow-hidden">
      {/* subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,179,71,0.06), transparent)' }} />

      <div className="container-solar relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass-solar flex flex-col items-center text-center gap-4 p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className="solar-icon">
                <s.icon size={22} />
              </div>
              <div>
                <div className="font-serif text-4xl font-light text-gradient-sun leading-none mb-1">{s.value}</div>
                <div className="font-sans text-sm font-semibold text-slate-700 mb-1">{s.label}</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate-400">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
