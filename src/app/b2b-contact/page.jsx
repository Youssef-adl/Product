"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building, Globe, MessageSquare, Send, Check } from 'lucide-react';

export default function B2BContact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="bg-solar-bg-primary pt-32 min-h-screen">
      {/* HEADER SECTION */}
      <section className="bg-solar-bg-primary border-b border-solar-glass-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solar-accent-sun/5 blur-[150px] pointer-events-none" />
        
        <div className="container-solar py-24 relative z-10">
          <div className="flex flex-col gap-12 max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-solar-accent-sun rounded-full shadow-[0_0_10px_var(--solar-accent-sun)]" />
              <span className="subtitle-silk !text-solar-accent-sun !text-[10px] tracking-[0.3em] uppercase">
                ENTERPRISE // B2B NEXUS
              </span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-[100px] text-solar-text-primary leading-none tracking-tighter uppercase font-black">
              PARTENARIAT<br />
              <span className="opacity-10">INDUSTRIEL.</span>
            </h1>
            
            <p className="max-w-2xl text-xl text-slate-300 leading-relaxed font-sans italic">
              Accédez au protocole B2B pour les commandes en volume, l'intégration technique et les solutions sur mesure Solaris Lux.
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-32">
        <div className="container-solar grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
             <div className="p-12 bg-solar-bg-secondary border border-solar-glass-border rounded-3xl backdrop-blur-3xl">
                <h2 className="font-heading text-4xl text-solar-text-primary mb-10 tracking-widest font-black uppercase italic">
                  INQUIRY PROTOCOL.
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="subtitle-silk !text-solar-text-muted !text-[9px]">FULL NAME</label>
                      <input type="text" className="w-full bg-solar-bg-primary border border-solar-glass-border p-4 rounded-none font-sans text-xs tracking-widest uppercase focus:border-solar-accent-sun outline-none text-solar-text-primary" required />
                    </div>
                    <div className="space-y-3">
                      <label className="subtitle-silk !text-solar-text-muted !text-[9px]">COMPANY</label>
                      <input type="text" className="w-full bg-solar-bg-primary border border-solar-glass-border p-4 rounded-none font-sans text-xs tracking-widest uppercase focus:border-solar-accent-sun outline-none text-solar-text-primary" required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="subtitle-silk !text-solar-text-muted !text-[9px]">PROFESSIONAL EMAIL</label>
                    <input type="email" className="w-full bg-solar-bg-primary border border-solar-glass-border p-4 rounded-none font-sans text-xs tracking-widest uppercase focus:border-solar-accent-sun outline-none text-solar-text-primary" required />
                  </div>

                  <div className="space-y-3">
                    <label className="subtitle-silk !text-solar-text-muted !text-[9px]">PROJECT SCALE / VOLUME</label>
                    <select className="w-full bg-solar-bg-primary border border-solar-glass-border p-4 rounded-none font-sans text-xs tracking-widest uppercase focus:border-solar-accent-sun outline-none text-solar-text-primary appearance-none">
                      <option>10 - 50 UNITS</option>
                      <option>50 - 200 UNITS</option>
                      <option>200+ UNITS (ENTERPRISE)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="subtitle-silk !text-solar-text-muted !text-[9px]">TECHNICAL REQUIREMENTS</label>
                    <textarea rows="5" className="w-full bg-solar-bg-primary border border-solar-glass-border p-4 rounded-none font-sans text-xs tracking-widest uppercase focus:border-solar-accent-sun outline-none text-solar-text-primary resize-none" />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-6 bg-solar-text-primary text-solar-bg-primary font-heading font-black tracking-[0.5em] uppercase hover:bg-solar-accent-sun transition-all flex items-center justify-center gap-4 group"
                  >
                    {sent ? (
                      <>
                        <Check size={20} /> PROTOCOL SENT
                      </>
                    ) : (
                      <>
                        TRANSMIT INQUIRY <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
             </div>
          </div>

          <div className="flex flex-col gap-12 pt-12">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl text-solar-text-primary tracking-widest font-black uppercase">DIRECT CHANNELS.</h3>
              <div className="grid gap-6">
                {[
                  { icon: Mail, label: "B2B EMAIL", val: "B2B@SOLARIS-LUX.COM" },
                  { icon: Building, label: "GLOBAL HQ", val: "CASABLANCA // ANFA PLACE" },
                  { icon: Globe, label: "LOGISTICS", val: "EU / MENA / NA" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 border border-solar-glass-border rounded-2xl bg-solar-bg-secondary/30">
                    <div className="p-3 bg-solar-accent-sun/10 rounded-lg">
                      <item.icon size={20} className="text-solar-accent-sun" />
                    </div>
                    <div>
                      <div className="subtitle-silk !text-solar-text-muted !text-[8px] mb-1">{item.label}</div>
                      <div className="font-sans text-[11px] font-black tracking-widest text-solar-text-primary">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 border border-solar-accent-sun/20 rounded-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-solar-accent-sun/5 opacity-0 group-hover:opacity-100 transition-all" />
               <h4 className="font-heading text-xl text-solar-accent-sun mb-6 tracking-widest font-black uppercase italic">TITANIUM PARTNERSHIPS.</h4>
               <p className="text-solar-text-muted font-sans text-xs leading-relaxed italic">
                 Solaris Lux collabore avec les leaders de l'hôtellerie de luxe, les cabinets d'architecture technique et les distributeurs exclusifs du monde entier.
               </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 flex justify-center border-t border-solar-glass-border opacity-20">
         <span className="subtitle-silk !text-solar-text-muted !text-[10px] !tracking-[1em]">SOLARIS LUX // B2B // 2.8.Q1</span>
      </div>
    </div>
  );
}
