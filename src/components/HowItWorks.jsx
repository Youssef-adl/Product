import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wifi, BatteryCharging } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: MapPin,
    title: 'Poser',
    desc: 'Posez votre smartphone sur la surface du SmartCharge V1. L\'alignement magnétique se fait en moins d\'une seconde.',
  },
  {
    num: '02',
    icon: Wifi,
    title: 'Connecter',
    desc: 'La connexion Qi s\'établit automatiquement. Une LED discète confirme la recharge — aucune manipulation nécessaire.',
  },
  {
    num: '03',
    icon: BatteryCharging,
    title: 'Charger',
    desc: 'La puissance de 15W se transfère en continu. Récupérez entre deux cours exactement ce dont vous avez besoin.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 lg:py-48 bg-solar-bg-primary overflow-hidden transition-colors duration-500">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-solar-accent-sun/10 to-transparent hidden lg:block" />

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="subtitle-silk !font-sans !tracking-[0.3em] !text-[10px]">Utilisation // Guide</div>
          <h2 className="title-solar text-5xl lg:text-7xl !font-heading !font-black">
            Trois étapes, <br />
            <em className="text-solar-accent-sun italic">zéro friction.</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {/* Step number */}
              <div className="font-heading text-[5rem] leading-none font-black text-solar-accent-sun opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none italic">
                {step.num}
              </div>

              {/* Icon circle */}
              <div
                className="relative z-10 w-20 h-20 rounded-none flex items-center justify-center border border-solar-accent-sun/20 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--solar-bg-secondary) 100%)' }}
              >
                <step.icon size={28} className="text-solar-accent-sun" />
              </div>

              {/* Content */}
              <div className="bg-white border border-solar-glass-border rounded-none p-8 w-full shadow-md hover:shadow-xl transition-all">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-solar-accent-sun mb-3 font-bold">{step.num}</div>
                <h3 className="font-heading text-3xl text-solar-text-primary mb-4 tracking-tight font-black uppercase italic">{step.title}</h3>
                <p className="font-sans text-sm text-solar-text-muted leading-relaxed font-normal opacity-80">{step.desc}</p>
              </div>

              {/* Connector arrow (between cards on desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 text-accent-sun/40 text-2xl z-20">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
