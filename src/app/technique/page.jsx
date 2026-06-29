"use client";

import { Target, Zap, Shield, Layers, Activity, Cpu, Sparkles, Box, Monitor, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import SketchfabViewer from '../../components/SketchfabViewer';

export default function Technique() {
  return (
    <div className="bg-transparent pt-32 min-h-screen selection:bg-[#1ED760]/30 selection:text-white">
      
      {/* HEADER SECTION */}
      <section className="overflow-hidden relative pb-20 border-b border-white/5">
        {/* Accent Glow */}
        <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-[#1ED760]/5 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] pointer-events-none rounded-full" />
        
        {/* Scanning Effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1ED760]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.5)] animate-[scan_6s_linear_infinite] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-24 relative z-10">
           <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-8 flex flex-col gap-16">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-[1px] bg-[#1ED760]" />
                    <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">DOSSIER TECHNIQUE // SPEC-01</span>
                  </div>
                  <h1 className="font-heading text-7xl lg:text-[140px] text-white leading-[0.85] tracking-tighter uppercase font-black italic">
                    PRÉCISION.<br />
                    <span className="text-white/10">INGÉNIERIE.</span>
                  </h1>
                  <p className="max-w-2xl text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed font-sans italic tracking-tight">
                    Analyse comparative et métriques de performance du système <span className="text-white font-black underline decoration-[#1ED760]/30 underline-offset-8">SOLARIS LUX</span>. 
                    Une architecture calibrée pour l'excellence pure.
                  </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col justify-end lg:border-l border-white/5 lg:pl-16 gap-16">
                 <div className="flex flex-col gap-6">
                    <div className="font-mono text-[10px] font-black text-white/20 tracking-[0.4em] uppercase italic">LIEN TÉLÉMÉTRIQUE</div>
                    <div className="flex items-center gap-6">
                       <div className="relative">
                          <span className="flex h-4 w-4 bg-[#1ED760] rounded-full animate-pulse shadow-[0_0_20px_#1ED760]" />
                          <span className="absolute inset-0 h-4 w-4 bg-[#1ED760] rounded-full animate-ping opacity-40" />
                       </div>
                       <span className="font-heading text-4xl text-white tracking-widest font-black uppercase italic">ACTIF</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-6">
                    <div className="font-mono text-[10px] font-black text-white/20 tracking-[0.4em] uppercase italic">GRADIENT THERMIQUE</div>
                    <div className="font-heading text-8xl text-[#1ED760] uppercase italic font-black tracking-tighter shadow-sm">1.2 ΔT</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* TECH CLUSTERS */}
      <section className="py-48 relative">
         <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-12">
            <div className="glass-obsidian p-16 lg:p-20 relative rounded-[3.5rem] transition-all duration-700 hover:scale-[1.02] group overflow-hidden">
               <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-[#1ED760]/10 transition-colors">
                  <Monitor size={120} strokeWidth={1} />
               </div>
               <div className="relative z-10">
                 <h3 className="font-heading text-4xl text-white mb-10 tracking-widest flex items-center gap-6 font-black uppercase italic">
                    <span className="w-12 h-px bg-[#1ED760]" /> STASE IONIQUE.
                 </h3>
                 <p className="text-[var(--text-secondary)] mb-16 max-w-md text-sm lg:text-base leading-relaxed font-sans italic">
                   Réduction drastique de la chaleur via flux d'ions négatifs. 
                   Maintien de la performance crête après 24h de charge intensive.
                 </p>
                 <div className="space-y-4">
                    {['Flux d\'ions constant', 'Zéro friction thermique', 'Conductivité augmentée +300%'].map((txt, i) => (
                      <div key={i} className="flex items-center gap-6 font-mono text-[11px] font-black text-white/40 py-6 border-b border-white/5 uppercase tracking-[0.2em] italic group/line hover:text-[#1ED760] transition-colors">
                         <Zap size={20} className="text-[#1ED760] group-hover/line:scale-110 transition-transform" /> {txt}
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            <div className="glass-obsidian bg-[#1ED760]/5 p-16 lg:p-20 border border-[#1ED760]/20 relative rounded-[3.5rem] shadow-2xl group overflow-hidden">
               <div className="absolute -bottom-10 -left-10 p-12 text-white/5 group-hover:text-[#1ED760]/10 transition-colors transform -rotate-12">
                  <Box size={240} strokeWidth={0.5} />
               </div>
               <div className="relative z-10">
                 <h3 className="font-heading text-4xl text-[#1ED760] mb-10 tracking-widest flex items-center gap-6 font-black uppercase italic">
                    <span className="w-12 h-px bg-white" /> CŒUR TITANE.
                 </h3>
                 <p className="text-white mb-16 max-w-md text-sm lg:text-base leading-relaxed font-sans italic font-bold">
                   L'alliage le plus résistant du marché. Usinage de précision 
                   garantissant une structure indéformable et une légèreté extrême.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="glass-obsidian bg-black/40 p-10 border-l-4 border-[#1ED760] rounded-r-3xl">
                       <div className="font-mono text-[10px] font-black text-white/20 mb-4 uppercase tracking-widest italic">Masse Totale</div>
                       <div className="font-heading text-7xl text-white font-black uppercase italic tracking-tighter">124G</div>
                    </div>
                    <div className="glass-obsidian bg-black/40 p-10 border-l-4 border-white/40 rounded-r-3xl">
                       <div className="font-mono text-[10px] font-black text-white/20 mb-4 uppercase tracking-widest italic">Densité Spec</div>
                       <div className="font-heading text-7xl text-white font-black uppercase italic tracking-tighter">4.2ρ</div>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* COMPARATIVE TELEMETRY */}
      <section className="py-48 border-y border-white/5 relative bg-black/20">
         <div className="absolute inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
         <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-24 items-center">
            <div className="flex flex-col gap-20 pr-12 lg:border-r border-white/5">
               <div className="flex items-center gap-4 text-[#1ED760]">
                  <Radio size={24} className="animate-pulse" />
                  <h4 className="font-heading text-5xl lg:text-7xl text-white leading-[0.9] font-black uppercase italic tracking-tighter">
                    CELESTIAL<br/><span className="text-[#1ED760] opacity-80">METRICS.</span>
                  </h4>
               </div>
               
               <div className="space-y-16">
                  <div className="flex flex-col gap-8">
                     <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">Efficacité vs Température</span>
                        <span className="font-heading text-5xl text-white font-black italic tracking-tighter">98.4%</span>
                     </div>
                     <div className="w-full h-2 bg-white/5 relative rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '98.4%' }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full bg-[#1ED760] shadow-[0_0_20px_#1ED760]" 
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-8">
                     <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">Capacité de Transfert</span>
                        <span className="font-heading text-5xl text-white font-black italic tracking-tighter">15W CRÊTE</span>
                     </div>
                     <div className="w-full h-2 bg-white/5 relative rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                          className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative group">
               <div className="absolute inset-0 bg-[#1ED760]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="glass-obsidian p-2 rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border border-white/5">
                  <div className="w-full aspect-square bg-black/60 rounded-[3.8rem] overflow-hidden">
                     <SketchfabViewer 
                       modelId="f8a25b0fd4104ee9ae4206b4420ecd36" 
                       title="Qi Wireless 15W Coil" 
                     />
                  </div>
               </div>
               
               <div className="absolute -top-6 -right-6 glass-obsidian px-6 py-4 rounded-2xl border border-[#1ED760]/30 z-20">
                  <div className="flex items-center gap-3">
                      <Cpu size={16} className="text-[#1ED760]" />
                     <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest italic">Live Telemetry</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <div className="py-24 flex flex-col items-center gap-6 border-t border-white/5">
         <span className="font-mono text-[10px] font-black text-white/10 tracking-[1.5em] uppercase italic">SOLARIS LUX // ARCHIVE TECHNIQUE V1.0</span>
         <div className="w-1 h-24 bg-gradient-to-b from-[#1ED760]/40 to-transparent" />
      </div>
    </div>
  );
}
