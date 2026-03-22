import React from 'react';
import { motion } from 'framer-motion';

export default function TrustBar() {
  const brands = ['OFPPT', 'ISTA TÉMARA', 'ADLANI & ZHAR', 'SMART CAMPUS', 'TECH. QI'];
  
  return (
    <div className="relative py-16 border-y border-sand/30 overflow-hidden bg-solar-ivory/80 backdrop-blur-sm">
      <div className="container-solar relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="subtitle-silk !before:hidden !after:hidden">
          Présenté par l'équipe
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-10 lg:gap-16 opacity-60 hover:opacity-100 transition-all duration-700">
           {brands.map(brand => (
             <span 
               key={brand} 
               className="font-sans text-navy-deep text-xs lg:text-sm font-bold tracking-[0.3em] hover:text-coral-deep cursor-default transition-colors duration-300"
             >
               {brand}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
}
