"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "Combien coûte le SmartCharge V1 ?",
    a: "Le SmartCharge V1 est disponible à 249 DH. C'est un prix pensé pour le budget étudiant, offrant un rapport qualité/prix imbattable avec la technologie de recharge solaire."
  },
  {
    q: "Comment fonctionne la recharge solaire ?",
    a: "Le SmartCharge V1 intègre un panneau solaire haute efficacité qui convertit la lumière du soleil en énergie. Il suffit de le placer au soleil pour recharger la batterie gratuitement."
  },
  {
    q: "Mon téléphone est-il compatible ?",
    a: "Oui. Le SmartCharge V1 est compatible avec tous les appareils Qi : iPhone 8+, Samsung Galaxy S/Note/Z, Pixel, et tout smartphone Android certifié Qi. Fonctionne même avec une coque jusqu'à 5mm."
  },
  {
    q: "Qu'est-ce que la station kiosque ?",
    a: "La station kiosque est un point de recharge disponible sur le campus ISTA Témara à 2 DH/heure. Aucun besoin de posséder une powerbank — branchez et rechargez en libre-service."
  },
  {
    q: "La recharge au soleil est-elle sécurisée ?",
    a: "Non. Le SmartCharge V1 intègre un système de protection thermique active qui module la puissance pour maintenir une température optimale. Tous nos produits sont certifiés et sécurisés."
  },
  {
    q: "Que couvre la garantie ?",
    a: "Le SmartCharge V1 est couvert par une garantie de 2 ans pièces et main-d'œuvre. Le support client est disponible via WhatsApp. Le Pack Complet bénéficie d'une garantie étendue de 3 ans."
  },
  {
    q: "Comment commander ?",
    a: "Vous pouvez commander directement via notre boutique en ligne ou en personne sur le campus ISTA Témara. La livraison est disponible sur Témara et environs. Paiement à la livraison accepté."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative py-32 lg:py-48 overflow-visible bg-transparent will-change-transform">
      {/* High-Performance Atmospheric Glow (No Blur Filter) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--accent-primary-alpha)_0%,transparent_70%)] opacity-10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="container-solar relative z-10 lg:flex gap-16 xl:gap-32">
        {/* Left column */}
        <div className="lg:w-[45%] flex-shrink-0 flex flex-col gap-12 mb-16 lg:mb-0 lg:sticky lg:top-40 lg:self-start">
          <div className="font-mono font-bold text-[10px] tracking-[0.6em] text-accent-primary uppercase flex items-center gap-4">
            <span className="w-8 h-px bg-accent-primary/20" />
            QUESTIONS FRÉQUENTES
          </div>
          <h2 className="font-condensed text-6xl lg:text-[6rem] xl:text-[7.5rem] font-black text-[var(--text-primary)] leading-[0.9] uppercase tracking-tighter">
            VOS<br />
            QUESTIONS<br />
            <span className="font-heading italic font-normal text-[var(--text-muted)] opacity-20 block mt-4">répondues.</span>
          </h2>
          <p className="font-sans text-lg text-[var(--text-muted)] font-medium leading-relaxed max-w-sm">
            Tout ce que vous devez savoir sur le SmartCharge V1, la station kiosque et nos accessoires premium.
          </p>
          <div className="w-24 h-1 bg-accent-primary rounded-full shadow-[0_0_15px_rgba(136, 8, 8,0.3)]" />
        </div>

        {/* Right column */}
        <div className="lg:w-[55%] flex-grow flex flex-col divide-y divide-[var(--glass-border)]">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="cursor-pointer group py-8 first:pt-0"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-start gap-8">
                <h4 className={`font-condensed text-xl md:text-2xl font-bold uppercase tracking-wider transition-all duration-300
                  ${openIndex === i ? 'text-accent-primary' : 'text-[var(--text-primary)] group-hover:text-accent-primary'}
                `}>
                  {faq.q}
                </h4>
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500
                  ${openIndex === i
                    ? 'bg-accent-primary border-accent-primary text-white rotate-45 shadow-[0_0_15px_rgba(255,40,0,0.4)]'
                    : 'bg-transparent border-[var(--glass-border)] text-[var(--text-muted)] group-hover:border-accent-primary group-hover:text-accent-primary'
                  }`}>
                  <Plus size={16} />
                </div>
              </div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 font-sans text-base text-[var(--text-muted)] leading-relaxed max-w-2xl font-medium">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
