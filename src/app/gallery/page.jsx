"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    { id: '01', title: 'Vue Éclatée', category: 'Ingénierie' },
    { id: '02', title: 'Finition Titane', category: 'Matériau' },
    { id: '03', title: 'Éclat Stase', category: 'Esthétique' },
    { id: '04', title: 'Cœur Magnétique', category: 'Physique' },
    { id: '05', title: 'Bouclier Thermique', category: 'Protection' },
    { id: '06', title: 'Zenith Lux', category: 'Édition Limitée' }
  ];

  return (
    <div className="bg-primary-bg pt-32 min-h-screen">
      {/* HEADER SECTION */}
      <section className="bg-primary-bg border-b border-black/[0.05] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="container-solar py-24 relative z-10">
          <div className="flex flex-col gap-12 max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent-primary rounded-full" />
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-accent-primary uppercase">
                SHOWCASE // ARCHIVE VISUELLE
              </span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-[100px] text-primary-text leading-none tracking-tighter uppercase font-black">
              GALLERY<br />
              <span className="opacity-10">VISUAL.</span>
            </h1>
            
            <p className="max-w-2xl text-xl text-secondary-text leading-relaxed font-sans italic">
              L'esthétique de la performance capturée sous tous les angles. L'union du verre, du titane et de la lumière.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-32">
        <div className="container-solar">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {images.map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative bg-black/[0.02] border border-black/[0.05] rounded-[2.5rem] overflow-hidden aspect-[4/5] flex flex-col items-center justify-center p-12 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.05]"
              >
                {/* ID Background */}
                <div className="text-primary-text/[0.03] font-heading text-[120px] font-black absolute inset-0 flex items-center justify-center select-none">
                  {img.id}
                </div>
                
                {/* CONTENT */}
                <div className="relative z-10 text-center space-y-4">
                   <div className="font-mono text-[9px] font-bold text-accent-primary tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {img.category}
                   </div>
                   <h3 className="font-heading text-2xl text-primary-text font-black tracking-widest uppercase italic">
                     {img.title}.
                   </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20 flex justify-center border-t border-black/[0.05] opacity-20">
         <span className="font-mono text-[10px] font-bold text-secondary-text tracking-[1em] uppercase">SOLARIS LUX // OPTICS</span>
      </div>
    </div>
  );
}
