"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500 font-sans">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container-solar relative z-10 px-6">
        <div className="bg-[var(--bg-secondary)] p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-20 border border-[var(--glass-border)] rounded-[4rem] relative overflow-hidden group shadow-2xl">
          
          {/* Internal Glow Effect */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-accent-primary/10 blur-[120px] pointer-events-none group-hover:bg-accent-primary/20 transition-all duration-1000" />
          
          <div className="flex flex-col gap-8 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="flex items-center gap-6 justify-center lg:justify-start">
               <div className="h-[1px] w-12 bg-accent-secondary/40" />
               <span className="font-heading text-[11px] font-black tracking-[1em] text-accent-secondary uppercase italic pt-1">
                 TRANSMISSION // SOLARIS
               </span>
            </div>
            
            <h2 className="font-heading text-4xl lg:text-6xl text-[var(--text-primary)] font-black uppercase tracking-tighter leading-[0.85]">
              RESTEZ <br/>
              <span className="text-accent-primary">ÉCLAIRÉ.</span>
            </h2>
            
            <p className="font-sans text-xl text-[var(--text-muted)] italic leading-relaxed max-w-xl">
               Rejoignez le cercle restreint pour recevoir les protocoles de mise à jour et les alertes exclusives de la série <span className="text-[var(--text-primary)] font-black uppercase tracking-widest not-italic">Obsidian Lux</span>.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="w-full lg:max-w-md flex flex-col gap-6 relative z-10"
          >
            <div className="relative group/input">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within/input:text-accent-primary transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VOTRE@EMAIL.PRESTIGE" 
                className="w-full py-8 pl-20 pr-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:border-accent-primary/50 outline-none font-sans text-[var(--text-primary)] transition-all tracking-[0.4em] text-[11px] rounded-sm backdrop-blur-3xl placeholder:text-[var(--text-muted)] uppercase font-black"
                required
                disabled={status === 'success'}
              />
            </div>
            
            <button 
              type="submit"
              disabled={status !== 'idle'}
              className={`group relative overflow-hidden py-8 rounded-sm font-black tracking-[0.8em] text-[12px] uppercase transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 font-heading border border-transparent
                ${status === 'success' 
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' 
                  : 'bg-accent-primary text-black hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
               <AnimatePresence mode="wait">
                 {status === 'loading' ? (
                   <motion.span 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="animate-pulse"
                   >
                     CONNEXION...
                   </motion.span>
                 ) : status === 'success' ? (
                   <motion.div 
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-3"
                   >
                     CONFIRMÉ <Check size={18} strokeWidth={4} />
                   </motion.div>
                 ) : (
                   <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4"
                   >
                     DÉCLENCHER <ArrowRight size={18} strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
                   </motion.div>
                 )}
               </AnimatePresence>
            </button>

            <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] text-center lg:text-left font-heading italic">
              Protocole de confidentialité actif // Sécurité Chiffrée.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
