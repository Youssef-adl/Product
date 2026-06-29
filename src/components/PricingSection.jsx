"use client";
import Link from 'next/link';

import React from 'react';
import { motion } from 'framer-motion';

import { Check, Sun, Zap, Building2, Star } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const plans = [
  {
    id: 'kiosque',
    icon: Building2,
    name: 'STATION KIOSQUE',
    tagline: 'Rite de Passage',
    description: 'Accédez à l\'énergie sacrée du campus ISTA Témara. Une recharge ponctuelle pour les voyageurs.',
    price: '2',
    unit: 'DH / h',
    features: [
      'Accès Immédiat',
      'Flux Rapide Éclair',
      'Libre-service 24/7',
      'Sans Powerbank requis',
    ],
    accent: '#181818',
    buttonColor: 'bg-[var(--text-primary)]',
    textColor: 'text-[var(--bg-primary)]',
    buttonText: 'RÉSERVER',
    cardBgClass: 'bg-[var(--surface)]',
    popular: false,
  },
  {
    id: 'smartcharge',
    icon: Sun,
    name: 'SMARTCHARGE V1',
    tagline: 'Artéfact Solaire',
    description: 'Emportez l\'énergie solaire partout avec vous. Rechargez votre téléphone sans limite.',
    price: '249',
    unit: 'DH',
    features: [
      'Alchimie Solaire Gratuite',
      'Induction Qi 15W',
      'Format Noble Compact',
      'Assistance Royale (WA)',
    ],
    accent: 'var(--color-accent-primary)',
    buttonColor: 'bg-accent-primary',
    textColor: 'text-white',
    buttonText: 'COMMANDER LE V1',
    cardBgClass: 'bg-accent-secondary/[0.03]',
    popular: true,
  },
  {
    id: 'pack',
    icon: Star,
    name: 'PACK COMPLET',
    tagline: 'Trinité de Puissance',
    description: 'L\'ensemble des reliques : SmartCharge + Câble Sacré + Adaptateur de Force GaN.',
    price: '399',
    unit: 'DH',
    originalPrice: '456',
    features: [
      'Relique V1 Complète',
      'Lien USB-C Tressé',
      'Force GaN 30W',
      'Protection Éternelle (3 ans)',
    ],
    accent: '#181818',
    buttonColor: 'bg-[var(--text-primary)]',
    textColor: 'text-[var(--bg-primary)]',
    buttonText: 'COMMANDER LE PACK',
    cardBgClass: 'bg-accent-primary/[0.02]',
    popular: false,
  },
];

export default function PricingSection() {
  const { playSound } = useSoundEffects();

  return (
    <section id="pricing" className="relative py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-secondary/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-20">
        {/* Header centered */}
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-8 bg-accent-secondary/30" />
             <span className="text-accent-secondary text-[11px] font-black tracking-[0.6em] uppercase font-heading">NOS TARIFS</span>
             <div className="h-[1px] w-8 bg-accent-secondary/30" />
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black text-[var(--text-primary)] tracking-tight mb-8 uppercase">
            Choisir <span className="text-accent-primary">sa Solution</span>
          </h2>
          <p className="text-[var(--text-muted)] text-xl max-w-2xl font-sans italic">
            Acquérez les équipements nécessaires à votre autonomie énergétique.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              onMouseEnter={() => playSound('hover')}
              className={`${plan.cardBgClass} hover:bg-[var(--card-hover)] rounded-[2rem] p-12 flex flex-col transition-all duration-700 relative border border-[var(--glass-border)] group hover:border-accent-primary/30 shadow-2xl`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-primary text-white text-[9px] font-black tracking-[0.4em] px-8 py-2 rounded-full uppercase font-heading shadow-[0_0_20px_var(--color-accent-primary)] ring-1 ring-white/20">
                  RECOMMANDÉ
                </div>
              )}
              
              <div className="mb-10 text-center">
                <span className="inline-block text-accent-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-6 font-heading">
                  {plan.tagline}
                </span>
                <h4 className="text-2xl font-heading font-black text-[var(--text-primary)] mb-6 uppercase tracking-tighter">{plan.name}</h4>
                <div className="flex items-baseline justify-center gap-2 mt-4">
                  <span className="text-6xl font-black font-sans tracking-tighter">{plan.price}</span>
                  <span className="text-lg text-accent-secondary font-bold font-heading">{plan.unit}</span>
                </div>
              </div>

              <div className="w-full h-px bg-[var(--glass-border)] my-8" />

              <ul className="flex flex-col gap-6 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/40 group-hover:bg-accent-primary transition-colors" />
                    <span className="text-sm font-medium text-[var(--text-subtle)] group-hover:text-[var(--text-primary)] transition-colors">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/boutique"
                onClick={() => playSound('click')}
                className={`w-full py-6 rounded-sm text-center font-black text-[11px] tracking-[0.4em] transition-all duration-500 ease-[var(--ease-out-expo)] uppercase font-heading ${plan.buttonColor} ${plan.textColor} border border-transparent hover:scale-105 active:scale-95`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative radial at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[radial-gradient(ellipse_at_bottom,var(--accent-primary-alpha-thin)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
