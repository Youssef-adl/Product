import React, { useState } from 'react';
import { Plus, Minus, Circle } from 'lucide-react';

const FAQS = [
  { q: "EST-IL RÉELLEMENT FAIT EN TITANE ?", a: "Oui. Le châssis est usiné dans un bloc de Titane G5, garantissant une rigidité absolue et une signature thermique unique." },
  { q: "QUELLE EST LA VITESSE DE CHARGE ?", a: "Nous délivrons 15W constants via le protocole Stasis, optimisé pour préserver la santé de votre batterie sur le long terme." },
  { q: "COMPATIBILITÉ MAGSAFE ?", a: "Totalement compatible avec tous les iPhones de la série 12 à 17, ainsi qu'avec les accessoires standard Qi." },
  { q: "COMMENT FONCTIONNE L'IONIC COOL ?", a: "Un micro-générateur d'ions négatifs dissipe la chaleur avant même qu'elle n'atteigne les composants sensibles." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#FDF8F3]">
      {/* Éléments décoratifs solaires */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-sun/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral-soft/5 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4" />

      <div className="container-solar relative z-10 lg:flex gap-20">
        <div className="lg:w-1/3 flex flex-col gap-10 mb-16 lg:mb-0">
           <div className="subtitle-silk text-coral-deep">
              Archive // Q&A
           </div>
           <h2 className="title-solar text-6xl lg:text-7xl">
              PROTOCOLE<br/>
              <em className="text-gradient-sun">SOLAIRE</em>
           </h2>
           <p className="max-w-sm text-slate-500 font-light text-sm leading-relaxed italic">
              Toutes les réponses techniques sur la quintessence technologique du Solaris Solaris.
           </p>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-6">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`glass-solar transition-all duration-500 overflow-hidden cursor-pointer border border-gold-sun/10
                ${openIndex === i ? 'bg-white/90 shadow-xl' : 'bg-white/40 hover:bg-white/60'}
              `}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center p-8">
                 <h4 className={`font-serif text-lg md:text-xl tracking-tight transition-colors duration-300
                   ${openIndex === i ? 'text-coral-deep' : 'text-slate-800'}
                 `}>
                    {faq.q}
                 </h4>
                 <div className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-gold-sun' : 'text-slate-300'}`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                 </div>
              </div>
              
              <div className={`transition-all duration-700 ease-[var(--ease-luxury)]
                ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                 <p className="px-8 pb-8 pt-0 text-slate-500 font-sans text-base leading-relaxed max-w-2xl">
                    {faq.a}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
