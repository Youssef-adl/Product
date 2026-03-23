import React from 'react';
import { motion } from 'framer-motion';

/**
 * TrustBar — premium glassmorphism trust bar 
 * replaces the flat ivory design with a floating glass banner.
 */
export default function TrustBar() {
  const brands = ['OFPPT', 'ISTA TÉMARA', 'ADLANI & ZHAR', 'SMART CAMPUS', 'TECH. QI'];
  
  return (
    <div className="relative py-12 overflow-hidden bg-transparent">
      <div className="container-solar">
        <motion.div 
          className="glass-solar !p-8 flex flex-col md:flex-row items-center justify-between gap-10 border border-white/40 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-coral-deep/30" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold whitespace-nowrap">
              Partenaires & Écosystème
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 lg:gap-14">
             {brands.map((brand, i) => (
               <motion.span 
                 key={brand} 
                 className="font-sans text-navy-deep text-[11px] lg:text-xs font-black tracking-[0.35em] hover:text-coral-deep cursor-default transition-all duration-500 opacity-40 hover:opacity-100 hover:scale-105"
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 0.4 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
               >
                 {brand}
               </motion.span>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
