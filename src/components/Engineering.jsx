import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Battery, Clock, Smartphone, AlertTriangle } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const cards = [
  { icon: <Zap />, title: 'PUISSANCE 15W', desc: 'Technologie Qi universelle (iOS & Android)', size: 'large' },
  { icon: <Clock />, title: 'VITESSE 2X', desc: 'Charge optimisée, 0% attente', size: 'wide' },
  { icon: <Shield />, title: 'SÉCURITÉ ÉLECTRIQUE', desc: 'Protections thermiques intégrées', size: 'standard' },
  { icon: <AlertTriangle />, title: 'RÉSOLUTION', desc: 'Fini les téléphones au sol', size: 'standard' },
];

export default function Engineering() {
  return (
    <section id="engineering" className="relative py-32 lg:py-48 overflow-hidden bg-solar-cream">
      
      {/* Éclat solaire fixe */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-sun/5 blur-[150px] pointer-events-none" />
      
      <div className="container-solar relative z-10">
        <div className="flex flex-col items-center text-center gap-10 mb-24">
          <motion.div
            className="flex flex-col gap-6 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="subtitle-silk">Le Diagnostic des Points de Friction</div>
            <h2 className="title-solar text-5xl lg:text-7xl leading-tight">
              Une crise d'énergie <br />
              <em className="text-gradient-sun">quotidienne.</em>
            </h2>
          </motion.div>
           
          <motion.p
            className="max-w-2xl text-lg text-slate-500 font-light leading-relaxed font-sans italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            Plus de 50 appareils par salle, des prises murales saturées, un risque de vol élevé, et une concentration réduite de 30% liée à la recherche d'énergie constante. Le smartphone est l'outil pédagogique central, mais l'infrastructure ne suit plus.
          </motion.p>
        </div>

        {/* Bento grid — chaque carte révélée au scroll avec stagger */}
        <div className="bento-solar">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              className="bento-item-solar group"
              data-size={item.size}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="solar-icon mb-6">
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <div className="space-y-3">
                <h4 className="font-serif text-2xl text-navy-deep tracking-tight">{item.title}</h4>
                <p className="font-sans text-xs text-slate-400 uppercase tracking-widest font-semibold">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
