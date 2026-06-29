"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Target, Battery, Play } from 'lucide-react';
import { products } from '../data/products';
import DataRain from './DataRain';
import { useSoundEffects } from '../hooks/useSoundEffects';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const CardSpotify = ({ title, subtitle, icon, id, isImage, imageSrc, setHoveredCard, onClick, playSound, className = "", iconColorClass = "text-[var(--text-muted)] group-hover:text-accent-secondary", iconBgClass = "bg-[var(--accent-primary)]/[0.02] group-hover:bg-accent-primary/5" }) => (
  <motion.div 
    variants={itemVariants}
    className={`glass-obsidian p-6 rounded-[2rem] transition-all duration-[600ms] ease-[var(--ease-out-expo)] cursor-pointer relative group flex flex-col h-full border border-accent-primary/10 hover:border-accent-secondary/40 active:scale-[0.98] ${className}`}
    onMouseEnter={() => {
      setHoveredCard(id);
      playSound?.('hoverHeavy');
    }}
    onMouseLeave={() => setHoveredCard(null)}
    onClick={() => {
      playSound?.('click');
      onClick();
    }}
    style={{ backgroundColor: 'var(--glass-bg)' }}
  >
    <div className={`relative w-full aspect-square ${iconBgClass} rounded-3xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] mb-8 overflow-hidden flex items-center justify-center border border-[var(--glass-border)] transition-all duration-700`}>
      {isImage ? (
        <img src={imageSrc} alt={title} loading="lazy" decoding="async" className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-[800ms] ease-[var(--ease-out-expo)] filter brightness-110 contrast-110" />
      ) : (
        <div className={`${iconColorClass} transition-all duration-[600ms] ease-[var(--ease-out-expo)] scale-110 group-hover:scale-125`}>
           {icon}
        </div>
      )}
      
      <div 
        className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10"
        onClick={(e) => {
          e.stopPropagation();
          playSound?.('action');
          onClick?.();
        }}
      >
         <div className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(136,8,8,0.6)] hover:scale-110 active:scale-95 transition-transform duration-300 ease-[var(--ease-out-expo)]">
           <Play fill="black" size={28} className="text-black ml-1" strokeWidth={0}/>
         </div>
      </div>
    </div>
    
    <div className="flex flex-col flex-1 px-2">
      <h4 className="font-heading font-black text-[var(--text-primary)] text-xl uppercase tracking-tighter truncate mb-2">{title}</h4>
      <p className="font-sans font-medium text-[var(--text-muted)] text-[11px] uppercase tracking-[0.3em] line-clamp-2 leading-relaxed italic">
        {subtitle}
      </p>
    </div>
  </motion.div>
);

