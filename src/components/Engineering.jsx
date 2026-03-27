import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Battery, Gauge, Cpu, Activity } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const metrics = [
  { icon: <Zap />, title: 'TURBO FEED', desc: 'Distribution énergétique à haut débit via noyau LN4-Core', size: 'large' },
  { icon: <Gauge />, title: 'LATENCY <0.01s', desc: 'Sync instantanée par induction à haute fréquence', size: 'wide' },
  { icon: <Cpu />, title: 'PILOT SYNC', desc: 'Optimisation logicielle adaptative en temps réel', size: 'standard' },
  { icon: <Activity />, title: 'STRESS TESTED', desc: 'Châssis carbone résistant aux vibrations extrêmes', size: 'standard' },
];

export default function Engineering() {
  return (
    <section id="engineering" className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      
      {/* Velocity Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lando-yellow/5 blur-[180px] pointer-events-none" />
      
      <div className="container-solar relative z-10">
        <div className="flex flex-col items-start gap-10 mb-24 max-w-4xl">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="font-heading font-black text-xs tracking-[0.4em] text-solar-accent-sun uppercase">
              Power Unit Diagnostics // 2027
            </div>
            <h2 className="font-heading font-black text-6xl lg:text-8xl leading-[0.85] uppercase italic">
              INGÉNIÉRIE <br />
              <span className="text-solar-accent-sun">SANS LIMITE.</span>
            </h2>
          </motion.div>
           
          <motion.p
            className="max-w-2xl text-xl text-solar-text-secondary font-medium leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Solaris Lux n'est pas qu'un chargeur. C'est un concentrateur de puissance conçu pour les environnements où chaque milliseconde compte. Inspiré par les exigences de la Formule 1, le SmartCharge V1 délivre une performance constante sous pression.
          </motion.p>
        </div>

        {/* Technical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              className={`bento-cell flex flex-col justify-between group h-full
                ${item.size === 'large' ? 'md:col-span-8 md:row-span-2 min-h-[400px]' : 
                  item.size === 'wide' ? 'md:col-span-8 min-h-[250px]' : 
                  'md:col-span-4 min-h-[250px]'}
              `}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="text-solar-accent-sun group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(item.icon, { size: 32 })}
              </div>
              <div className="mt-8">
                <h4 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-solar-text-primary mb-2">{item.title}</h4>
                <p className="font-heading text-[10px] font-bold text-solar-text-muted uppercase tracking-[0.3em] leading-relaxed">{item.desc}</p>
              </div>

              {/* Technical Marker Deco */}
              <div className="absolute top-4 right-4 font-mono text-[8px] text-solar-text-muted opacity-50 uppercase">
                Ref_ {Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
