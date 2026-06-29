"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, Battery, Zap } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: "Bloc A - Hall Principal",
    status: "disponible",
    type: "Kiosque Solaire",
    slots: "12 disponibles",
    coords: { x: "25%", y: "40%" }
  },
  {
    id: 2,
    name: "Bibliothèque",
    status: "disponible",
    type: "Zone de Recharge Qi2",
    slots: "4 disponibles",
    coords: { x: "60%", y: "30%" }
  },
  {
    id: 3,
    name: "Cafétéria",
    status: "occupé",
    type: "Kiosque Solaire",
    slots: "0 disponibles",
    coords: { x: "45%", y: "70%" }
  },
  {
    id: 4,
    name: "Atelier Mécanique",
    status: "disponible",
    type: "Station de Charge Rapide",
    slots: "8 disponibles",
    coords: { x: "80%", y: "60%" }
  }
];

export default function CampusMap() {
  const [selected, setSelected] = useState(locations[0]);

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="container-solar">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Text Content */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[1px] bg-accent-primary" />
                <span className="font-mono text-[10px] font-black tracking-[0.4em] text-accent-primary uppercase">
                  KIOSQUES LOCATIONS
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-primary-text uppercase tracking-tighter leading-[0.9] mb-8">
                TROUVEZ VOTRE <br /> <span className="text-secondary-text opacity-40 italic">SOLAR STATION.</span>
              </h2>
              <p className="text-lg text-secondary-text">
                Un réseau de recharge intelligent déployé sur tout le campus de l'ISTA Témara. Louez une Solaris Lux et restez connecté où que vous soyez.
              </p>
            </div>

            <div className="space-y-4">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelected(loc)}
                  className={`w-full p-6 text-left rounded-3xl transition-all duration-500 flex items-center justify-between border ${
                    selected.id === loc.id 
                    ? 'bg-primary-text text-white border-primary-text shadow-2xl' 
                    : 'bg-white/5 border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${selected.id === loc.id ? 'bg-accent-primary' : 'bg-black/5 dark:bg-white/5'}`}>
                      <MapPin size={18} className={selected.id === loc.id ? 'text-black' : 'text-accent-primary'} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest">{loc.name}</h4>
                      <p className={`text-[10px] uppercase font-bold tracking-widest ${selected.id === loc.id ? 'text-white/60' : 'text-secondary-text'}`}>
                        {loc.type}
                      </p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${loc.status === 'disponible' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Map (Simplified/Stylized) */}
          <div className="lg:col-span-8 relative aspect-video bg-black/5 dark:bg-white/5 rounded-[4rem] border border-black/[0.05] dark:border-white/[0.05] overflow-hidden group">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Map Accents */}
            <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-accent-primary/[0.05] blur-3xl rounded-full" />
            <div className="absolute bottom-[30%] left-[20%] w-48 h-48 bg-navy-deep/[0.05] blur-3xl rounded-full" />

            {/* Pins */}
            {locations.map((loc) => (
              <motion.button
                key={loc.id}
                onClick={() => setSelected(loc)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: loc.id * 0.1, type: "spring" }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ top: loc.coords.y, left: loc.coords.x }}
              >
                <div className={`relative p-3 rounded-full transition-all duration-500 ${selected.id === loc.id ? 'bg-accent-primary scale-125' : 'bg-primary-text'}`}>
                  <div className="absolute inset-[-4px] border border-white/20 rounded-full animate-ping opacity-20" />
                  <MapPin size={16} className={selected.id === loc.id ? 'text-black' : 'text-white'} />
                </div>
              </motion.button>
            ))}

            {/* Selected Location Info Overlay */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-8 right-8 left-8 lg:left-auto lg:w-96 p-8 glass-card-light dark:bg-white/10 border border-white/20 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl z-20"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-primary-text uppercase tracking-tighter mb-1">{selected.name}</h3>
                      <p className="text-[10px] font-black tracking-widest text-accent-primary uppercase">{selected.type}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase ${selected.status === 'disponible' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {selected.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl flex flex-col gap-1">
                      <span className="text-[8px] font-black text-secondary-text uppercase tracking-widest">Capacité</span>
                      <div className="flex items-center gap-2">
                        <Battery size={12} className="text-secondary-text" />
                        <span className="text-lg font-black text-primary-text">{selected.slots}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl flex flex-col gap-1">
                      <span className="text-[8px] font-black text-secondary-text uppercase tracking-widest">Vitesse</span>
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-accent-primary" />
                        <span className="text-lg font-black text-primary-text">15W Qi2</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-4 rounded-2xl bg-primary-text text-white text-[10px] font-black tracking-widest uppercase hover:bg-black/85 transition-all">
                    S'y rendre avec Maps
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
