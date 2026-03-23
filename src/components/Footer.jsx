import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Twitter, Instagram, Sparkles, ArrowUpRight, 
  Shield, Zap, Globe, Mail, Check, ArrowRight, Clock 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const footerLinks = {
    navigation: [
      { name: 'ACCUEIL', path: '/' },
      { name: 'BOUTIQUE', path: '/boutique' },
      { name: 'GALERIE', path: '/#gallery' },
      { name: 'TECHNIQUE', path: '/#features' }
    ],
    protocol: [
      { name: 'CONFIDENTIALITÉ', path: '#' },
      { name: 'TERMES & CONDITIONS', path: '#' },
      { name: 'POLITIQUE COOKIES', path: '#' }
    ],
    support: [
      { name: 'FAQ', path: '/#faq' },
      { name: 'EXPÉDITION', path: '#' },
      { name: 'CONTACT B2B', path: '#' }
    ]
  };

  return (
    <footer className="bg-bg-secondary pt-32 pb-8 relative overflow-hidden border-t border-glass-border transition-colors duration-500">
      
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* CINEMATIC BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden text-center justify-center flex">
        <div className="absolute top-[-20%] w-[80%] h-[50%] bg-accent-sun/5 blur-[120px] rounded-full opacity-20 transition-colors duration-1000" />
      </div>

      <div className="container-solar relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Link to="/" className="title-solar text-5xl md:text-6xl text-text-primary hover:text-accent-sun transition-colors inline-block group">
                SOLARIS<span className="text-accent-sun group-hover:text-coral transition-colors">.</span>
              </Link>
              <p className="max-w-sm font-sans text-[10px] font-bold uppercase tracking-[0.45em] leading-[2] text-text-muted italic opacity-60">
                 L'excellence de la charge magnétique. <br/>
                 Inspiré par la lumière, forgé pour l'élite.
              </p>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-8 mt-2">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -4, color: 'var(--color-accent-sun)', scale: 1.15 }}
                  className="text-text-muted hover:text-text-primary transition-all p-2 bg-text-primary/[0.02] rounded-full border border-glass-border shadow-sm hover:shadow-accent-sun/20"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-12 pt-2">
            {Object.entries(footerLinks).map(([category, links], i) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex flex-col gap-6"
              >
                <h4 className="font-sans text-[10px] font-black text-text-muted/50 tracking-[0.3em] flex items-center gap-3 uppercase">
                   <span className="w-4 h-[1px] bg-text-muted/30" />
                   {category}
                </h4>
                <div className="flex flex-col gap-4">
                  {links.map((link, j) => (
                    <Link 
                      key={j} 
                      to={link.path} 
                      className="font-sans text-[11px] font-bold tracking-[0.2em] text-text-secondary hover:text-text-primary hover:translate-x-1.5 transition-transform duration-300 flex items-center whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION - NEWSLETTER (FULL WIDTH) */}
        <div className="pb-16 border-b border-glass-border/50 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-3 group">
            <h3 className="font-sans text-[14px] font-black tracking-[0.3em] text-text-primary uppercase">Mailing List Privée</h3>
            <div className="font-sans text-[9px] font-bold text-text-muted tracking-[0.2em] uppercase">Private Access // Solaris Privé</div>
          </div>
          
          <form onSubmit={handleSubscribe} className="relative w-full md:w-[400px]">
            <div className={`flex items-center bg-bg-primary backdrop-blur-3xl border border-glass-border transition-all duration-700 p-1.5 rounded-2xl focus-within:border-accent-sun/30 focus-within:shadow-[0_0_20px_rgba(255,200,100,0.05)] ${subscribed ? 'bg-emerald-500/10 border-emerald-500/30' : ''}`}>
              <div className="px-4 text-text-muted">
                <Mail size={16} className={subscribed ? 'text-emerald-500' : 'group-focus-within:text-accent-sun transition-colors'} />
              </div>
              <input 
                type="email" 
                placeholder="VOTRE EMAIL"
                className="bg-transparent border-none outline-none font-sans text-[10px] tracking-[0.25em] text-text-primary flex-grow uppercase font-bold placeholder:text-text-muted/30 h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
              />
              <button 
                type="submit"
                className={`w-12 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0
                  ${subscribed ? 'bg-emerald-500 text-white' : 'bg-text-primary/[0.04] hover:bg-accent-sun hover:text-bg-primary text-text-primary shadow-xl'}
                `}
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
            <AnimatePresence>
              {subscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-[-24px] right-0 text-[9px] font-black tracking-widest text-emerald-500 uppercase"
                >
                  Accès privé confirmé.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-14">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[8px] font-black tracking-[0.5em] text-text-primary uppercase leading-none opacity-80">
                EST. {currentYear} // MANUFACTURE CÉLESTE
              </span>
              <div className="flex items-center gap-3 text-text-muted leading-none">
                <Clock size={10} className="opacity-50" />
                <span className="text-[9px] font-bold tracking-[0.2em] font-sans flex items-center h-3">
                  {formatTime(time)} <span className="opacity-30 ml-2 uppercase">MAROC</span>
                </span>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-glass-border opacity-30" />
            <div className="flex flex-col gap-3 uppercase">
              <span className="font-sans text-[8px] font-black tracking-[0.5em] text-text-primary leading-none opacity-80">
                 CONCEPTION LUXE
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-text-muted font-sans h-3 flex items-center">Design ISTA</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-8 md:gap-10">
            {/* LIVE STATUS CRYSTAL */}
            <div className="flex items-center gap-3 bg-text-primary/[0.01] px-5 py-2.5 rounded-xl border border-glass-border">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="font-sans text-[8px] font-black tracking-[0.4em] text-emerald-500/60 uppercase">
                SYSTÈMES 100% ONLINE
              </span>
            </div>
            
            <motion.button 
              whileHover={{ y: -3, backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-glass-border)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 hidden md:flex items-center justify-center rounded-xl bg-text-primary/[0.02] border border-glass-border text-text-primary transition-all group"
            >
              <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* WATERMARK SOLARIS */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.015 }}
        transition={{ duration: 3 }}
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 font-serif text-[22vw] text-text-primary pointer-events-none select-none whitespace-nowrap italic tracking-tighter"
      >
         SOLARIS
      </motion.div>
    </footer>
  );
}
