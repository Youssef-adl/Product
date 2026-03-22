import React from 'react';
import { motion } from 'framer-motion';

export default function Specs() {
  const specs = [
    { category: 'TECHNIQUE', items: [
      { label: 'Multi-emplacements', value: 'Trafic fluide' },
      { label: 'Design Ergonomique', value: 'Compact & robuste' },
      { label: 'Compatibilité', value: 'Standard Qi Universel' }
    ]},
    { category: 'SÉCURITÉ', items: [
      { label: 'Thermique', value: 'Anti-surchauffe' },
      { label: 'Électrique', value: 'Anti-surtensions' },
      { label: 'Interface', value: 'Utilisateur intuitive' }
    ]},
    { category: 'ÉCOSYSTÈME (Mosquée)', items: [
      { label: 'Flux', value: 'Passage Intuitif' },
      { label: 'Visibilité', value: 'Disponible 24/7' },
      { label: 'Adoption', value: 'Naturelle' }
    ]}
  ];

  return (
    <section id="specs" className="relative py-32 overflow-hidden bg-solar-ivory">
      <div className="container-solar relative z-10 flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/3">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="sticky top-32 flex flex-col gap-10"
           >
              <div className="subtitle-silk !before:hidden !after:hidden">Radiographie Technique</div>
              <h2 className="title-solar text-5xl lg:text-7xl leading-[1.1]">
                 La Finesse de <br />
                 <em className="text-gradient-sun">L'Ingénierie.</em>
              </h2>
              <p className="text-slate-400 text-sm tracking-widest uppercase font-sans font-semibold max-w-xs leading-loose">
                Un écosystème conçu pour s'intégrer parfaitement à l'ISTA Témara.
              </p>
           </motion.div>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
           {specs.map((group, i) => (
             <div key={group.category} className="glass-solar p-10 hover:border-gold-sun transition-colors duration-500">
                <span className="font-sans text-[10px] text-coral-deep tracking-[0.4em] uppercase font-bold block mb-10">{group.category}</span>
                <div className="flex flex-col gap-8">
                   {group.items.map((item, j) => (
                      <div key={item.label} className="grid grid-cols-[1fr_auto] gap-4 items-end pb-4 border-b border-sand/30 group">
                         <span className="font-serif text-slate-500 text-lg group-hover:text-navy-deep transition-colors italic leading-none">{item.label}</span>
                         <span className="font-sans text-navy-deep text-xs font-bold group-hover:text-coral-deep transition-colors uppercase tracking-widest leading-none text-right">{item.value}</span>
                      </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
