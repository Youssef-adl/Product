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
    <section className="relative py-24 overflow-hidden bg-bg-primary transition-colors duration-500 border-t border-glass-border/10">
      <div className="container-solar relative z-10">
        <div className="glass-solar p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-glass-border/20 shadow-2xl">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="subtitle-silk text-coral mx-auto lg:mx-0">
               Signal // Solaire
            </div>
            <h2 className="title-solar text-4xl lg:text-6xl">RESTEZ <em className="text-gradient-sun">ÉCLAIRÉ</em>.</h2>
            <p className="max-w-md font-sans text-base text-text-secondary font-light leading-relaxed italic">
               Inscrivez-vous pour recevoir les protocoles de mise à jour et les alertes de réapprovisionnement de la série <span className="text-coral font-semibold">Solaris Lux</span>.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-4"
          >
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-coral transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VOTRE@EMAIL.PRESTIGE" 
                className="w-full py-6 pl-16 pr-44 bg-bg-secondary border border-glass-border/20 focus:border-coral outline-none font-sans text-text-primary transition-all tracking-wide text-sm rounded-xl backdrop-blur-md placeholder:text-text-muted"
                required
              />
              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn-sun !px-8 !py-3 !text-xs !rounded-lg"
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
                className="font-sans text-coral-deep text-[11px] tracking-widest uppercase text-center lg:text-left mt-2 font-semibold"
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
