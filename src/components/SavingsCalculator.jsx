"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Leaf, Clock, TrendingDown } from 'lucide-react';

export default function SavingsCalculator() {
  const [devices, setDevices] = useState(2);
  const [outdoorHours, setOutdoorHours] = useState(4);

  const savings = useMemo(() => {
    // Arbitrary but realistic-looking calculations for a marketing site
    const dailyKwh = (devices * 0.05); // 50Wh per device
    const solarGain = (outdoorHours * 0.015); // 15W panel
    const actualSavings = solarGain > dailyKwh ? dailyKwh : solarGain;
    
    const yearlySavingsDh = (actualSavings * 365 * 1.5).toFixed(0); // 1.5 DH per kWh (high end for effect)
    const yearlyCo2 = (actualSavings * 365 * 0.5).toFixed(1); // 0.5kg CO2 per kWh
    
    return { money: yearlySavingsDh, co2: yearlyCo2, autonomous: (solarGain / dailyKwh * 100).toFixed(0) };
  }, [devices, outdoorHours]);

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="container-solar">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Controls */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[1px] bg-accent-primary" />
                <span className="font-mono text-[10px] font-black tracking-[0.4em] text-accent-primary uppercase">
                  SIMULATEUR D'IMPACT
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-primary-text uppercase tracking-tighter leading-[0.9] mb-8">
                MESUREZ VOTRE <br /> <span className="text-accent-primary italic">LIBERTÉ.</span>
              </h2>
              <p className="text-xl text-secondary-text max-w-lg">
                Découvrez comment Solaris Lux redéfinit votre consommation énergétique quotidienne tout en préservant la planète.
              </p>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="font-mono text-[11px] font-black tracking-widest text-primary-text uppercase">Appareils à charger / jour</label>
                  <span className="text-3xl font-black text-accent-primary">{devices}</span>
                </div>
                <input 
                  type="range" min="1" max="5" value={devices} 
                  onChange={(e) => setDevices(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-accent-primary transition-all"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="font-mono text-[11px] font-black tracking-widest text-primary-text uppercase">Exposition solaire (Heures)</label>
                  <span className="text-3xl font-black text-accent-primary">{outdoorHours}h</span>
                </div>
                <input 
                  type="range" min="0" max="12" value={outdoorHours} 
                  onChange={(e) => setOutdoorHours(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-accent-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard 
              icon={<TrendingDown className="text-accent-primary" />}
              label="Économie Annuelle"
              value={`${savings.money} DH`}
              description="Basé sur les tarifs énergétiques premium."
              delay={0.1}
            />
            <ResultCard 
              icon={<Leaf className="text-emerald-500" />}
              label="Réduction CO2"
              value={`${savings.co2} KG`}
              description="L'équivalent de 5 arbres plantés par an."
              delay={0.2}
            />
            <ResultCard 
              icon={<Zap className="text-blue-500" />}
              label="Autonomie Solaire"
              value={`${savings.autonomous}%`}
              description="Part de votre recharge couverte par le soleil."
              delay={0.3}
            />
            <ResultCard 
              icon={<Clock className="text-purple-500" />}
              label="Indépendance"
              value="TOTALE"
              description="Libérez-vous des prises murales conventionnelles."
              delay={0.4}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function ResultCard({ icon, label, value, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 glass-card-light dark:bg-white/5 border border-white/20 flex flex-col gap-6 group hover:border-accent-primary/30 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <span className="font-mono text-[9px] font-black tracking-[0.2em] text-secondary-text uppercase mb-2 block">
          {label}
        </span>
        <div className="text-4xl font-black text-primary-text uppercase tracking-tighter mb-2">
          {value}
        </div>
        <p className="text-sm text-secondary-text leading-tight">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