export default function BentoShowcase({ addToCart }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const { playSound } = useSoundEffects();
  
  const mainProduct = products.find(p => p.id === 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const handleAction = (id) => {
    if (id === 'cover') {
      router.push(`/product/${mainProduct.id}`);
    } else {
      addToCart(mainProduct);
    }
  };

  return (
    <section id="bento-dashboard" className="relative py-32 lg:py-48 z-10 font-sans overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <DataRain />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/[0.02] blur-[200px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <motion.div 
          className="flex flex-col items-center text-center mb-[var(--space-3xl)] gap-[var(--space-lg)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-6">
             <div className="h-[1px] w-12 bg-accent-secondary/40" />
             <span className="text-[11px] font-black uppercase tracking-[1em] text-accent-secondary font-heading pt-1">
               PROTOCOL_DISPLAY
             </span>
             <div className="h-[1px] w-12 bg-accent-secondary/40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-[var(--text-primary)] uppercase tracking-[-0.04em]">
            Écosystème <span className="text-accent-primary">Solaris Lux</span>
          </h2>
          <p className="font-sans text-xl text-[var(--text-muted)] italic max-w-2xl">
            Ingénierie de pointe pour une indépendance énergétique absolue et une mobilité trans-temporelle.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-lg)] lg:gap-[var(--space-xl)] auto-rows-fr lg:auto-rows-[320px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CardSpotify 
            className="md:col-span-2 md:row-span-2"
            id="cover"
            isImage={true}
            imageSrc={mainProduct?.image_url}
            title={mainProduct?.name}
            subtitle="Système de Charge Solaire Intégré"
            setHoveredCard={setHoveredCard}
            onClick={() => handleAction('cover')}
            playSound={playSound}
          />
          <CardSpotify 
            id="battery"
            icon={<Battery size={64} strokeWidth={1} />}
            title="Cellules Ioniques 10k"
            subtitle="Capacité décuplée pour vos expéditions les plus exigeantes."
            setHoveredCard={setHoveredCard}
            onClick={() => handleAction('battery')}
            playSound={playSound}
            iconColorClass="text-emerald-500/40 group-hover:text-emerald-400"
            iconBgClass="bg-emerald-500/[0.03] group-hover:bg-emerald-500/10"
          />
          <CardSpotify 
            id="speed"
            icon={<Zap size={64} strokeWidth={1} />}
            title="Protocole HyperFlux"
            subtitle="Vitesse de transfert optimisée : 50% de charge en 30 min."
            setHoveredCard={setHoveredCard}
            onClick={() => handleAction('speed')}
            playSound={playSound}
            iconColorClass="text-accent-secondary/40 group-hover:text-accent-secondary"
            iconBgClass="bg-accent-secondary/[0.03] group-hover:bg-accent-secondary/10"
            className="md:col-span-2"
          />
          <CardSpotify 
            id="solar"
            icon={<Sun size={64} strokeWidth={1} />}
            title="Captation Photonique"
            subtitle="Conversion haute efficacité pour une autonomie infinie."
            setHoveredCard={setHoveredCard}
            onClick={() => handleAction('solar')}
            playSound={playSound}
            iconColorClass="text-amber-500/40 group-hover:text-amber-400"
            iconBgClass="bg-amber-500/[0.03] group-hover:bg-amber-500/10"
          />
          <CardSpotify 
            id="qi"
            icon={<Target size={64} strokeWidth={1} />}
            title="Transmission Sans-Fil"
            subtitle="Liberté totale : connectivité Qi universelle instantanée."
            setHoveredCard={setHoveredCard}
            onClick={() => handleAction('qi')}
            playSound={playSound}
            iconColorClass="text-accent-primary/40 group-hover:text-accent-primary"
            iconBgClass="bg-accent-primary/[0.03] group-hover:bg-accent-primary/10"
          />
        </motion.div>

        <motion.div 
          className="w-full mt-32 bg-gradient-to-br from-[var(--surface)] to-[var(--bg-primary)] rounded-[4rem] p-16 md:p-24 relative overflow-hidden group cursor-pointer border border-accent-primary/20 shadow-2xl shadow-black/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => playSound('hoverHeavy')}
        >
          <div className="absolute top-0 right-0 w-[50%] h-full bg-accent-primary/5 blur-[150px] pointer-events-none group-hover:bg-accent-primary/10 transition-all duration-1000" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[60%] h-full bg-accent-secondary/[0.02] blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <span className="inline-block px-8 py-3 border border-accent-primary/40 text-accent-primary text-[11px] font-black uppercase tracking-[0.6em] rounded-full italic bg-[var(--glass-bg)] backdrop-blur-sm font-heading">
                  OFFRE ÉTUDIANTE
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-heading font-black text-[var(--text-primary)] leading-[0.85] uppercase tracking-[-0.04em]">
                L'Innovation <br /> <span className="text-accent-secondary">Enfin Accessible.</span>
              </h3>
              <p className="font-sans font-medium text-[var(--text-muted)] text-xl md:text-2xl max-w-2xl italic leading-relaxed">
                Le SmartCharge V1 est conçu pour répondre aux besoins réels. Profitez de l'offre exclusive réservée aux étudiants de l'ISTA Témara.
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-10 min-w-[350px]">
              <div className="text-center lg:text-right">
                <span className="text-lg font-black text-[var(--text-muted)] line-through tracking-[0.5em] font-heading">499 DH</span>
                <div className="font-heading font-black text-6xl md:text-[80px] text-[var(--text-primary)] leading-none tracking-tighter mt-4">
                  249<span className="text-3xl text-accent-primary">.DH</span>
                </div>
              </div>
              <button 
                onClick={() => playSound('action')}
                className="px-20 py-10 bg-transparent border border-accent-primary/40 text-[var(--text-primary)] font-black rounded-sm hover:bg-accent-primary hover:text-black hover:scale-[1.02] active:scale-95 transition-all duration-500 ease-[var(--ease-out-expo)] w-full lg:w-auto uppercase tracking-[0.8em] text-[12px] font-heading shadow-[0_0_40px_rgba(136,8,8,0.1)]">
                COMMANDER
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
