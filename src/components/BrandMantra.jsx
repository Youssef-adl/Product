"use client";

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function BrandMantra() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const bgY = useTransform(smoothProgress, [0, 1], ['-15%', '15%']);
  
  // Parallax for founders — Balanced Institutional Spread
  const leftFounderX = useTransform(smoothProgress, [0, 0.4], ['-30%', '0%']);
  const rightFounderX = useTransform(smoothProgress, [0, 0.4], ['30%', '0%']);
  const foundersOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative pt-64 pb-32 overflow-hidden bg-[var(--bg-primary)] font-sans"
    >
      {/* Background Cinematic Atmosphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[900px] bg-accent-primary/[0.01] rounded-[100%] blur-[180px] pointer-events-none"
        style={{ y: bgY }}
      />

      {/* Main Layout Grid — Museum Spread Style */}
      <div className="container-solar relative z-10">
        
        {/* Top Header — Institutional Title */}
        <div className="flex flex-col items-center gap-6 mb-24 text-center">
           <motion.div
             className="flex items-center gap-8"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
           >
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-accent-secondary/40" />
             <span className="text-[11px] font-black uppercase tracking-[1.2em] text-accent-secondary font-heading pt-1">
               L'ESPRIT SOLARIS LUX
             </span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-accent-secondary/40" />
           </motion.div>

           <motion.h2
             className="text-[10vw] lg:text-[7vw] text-[var(--text-primary)] leading-[0.9] tracking-tighter font-black uppercase font-heading max-w-5xl"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           >
             L'Énergie <br />
             <span className="text-[var(--text-muted)] opacity-30 italic font-medium font-sans lowercase">ne s'arrête</span> <span className="text-accent-primary">jamais.</span>
           </motion.h2>
        </div>

        {/* 3-Column Spreading Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr_1fr] items-end gap-12 xl:gap-0 relative min-h-[600px]">
          
          {/* Left Column — Founder I (CEO) */}
          <motion.div 
            className="hidden xl:flex flex-col items-start gap-8 z-20"
            style={{ x: leftFounderX, opacity: foundersOpacity }}
          >
            <div className="relative group">
              <img 
                src="/adlani.png" 
                alt="Youssouf Adlani" 
                className="w-full max-h-[500px] object-contain transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
              />
              
              {/* Refined "Museum Exhibit" Label */}
              <div className="mt-8 pl-4 border-l border-accent-primary/50">
                <span className="text-[9px] font-black text-accent-primary uppercase tracking-[0.5em] font-heading">Fondateur • CEO</span>
                <h4 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight font-heading mt-1">Youssouf Adlani</h4>
                <p className="text-[10px] text-[var(--text-muted)] italic mt-2 max-w-[200px]">Visionnaire & Stratège — Pilotage du développement global.</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column — The Narrative Manifest */}
          <motion.div
            className="flex flex-col items-center gap-16 px-6 lg:px-12 z-10 py-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <div className="text-2xl lg:text-3xl text-[var(--text-primary)] font-light leading-[1.8] text-center italic tracking-wide font-sans space-y-12 max-w-2xl">
               <p className="opacity-95 relative">
                 <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl text-accent-secondary/5 font-heading select-none">“</span>
                 {`Solaris Lux est une réponse institutionnelle à une précarité énergétique constatée chaque jour dans les couloirs de l'ISTA.`
                 .split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-[0.25em]">
                       {word === "Solaris" || word === "Lux" || word === "ISTA" ? <b className="text-accent-primary not-italic font-heading uppercase">{word}</b> : word}
                    </span>
                 ))}
               </p>
               
               <div className="w-12 h-[1px] bg-white/10 mx-auto" />

               <p className="text-[var(--text-muted)] text-xl not-italic font-medium text-center">
                 Nous avons transformé la frustration de centaines d'étudiants en une solution durable, propre et technologiquement souveraine.
               </p>
             </div>

             {/* Signature Look */}
             <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-[1px] bg-accent-secondary/20" />
                   <div className="w-2 h-2 rounded-full bg-accent-primary" />
                   <div className="w-8 h-[1px] bg-accent-secondary/20" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[var(--text-muted)]">Solaris Lux © 2026</span>
             </div>
          </motion.div>

          {/* Right Column — Founder II (CTO) */}
          <motion.div 
            className="hidden xl:flex flex-col items-end gap-8 z-20"
            style={{ x: rightFounderX, opacity: foundersOpacity }}
          >
            <div className="relative group text-right flex flex-col items-end">
              <img 
                src="/zhar.png" 
                alt="Youssef Zhar" 
                className="w-full max-h-[500px] object-contain transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
              />
              
              {/* Refined "Museum Exhibit" Label */}
              <div className="mt-8 pr-4 border-r border-accent-secondary/50 flex flex-col items-end">
                <span className="text-[9px] font-black text-accent-secondary uppercase tracking-[0.5em] font-heading">Fondateur • CTO</span>
                <h4 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight font-heading mt-1">Youssef Zhar</h4>
                <p className="text-[10px] text-[var(--text-muted)] italic mt-2 max-w-[200px]">Tech & Innovation — Supervision technique et conception.</p>
              </div>
            </div>
          </motion.div>

          {/* Mobile Layout — Clean Vertical Stack */}
          <div className="xl:hidden flex flex-col items-center gap-24 mt-20 w-full px-4 relative z-30">
             <div className="flex flex-col items-center gap-8">
                <div className="w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                   <img src="/adlani.png" alt="CEO" className="w-full h-full object-cover" />
                </div>
                <div className="text-center space-y-2">
                   <h4 className="text-4xl font-black font-heading uppercase tracking-tighter">Youssouf Adlani</h4>
                   <p className="text-xs font-black text-accent-primary uppercase tracking-widest">FONDATEUR • CEO</p>
                </div>
             </div>
             
             <div className="w-16 h-[1px] bg-white/10" />

             <div className="flex flex-col items-center gap-8">
                <div className="w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                   <img src="/zhar.png" alt="CTO" className="w-full h-full object-cover" />
                </div>
                <div className="text-center space-y-2">
                   <h4 className="text-4xl font-black font-heading uppercase tracking-tighter">Youssef Zhar</h4>
                   <p className="text-xs font-black text-accent-secondary uppercase tracking-widest">FONDATEUR • CTO</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
