import React from 'react';
import { Target, Zap, Shield, Layers, Activity, Cpu } from 'lucide-react';

export default function Technique() {
  return (
    <div className="bg-solar-bg-primary pt-32 min-h-screen">
      
      {/* HEADER BLUEPRINT */}
      <section className="bg-solar-bg-primary border-b border-solar-glass-border overflow-hidden relative">
        {/* DECORATIVE SUN GLOW */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solar-accent-sun/5 blur-[150px] pointer-events-none" />
        
        <div className="container-solar py-24 relative z-10">
           <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 flex flex-col gap-12">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-solar-accent-sun rounded-full shadow-[0_0_10px_var(--solar-accent-sun)]" />
                    <span className="subtitle-silk !text-solar-accent-sun !text-[10px]">INGÉNIERIE SOLAIRE // SPEC-01</span>
                 </div>
                 <h1 className="font-heading text-7xl lg:text-[140px] text-solar-text-primary leading-none tracking-tighter uppercase font-black">
                    STASIS.<br />
                    <span className="opacity-10">ARCHIVE.</span>
                 </h1>
                 <p className="max-w-2xl text-xl text-slate-300 leading-relaxed font-sans italic">
                    Analyse comparative et métriques de performance du système <span className="text-solar-text-primary font-semibold italic">SOLARIS LUX</span>. 
                    Une ingénierie calibrée pour l'éternité.
                 </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col justify-end lg:border-l border-white/5 lg:pl-16 gap-16">
                 <div className="flex flex-col gap-4">
                    <div className="subtitle-silk !text-solar-text-muted !text-[9px]">TELEMETRY LINK</div>
                    <div className="flex items-center gap-6">
                       <span className="w-3 h-3 bg-solar-accent-sun rounded-full animate-pulse shadow-[0_0_15px_var(--solar-accent-sun)]" />
                       <span className="font-heading text-3xl text-solar-text-primary tracking-widest font-black uppercase italic">ACTIVE</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-4">
                    <div className="subtitle-silk !text-solar-text-muted !text-[9px]">THERMAL GRADIENT</div>
                    <div className="font-heading text-7xl text-solar-accent-sun uppercase italic font-black">1.2 ΔT</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* TECH CLUSTERS */}
      <section className="py-40">
         <div className="container-solar grid lg:grid-cols-2 gap-12">
            <div className="bg-solar-bg-secondary p-16 border border-solar-glass-border relative group hover:shadow-xl transition-all duration-500 rounded-3xl">
               <h3 className="font-heading text-4xl text-solar-text-primary mb-10 tracking-widest flex items-center gap-6 font-black uppercase">
                  <span className="w-12 h-px bg-solar-accent-sun" /> IONIC STASIS.
               </h3>
               <p className="text-solar-text-muted mb-12 max-w-md text-sm leading-relaxed font-sans italic">
                 Réduction drastique de la chaleur via flux d'ions négatifs. 
                 Maintien de la performance crête après 24h de charge intensive.
               </p>
               <div className="space-y-6">
                  {['Flux d\'ions constant', 'Zéro friction thermique', 'Conductivité augmentée +300%'].map((txt, i) => (
                    <div key={i} className="flex items-center gap-6 subtitle-silk !text-solar-text-muted !text-[11px] py-5 border-b border-solar-glass-border">
                       <Zap size={20} className="text-solar-accent-sun" /> {txt}
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-16 border border-solar-accent-sun/20 relative group hover:border-solar-accent-sun/40 transition-all duration-500 rounded-3xl shadow-lg">
               <h3 className="font-heading text-4xl text-solar-accent-sun mb-10 tracking-widest flex items-center gap-6 font-black uppercase">
                  <span className="w-12 h-px bg-solar-text-primary" /> TITANIUM CORE.
               </h3>
               <p className="text-solar-text-muted mb-12 max-w-md text-sm leading-relaxed font-sans italic font-bold">
                 L'alliage le plus résistant du marché. Usinage de précision 
                 garantissant une structure indéformable et une légéreté extrême.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="bg-solar-bg-secondary p-8 border-l-4 border-solar-accent-sun rounded-r-xl">
                     <div className="subtitle-silk !text-solar-text-muted !text-[9px] mb-4">Masse Totale</div>
                     <div className="font-heading text-6xl text-solar-text-primary font-black uppercase">124G</div>
                  </div>
                  <div className="bg-solar-bg-secondary p-8 border-l-4 border-solar-text-primary rounded-r-xl">
                     <div className="subtitle-silk !text-solar-text-muted !text-[9px] mb-4">Densité Spec</div>
                     <div className="font-heading text-6xl text-solar-text-primary font-black uppercase">4.2ρ</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* COMPARATIVE TELEMETRY */}
      <section className="bg-solar-bg-secondary py-40 border-y border-solar-glass-border backdrop-blur-3xl">
         <div className="container-solar grid lg:grid-cols-2 gap-20">
            <div className="flex flex-col gap-16 pr-12">
               <h4 className="font-heading text-5xl text-solar-text-primary leading-tight font-black uppercase italic">CELESTIAL<br/><span className="text-solar-accent-sun">METRICS.</span></h4>
               <div className="space-y-20">
                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between items-end">
                        <span className="subtitle-silk !text-solar-text-muted !text-[10px]">Efficacité vs Température</span>
                        <span className="font-heading text-4xl text-solar-text-primary font-black italic">98.4%</span>
                     </div>
                     <div className="w-full h-1 bg-solar-glass-border relative rounded-full overflow-hidden">
                        <div className="h-full bg-solar-accent-sun" style={{ width: '98.4%', boxShadow: '0 0 20px rgba(0,122,255,0.4)' }} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between items-end">
                        <span className="subtitle-silk !text-solar-text-muted !text-[10px]">Vitesse de Charge</span>
                        <span className="font-heading text-4xl text-solar-text-primary font-black italic">15 WATTS</span>
                     </div>
                     <div className="w-full h-1 bg-solar-glass-border relative rounded-full overflow-hidden">
                        <div className="h-full bg-solar-text-primary animate-pulse" style={{ width: '100%' }} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-center p-12 bg-white border border-solar-glass-border shadow-sm rounded-3xl">
               <div className="relative group">
                  <img src="/exploded-view.png" alt="Engineering Detail" className="w-full h-auto grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-solar-accent-sun/5 opacity-40 group-hover:opacity-0 transition-all" />
               </div>
            </div>
         </div>
      </section>

      <div className="py-20 flex justify-center border-t border-solar-glass-border">
         <span className="subtitle-silk !text-solar-text-muted !text-[10px] !tracking-[1em]">SOLARIS LUX // PROTOCOL ACCESS 2028.Q1</span>
      </div>
    </div>
  );
}
