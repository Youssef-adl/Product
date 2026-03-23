import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "Quelle est la vitesse de charge du SmartCharge V1 ?",
    a: "Le SmartCharge V1 délivre une puissance constante de 15W via le protocole Qi certifié. En pratique, cela représente une vitesse de charge 2× plus rapide qu'un chargeur standard de 5W — idéal pour récupérer rapidement entre deux cours."
  },
  {
    q: "Compatible avec mon iPhone / Android ?",
    a: "Oui, totalement. Le SmartCharge V1 est compatible avec tous les appareils Qi : iPhone 8 et supérieur (dont toute la série MagSafe), Samsung Galaxy S/Note/Z, Pixel, et tout smartphone Android certifié Qi. Un seul chargeur pour tout l'écosystème."
  },
  {
    q: "Est-ce que mon téléphone peut surchauffer ?",
    a: "Non. Le SmartCharge V1 intègre un système de protection thermique actif — détection automatique de la chaleur, modulation de la puissance, et arrêt de sécurité si nécessaire. La sécurité électrique ISO est garantie par le design."
  },
  {
    q: "La recharge fonctionne avec une coque de téléphone ?",
    a: "Oui, jusqu'à 5mm d'épaisseur. Les coques standard en plastique, silicone ou cuir n'affectent pas la recharge. Les coques métalliques épaisses ou magnétiques peuvent réduire l'efficacité — retirez-les dans ce cas."
  },
  {
    q: "Quel est le tarif et comment commander ?",
    a: "Le SmartCharge V1 est au prix spécial de lancement pour les établissements ISTA et OFPPT. Cliquez sur 'PRÉ-COMMANDER' pour accèder au formulaire de commande groupée. Des tarifs dégressifs sont disponibles à partir de 5 unités."
  },
  {
    q: "Quelle est la garantie ?",
    a: "Le SmartCharge V1 est couvert par une garantie de 2 ans pièces et main-d'œuvre, valable pour tout défaut de fabrication. En cas de problème, contacter directement l'équipe Adlani & Zhar via le formulaire en bas de page."
  },
  {
    q: "Peut-on installer plusieurs stations sur un même campus ?",
    a: "Absolument — c'est même l'usage recommandé. Chaque unité fonctionne de manière autonome sur secteur 220V standard. Nous proposons un plan de déploiement multi-stations pour les salles de classe et espaces communs de l'ISTA Témara."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden bg-[#FDF8F3]">
      {/* Éléments décoratifs solaires */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-sun/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral-soft/5 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4" />

      <div className="container-solar relative z-10 lg:flex gap-20">
        <div className="lg:w-1/3 flex flex-col gap-10 mb-16 lg:mb-0">
           <div className="subtitle-silk text-coral-deep">
              Archive // Q&A
           </div>
           <h2 className="title-solar text-6xl lg:text-7xl text-slate-900">
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
