import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="relative py-32 lg:py-48 overflow-hidden bg-solar-bg-primary transition-colors duration-500 border-y border-solar-glass-border">
      
      {/* SOLAR GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-solar-accent-sun/10 blur-[200px] pointer-events-none" />
      
      <div className="container-solar relative z-10 text-center flex flex-col items-center gap-12">
        <div className="flex flex-col gap-6 items-center">
           <div className="flex items-center gap-4">
              <Sparkles size={20} className="text-solar-accent-sun animate-pulse" />
              <span className="subtitle-silk !before:hidden !after:hidden !font-sans !tracking-[0.3em] !text-[10px] !text-solar-accent-sun">Production Limitée // Accès Immédiat</span>
           </div>
           
           <h2 className="title-solar text-6xl lg:text-9xl leading-[1.1] tracking-tighter !font-heading !font-black uppercase text-solar-text-primary">
              POSSÉDEZ<br />
              <em className="text-solar-accent-sun italic not-italic">L'ARTEFACT.</em>
           </h2>
        </div>

        <p className="max-w-2xl text-xl text-solar-text-muted leading-relaxed font-sans italic opacity-80">
           Rejoignez l'élite technologique. Le lot final de la série <span className="text-solar-text-primary font-black uppercase tracking-wider">SmartCharge V1</span> est désormais accessible.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
           <Link to="/boutique" className="btn-primary !px-12 !py-6 !text-lg group !bg-solar-accent-sun !text-solar-bg-primary !font-black hover:!bg-solar-text-primary transition-all duration-500 rounded-none uppercase tracking-widest">
             <span className="flex items-center gap-3">
               COMMANDER MAINTENANT
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
           </Link>
           <a href="mailto:admin@solaris-lux.com" className="btn-secondary !px-12 !py-6 !text-lg !bg-transparent !text-solar-text-primary !border-solar-text-primary/20 hover:!border-solar-accent-sun transition-all duration-500 rounded-none uppercase tracking-widest font-black">
              DEMANDE TECHNIQUE
           </a>
        </div>
      </div>
    </section>
  );
}
