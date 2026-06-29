"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Twitter, Instagram, Sparkles, ArrowUpRight, 
  Shield, Zap, Globe, Mail, Check, ArrowRight, Clock 
} from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function Footer() {
  const { playSound } = useSoundEffects();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const footerLinks = {
    navigation: [
      { name: 'ACCUEIL', path: '/' },
      { name: 'BOUTIQUE', path: '/boutique' },
      { name: 'GALERIE', path: '/gallery' },
      { name: 'INGÉNIERIE', path: '/technique' }
    ],
    protocole: [
      { name: 'CONFIDENTIALITÉ', path: '/privacy' },
      { name: 'CONDITIONS', path: '/terms' },
      { name: 'COOKIES', path: '/cookies' }
    ],
    support: [
      { name: 'AIDE', path: '/support' },
      { name: 'LIVRAISON', path: '/shipping' },
      { name: 'RETOURS', path: '/returns' },
      { name: 'CONTACT B2B', path: '/b2b-contact' }
    ]
  };

  return (
    <footer className="bg-[var(--bg-primary)] pt-32 pb-8 relative overflow-hidden border-t border-[var(--glass-border)] transition-colors duration-500 font-sans">
      
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('/noise.svg')]" />

      {/* CINEMATIC BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden text-center justify-center flex">
        <div className="absolute top-[-20%] w-[80%] h-[50%] bg-accent-primary/5 blur-[120px] rounded-full opacity-20 transition-colors" />
      </div>

      <div className="container-solar relative z-10 px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Link href="/" className="font-heading text-5xl md:text-6xl text-[var(--text-primary)] hover:text-accent-primary transition-colors inline-block group uppercase font-black">
                SOLARIS<span className="text-accent-primary group-hover:text-[var(--text-primary)] transition-colors">.</span>
              </Link>
              <p className="max-w-sm font-sans text-[10px] font-black uppercase tracking-[0.45em] leading-[2] text-[var(--text-muted)] italic opacity-60">
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
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                  whileHover={{ y: -4, color: 'var(--accent-primary)', scale: 1.15 }}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all p-3 bg-[var(--glass-bg)] rounded-full border border-[var(--glass-border)] shadow-sm hover:shadow-accent-primary/20"
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
                <h4 className="font-heading text-[10px] font-black text-accent-secondary tracking-[0.3em] flex items-center gap-3 uppercase pt-1">
                   <span className="w-4 h-[1px] bg-accent-secondary/30" />
                   {category}
                </h4>
                <div className="flex flex-col gap-4">
                  {links.map((link, j) => {
                    return (
                      <Link 
                        key={j} 
                        href={link.path} 
                        className="font-sans text-[11px] font-black tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:translate-x-1.5 transition-transform duration-300 flex items-center whitespace-nowrap uppercase"
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

        {/* BOTTOM SECTION */}
        <div className="pt-24 pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-14">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-[8px] font-black tracking-[0.5em] text-[var(--text-primary)] uppercase leading-none opacity-80">
                EST. {currentYear} // ISTA TÉMARA
              </span>
              <div className="flex items-center gap-3 text-[var(--text-muted)] leading-none">
                <Clock size={10} className="opacity-50" />
                <span className="text-[9px] font-bold tracking-[0.2em] font-mono flex items-center h-3" suppressHydrationWarning>
                   {formatTime(time)} <span className="opacity-30 ml-2 uppercase">MOROCCO</span>
                 </span>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-[var(--glass-border)]" />
            <div className="flex flex-col gap-3 uppercase">
              <span className="font-heading text-[8px] font-black tracking-[0.5em] text-[var(--text-primary)] leading-none opacity-80">
                 CONCEPTION DE LUXE
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--text-muted)] font-mono h-3 flex items-center">Design ISTA</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-8 md:gap-10">
            {/* LIVE STATUS CRYSTAL - FIXED COLORS */}
            <div className="flex items-center gap-3 bg-[var(--glass-bg)] px-5 py-2.5 rounded-xl border border-[var(--glass-border)]">
              <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
              <span className="font-heading text-[8px] font-black tracking-[0.4em] text-accent-primary uppercase pt-0.5">
                SYSTÈMES 100% EN LIGNE
              </span>
            </div>
            
            <motion.button 
              whileHover={{ y: -3, backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 hidden md:flex items-center justify-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] transition-all group"
            >
              <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* WATERMARK SOLARIS */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        transition={{ duration: 3 }}
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 font-heading text-[22vw] text-[var(--text-primary)] pointer-events-none select-none whitespace-nowrap italic tracking-tighter"
      >
         SOLARIS
      </motion.div>
    </footer>
  );
}
