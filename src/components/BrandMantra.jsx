import React from 'react';

export default function BrandMantra() {
  return (
    <section className="section bg-[#0A0A0A] py-60 overflow-hidden relative">
      {/* OVERLAY TECH GRID */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
           style={{ background: 'linear-gradient(90deg, #FFF 1px, transparent 1px), linear-gradient(#FFF 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="container relative z-10 text-center flex flex-col items-center gap-16">
        <div className="flex items-center gap-6">
           <span className="h-[2px] w-20 bg-[var(--color-racing-yellow)]" />
           <span className="title-tech text-[var(--color-racing-yellow)] text-2xl tracking-[0.8em]">MANTRA</span>
           <span className="h-[2px] w-20 bg-[var(--color-racing-yellow)]" />
        </div>

        <h2 className="headline-editorial text-[8vw] lg:text-[10vw] text-[var(--color-tech-white)] leading-[0.75] italic">
           PUSH THE<br />
           <span className="text-transparent" style={{ WebkitTextStroke: '3px white' }}>LIMITS.</span>
        </h2>

        <p className="max-w-4xl text-2xl lg:text-3xl text-[var(--color-industrial-grey)] font-medium leading-relaxed uppercase tracking-[0.1em]">
           "La perfection n'est pas une destination. C'est le seul standard que nous acceptons. Usiné pour durer. Conçu pour gagner."
        </p>

        <div className="w-[1px] h-40 bg-gradient-to-b from-[var(--color-racing-yellow)] to-transparent" />
      </div>
    </section>
  );
}
