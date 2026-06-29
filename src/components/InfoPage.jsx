"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function InfoPage({ title, subtitle, specCode, sections }) {
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
                {specCode || 'PROTOCOL // SPEC-XX'}
              </span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-[100px] text-solar-text-primary leading-none tracking-tighter uppercase font-black">
              {title}<br />
              <span className="opacity-10">ARCHIVE.</span>
            </h1>
            
            <p className="max-w-2xl text-xl text-slate-300 leading-relaxed font-sans italic">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT LAYOUT */}
      <section className="py-32">
        <div className="container-solar">
          <div className="grid lg:grid-cols-12 gap-20">
            {/* CONTENT COLUMN */}
            <div className="lg:col-span-8 space-y-24">
              {sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-6 mb-8">
                     <span className="font-mono text-xs text-solar-accent-sun opacity-50 font-bold tracking-widest">
                       [0{idx + 1}]
                     </span>
                     <h2 className="font-heading text-3xl text-solar-text-primary tracking-widest font-black uppercase italic group-hover:text-solar-accent-sun transition-colors">
                       {section.title}.
                     </h2>
                  </div>
                  <div className="pl-12 border-l border-solar-glass-border">
                    <p className="text-solar-text-muted text-lg leading-[2] font-sans italic whitespace-pre-line">
                      {section.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SIDEBAR / TELEMETRY */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-40 space-y-12">
                <div className="p-8 bg-solar-bg-secondary border border-solar-glass-border rounded-2xl backdrop-blur-3xl">
                  <div className="subtitle-silk !text-solar-text-muted !text-[9px] mb-6">LINK STATUS</div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                    <span className="font-heading text-xl text-solar-text-primary font-black uppercase tracking-widest">SECURE ACCESS</span>
                  </div>
                </div>

                <div className="p-8 border border-solar-glass-border rounded-2xl opacity-40">
                  <div className="subtitle-silk !text-solar-text-muted !text-[9px] mb-6">CRYPTOGRAPHIC SEAL</div>
                  <div className="font-mono text-[10px] text-solar-text-muted break-all leading-relaxed">
                    SHA256: 8f92b3c...f2e9a1 <br />
                    PROTOCOL: V.2028.1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER WATERMARK */}
      <div className="py-20 flex justify-center border-t border-solar-glass-border opacity-20">
         <span className="subtitle-silk !text-solar-text-muted !text-[10px] !tracking-[1em]">
           SOLARIS LUX // LEGACY PROTOCOL // 2.8.Q1
         </span>
      </div>
    </div>
  );
}
