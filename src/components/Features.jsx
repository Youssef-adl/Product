import React from 'react';
import { Zap, Shield, Target, Smartphone, Wind, Maximize } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      icon: <Zap size={32} />, 
      title: "CHARGE TURBO 15W", 
      desc: "Optimisé pour le circuit digital. Vitesse maximale sans compromis." 
    },
    { 
      icon: <Shield size={32} />, 
      title: "DISSIPATION IONIQUE", 
      desc: "Gestion thermique active issue de l'ingénierie aérospatiale." 
    },
    { 
      icon: <Target size={32} />, 
      title: "ALIGNEMENT N52", 
      desc: "Aimants haute force pour une connexion instantanée à 300km/h." 
    },
    { 
      icon: <Wind size={32} />, 
      title: "SLICK DESIGN", 
      desc: "Seulement 15mm. Un profil aérodynamique pour votre setup." 
    },
    { 
      icon: <Smartphone size={32} />, 
      title: "PROTOCOLE UNIFIÉ", 
      desc: "Compatibilité totale avec l'écosystème MagSafe Certifié." 
    },
    { 
      icon: <Maximize size={32} />, 
      title: "CNC ALUMINIUM", 
      desc: "Usiné dans un bloc de 7075-T6 pour une rigidité extrême." 
    }
  ];

  return (
    <section id="features" className="section bg-[#F5F5F5] py-40 border-y-[6px] border-[var(--color-racing-yellow)]">
      <div className="container">
        <div className="col-span-12 flex flex-col gap-8 mb-24 items-center text-center">
           <div className="flex items-center gap-4">
              <span className="h-0.5 w-12 bg-black" />
              <span className="title-tech text-black text-xl tracking-[0.3em]">ACCÉLÉRATION TECHNIQUE</span>
              <span className="h-0.5 w-12 bg-black" />
           </div>
           <h2 className="headline-editorial text-7xl lg:text-[120px] text-black">
              L'ADN DE LA<br />
              <span className="text-[var(--color-racing-yellow)]" style={{ WebkitTextStroke: '2px black' }}>PERFORMANCE.</span>
           </h2>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group p-12 bg-white border-2 border-transparent hover:border-[var(--color-racing-yellow)] transition-all duration-500 cursor-default relative shadow-sm hover:shadow-2xl hover:-translate-y-4"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--color-racing-yellow)] p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Zap size={24} className="text-black" />
              </div>
              <div className="text-black mb-8 group-hover:text-[var(--color-racing-yellow)] transition-colors">
                {f.icon}
              </div>
              <h3 className="title-tech text-2xl text-black mb-4 tracking-widest">{f.title}</h3>
              <p className="text-[var(--color-industrial-grey)] font-medium leading-relaxed uppercase text-xs tracking-widest">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
