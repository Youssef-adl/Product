import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="relative py-32 lg:py-48 overflow-hidden bg-bg-primary transition-colors duration-500 border-y border-glass-border/20">
      
      {/* SOLAR GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-sun/5 dark:bg-lunar-violet/5 blur-[200px] pointer-events-none" />
      
      <div className="container-solar relative z-10 text-center flex flex-col items-center gap-12">
        <div className="flex flex-col gap-6 items-center">
           <div className="flex items-center gap-4">
              <Sparkles size={20} className="text-coral animate-pulse" />
              <span className="subtitle-silk !before:hidden !after:hidden">Production Limitée // Accès Immédiat</span>
           </div>
           
           <h2 className="title-solar text-6xl lg:text-9xl leading-[1.1] tracking-tighter">
              POSSÉDEZ<br />
              <em className="text-gradient-sun not-italic">L'ARTEFACT.</em>
           </h2>
        </div>

        <p className="max-w-2xl text-xl text-text-secondary leading-relaxed font-sans italic">
           Rejoignez l'élite technologique. Le lot final de la série <span className="text-text-primary font-semibold">SmartCharge V1</span> est désormais accessible.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
           <Link to="/boutique" className="btn-primary !px-12 !py-6 !text-lg group">
             <span className="flex items-center gap-3">
               COMMANDER MAINTENANT
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
           </Link>
           <a href="mailto:admin@solaris-lux.com" className="btn-secondary !px-12 !py-6 !text-lg bg-bg-secondary text-text-primary border-glass-border">
              DEMANDE TECHNIQUE
           </a>
        </div>
      </div>
    </section>
  );
}
