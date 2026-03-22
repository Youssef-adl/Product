import React from 'react';
import { Target, Zap, Shield, Layers, Activity, Cpu } from 'lucide-react';

export default function Technique() {
  return (
    <div className="bg-navy-deep pt-32 min-h-screen">
      
      {/* HEADER BLUEPRINT */}
      <section className="bg-navy-deep border-b border-white/5 overflow-hidden relative">
        {/* DECORATIVE SUN GLOW */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-sun/5 blur-[150px] pointer-events-none" />
        
        <div className="container-solar py-24 relative z-10">
           <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 flex flex-col gap-12">
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-gold-sun rounded-full shadow-[0_0_10px_gold]" />
                    <span className="subtitle-silk !text-gold-sun !text-[10px]">INGÉNIERIE SOLAIRE // SPEC-01</span>
                 </div>
                 <h1 className="font-serif text-7xl lg:text-[140px] text-gradient-sun leading-none tracking-tighter">
                    STASIS.<br />
                    <span className="opacity-20 text-white">ARCHIVE.</span>
                 </h1>
                 <p className="max-w-2xl text-xl text-slate-300 leading-relaxed font-sans italic">
                    Analyse comparative et métriques de performance du système <span className="text-white font-semibold italic">SOLARIS LUX</span>. 
                    Une ingénierie calibrée pour l'éternité.
                 </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col justify-end lg:border-l border-white/5 lg:pl-16 gap-16">
                 <div className="flex flex-col gap-4">
                    <div className="subtitle-silk !text-slate-500 !text-[9px]">TELEMETRY LINK</div>
                    <div className="flex items-center gap-6">
                       <span className="w-3 h-3 bg-gold-sun rounded-full animate-pulse shadow-[0_0_15px_gold]" />
                       <span className="font-serif text-3xl text-white tracking-widest">ACTIVE</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-4">
                    <div className="subtitle-silk !text-slate-500 !text-[9px]">THERMAL GRADIENT</div>
                    <div className="font-serif text-7xl text-gold-sun shadow-gold-sun/20">1.2 ΔT</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* TECH CLUSTERS */}
      <section className="py-40">
         <div className="container-solar grid lg:grid-cols-2 gap-12">
            <div className="bg-white/5 p-16 border border-white/10 relative group hover:bg-white/[0.08] transition-all duration-500">
               <h3 className="font-serif text-4xl text-white mb-10 tracking-widest flex items-center gap-6">
                  <span className="w-12 h-px bg-gold-sun" /> IONIC STASIS.
               </h3>
               <p className="text-slate-300 mb-12 max-w-md text-sm leading-relaxed font-sans italic">
                 Réduction drastique de la chaleur via flux d'ions négatifs. 
                 Maintien de la performance crête après 24h de charge intensive.
               </p>
               <div className="space-y-6">
                  {['Flux d\'ions constant', 'Zéro friction thermique', 'Conductivité augmentée +300%'].map((txt, i) => (
                    <div key={i} className="flex items-center gap-6 subtitle-silk !text-slate-400 !text-[11px] py-5 border-b border-white/5">
                       <Zap size={20} className="text-gold-sun" /> {txt}
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-black/20 p-16 border border-gold-sun/20 relative group hover:border-gold-sun/40 transition-all duration-500">
               <h3 className="font-serif text-4xl text-gold-sun mb-10 tracking-widest flex items-center gap-6">
                  <span className="w-12 h-px bg-white" /> TITANIUM CORE.
               </h3>
               <p className="text-white/40 mb-12 max-w-md text-sm leading-relaxed font-sans italic font-bold">
                 L'alliage le plus résistant du marché. Usinage de précision 
                 garantissant une structure indéformable et une légéreté extrême.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white/5 p-8 border-l-4 border-gold-sun">
                     <div className="subtitle-silk !text-slate-500 !text-[9px] mb-4">Masse Totale</div>
                     <div className="font-serif text-6xl text-white">124G</div>
                  </div>
                  <div className="bg-white/5 p-8 border-l-4 border-white">
                     <div className="subtitle-silk !text-slate-500 !text-[9px] mb-4">Densité Spec</div>
                     <div className="font-serif text-6xl text-white">4.2ρ</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* COMPARATIVE TELEMETRY */}
      <section className="bg-white/5 py-40 border-y border-white/5 backdrop-blur-3xl">
         <div className="container-solar grid lg:grid-cols-2 gap-20">
            <div className="flex flex-col gap-16 pr-12">
               <h4 className="font-serif text-5xl text-white leading-tight">CELESTIAL<br/><span className="text-gold-sun">METRICS.</span></h4>
               <div className="space-y-20">
                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between items-end">
                        <span className="subtitle-silk !text-slate-400 !text-[10px]">Efficacité vs Température</span>
                        <span className="font-serif text-4xl text-white">98.4%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 relative">
                        <div className="h-full bg-gold-sun" style={{ width: '98.4%', boxShadow: '0 0 20px rgba(255,183,77,0.6)' }} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between items-end">
                        <span className="subtitle-silk !text-slate-400 !text-[10px]">Vitesse de Charge</span>
                        <span className="font-serif text-4xl text-white">15 WATTS</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 relative overflow-hidden">
                        <div className="h-full bg-white animate-pulse" style={{ width: '100%' }} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-center p-12 bg-black/40 border border-white/5 border-dashed rounded-3xl">
               <div className="relative group">
                  <img src="/exploded-view.png" alt="Engineering Detail" className="w-full h-auto grayscale opacity-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gold-sun/5 opacity-40 group-hover:opacity-0 transition-all" />
               </div>
            </div>
         </div>
      </section>

      <div className="py-20 flex justify-center border-t border-white/5">
         <span className="subtitle-silk !text-slate-600 !text-[10px] !tracking-[1em]">SOLARIS LUX // PROTOCOL ACCESS 2026.04</span>
      </div>
    </div>
  );
}
