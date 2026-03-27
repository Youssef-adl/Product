import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
    }, 1500);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-solar-bg-primary transition-colors duration-500 border-t border-solar-glass-border">
      <div className="container-solar relative z-10">
        <div className="glass-solar p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-solar-glass-border shadow-2xl bg-solar-bg-secondary rounded-none">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="subtitle-silk !text-solar-accent-sun mx-auto lg:mx-0 !font-sans !tracking-[0.3em] !text-[10px]">
               Signal // Solaire
            </div>
            <h2 className="title-solar text-4xl lg:text-6xl text-solar-text-primary !font-heading !font-black uppercase tracking-tighter">RESTEZ <em className="text-solar-accent-sun italic">ÉCLAIRÉ</em>.</h2>
            <p className="max-w-md font-sans text-base text-solar-text-muted font-normal leading-relaxed italic opacity-80">
               Inscrivez-vous pour recevoir les protocoles de mise à jour et les alertes de réapprovisionnement de la série <span className="text-solar-accent-sun font-black uppercase tracking-wider">Solaris Lux</span>.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-4"
          >
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-solar-text-muted/40 group-focus-within:text-solar-accent-sun transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VOTRE@EMAIL.PRESTIGE" 
                className="w-full py-6 pl-16 pr-44 bg-solar-bg-primary/40 border border-solar-glass-border/30 focus:border-solar-accent-sun outline-none font-sans text-solar-text-primary transition-all tracking-[0.2em] text-[10px] rounded-none backdrop-blur-md placeholder:text-solar-text-muted/30 uppercase font-black"
                required
              />
              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="absolute right-3 top-1/2 -translate-y-1/2 !px-8 !py-3 !text-[10px] rounded-none bg-solar-accent-sun text-solar-bg-primary font-black tracking-widest uppercase hover:bg-solar-text-primary transition-all duration-500"
              >
                 {status === 'loading' ? (
                   <span className="animate-pulse">CONNEXION...</span>
                 ) : status === 'success' ? (
                   <Check size={18} />
                 ) : (
                   <span className="flex items-center gap-2">
                     S'INCRIRE <Send size={14} />
                   </span>
                 )}
              </button>
            </div>
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-solar-accent-sun text-[11px] tracking-widest uppercase text-center lg:text-left mt-2 font-black"
              >
                Bienvenue dans le cercle Solaris.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
