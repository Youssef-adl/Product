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
    return date.toLocaleTimeString('en-US', { 
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
      { name: 'HOME', path: '/' },
      { name: 'STORE', path: '/boutique' },
      { name: 'GALLERY', path: '/#gallery' },
      { name: 'ENGINEERING', path: '/#features' }
    ],
    protocol: [
      { name: 'PRIVACY', path: '#' },
      { name: 'TERMS & CONDITIONS', path: '#' },
      { name: 'COOKIE POLICY', path: '#' }
    ],
    support: [
      { name: 'SUPPORT', path: '/#faq' },
      { name: 'SHIPPING', path: '#' },
      { name: 'RETURNS & REFUNDS', path: '/#faq' },
      { name: 'B2B CONTACT', path: '#' }
    ]
  };

  return (
    <footer className="bg-solar-bg-primary pt-32 pb-8 relative overflow-hidden border-t border-solar-glass-border transition-colors duration-500">
      
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('/noise.svg')]" />

      {/* CINEMATIC BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden text-center justify-center flex">
        <div className="absolute top-[-20%] w-[80%] h-[50%] bg-solar-accent-sun/5 blur-[120px] rounded-full opacity-20 transition-colors " />
      </div>

      <div className="container-solar relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Link to="/" className="title-solar text-5xl md:text-6xl text-solar-text-primary hover:text-solar-accent-sun transition-colors inline-block group">
                SOLARIS<span className="text-solar-accent-sun group-hover:text-solar-accent-sun transition-colors">.</span>
              </Link>
              <p className="max-w-sm font-sans text-[10px] font-black uppercase tracking-[0.45em] leading-[2] text-solar-text-muted italic opacity-60">
                 The pinnacle of magnetic charging. <br/>
                 Inspired by light, forged for the elite.
              </p>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-8 mt-2">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -4, color: 'var(--solar-accent-sun)', scale: 1.15 }}
                  className="text-solar-text-muted hover:text-solar-text-primary transition-all p-2 bg-solar-bg-secondary rounded-full border border-solar-glass-border shadow-sm hover:shadow-solar-accent-sun/20"
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
                <h4 className="font-sans text-[10px] font-black text-solar-text-muted/50 tracking-[0.3em] flex items-center gap-3 uppercase">
                   <span className="w-4 h-[1px] bg-solar-text-muted/30" />
                   {category}
                </h4>
                <div className="flex flex-col gap-4">
                  {links.map((link, j) => {
                    const isAnchor = link.path.includes('#') && link.path.startsWith('/#');
                    const targetId = isAnchor ? link.path.split('#')[1] : null;
                    return (
                      <Link 
                        key={j} 
                        to={link.path} 
                        onClick={(e) => {
                          if (targetId && window.location.pathname === '/') {
                            e.preventDefault();
                            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                          } else if (link.path === '/') {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                          }
                        }}
                        className="font-sans text-[11px] font-black tracking-[0.2em] text-solar-text-secondary hover:text-solar-text-primary hover:translate-x-1.5 transition-transform duration-300 flex items-center whitespace-nowrap"
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION - NEWSLETTER (FULL WIDTH) */}
        <div className="pb-16 border-b border-glass-border/50 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-3 group">
            <h3 className="font-heading text-[14px] font-black tracking-[0.3em] text-solar-text-primary uppercase">Private Mailing List</h3>
            <div className="font-mono text-[9px] font-bold text-solar-text-muted tracking-[0.2em] uppercase">Private Access // Solaris Insider</div>
          </div>
          
          <form onSubmit={handleSubscribe} className="relative w-full md:w-[400px]">
             <div className={`flex items-center bg-solar-bg-secondary backdrop-blur-3xl border border-solar-glass-border transition-all p-1.5 rounded-none focus-within:border-solar-accent-sun/30 focus-within:shadow-[0_0_20px_rgba(255,100,20,0.05)] ${subscribed ? 'bg-emerald-500/10 border-emerald-500/30' : ''}`}>
               <div className="px-4 text-solar-text-muted">
                 <Mail size={16} className={subscribed ? 'text-emerald-500' : 'group-focus-within:text-solar-accent-sun transition-colors'} />
               </div>
              <input 
                type="email" 
                placeholder="YOUR EMAIL"
                className="bg-transparent border-none outline-none font-sans text-[10px] tracking-[0.25em] text-solar-text-primary flex-grow uppercase font-black placeholder:text-solar-text-muted/30 h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
              />
              <button 
                type="submit"
                className={`w-12 h-10 rounded-none flex items-center justify-center transition-all duration-500 shrink-0
                  ${subscribed ? 'bg-emerald-500 text-solar-bg-primary' : 'bg-solar-text-primary/[0.04] hover:bg-solar-accent-sun hover:text-solar-bg-primary text-solar-text-primary shadow-2xl'}
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
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-14">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[8px] font-black tracking-[0.5em] text-solar-text-primary uppercase leading-none opacity-80">
                EST. {currentYear} // CELESTIAL MANUFACTURE
              </span>
              <div className="flex items-center gap-3 text-solar-text-muted leading-none">
                <Clock size={10} className="opacity-50" />
                <span className="text-[9px] font-bold tracking-[0.2em] font-mono flex items-center h-3">
                   {formatTime(time)} <span className="opacity-30 ml-2 uppercase">MOROCCO</span>
                </span>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-solar-glass-border opacity-30" />
            <div className="flex flex-col gap-3 uppercase">
              <span className="font-sans text-[8px] font-black tracking-[0.5em] text-solar-text-primary leading-none opacity-80">
                 LUXURY CONCEPTION
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-solar-text-muted font-mono h-3 flex items-center">Design ISTA</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-8 md:gap-10">
            {/* LIVE STATUS CRYSTAL */}
            <div className="flex items-center gap-3 bg-text-primary/[0.01] px-5 py-2.5 rounded-xl border border-glass-border">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="font-sans text-[8px] font-black tracking-[0.4em] text-emerald-500/60 uppercase">
                SYSTEMS 100% ONLINE
              </span>
            </div>
            
            <motion.button 
              whileHover={{ y: -3, backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-glass-border)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 hidden md:flex items-center justify-center rounded-xl bg-solar-bg-secondary border border-glass-border text-solar-text-primary transition-all group"
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
