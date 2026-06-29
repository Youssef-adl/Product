"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wifi, BatteryCharging } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: MapPin,
    title: 'Poser',
    desc: "Posez votre smartphone sur la surface du SmartCharge V1. L'alignement magnétique se fait en moins d'une seconde.",
  },
  {
    num: '02',
    icon: Wifi,
    title: 'Connecter',
    desc: "La connexion Qi s'établit automatiquement. Une LED discrète confirme la recharge — aucune manipulation nécessaire.",
  },
  {
    num: '03',
    icon: BatteryCharging,
    title: 'Charger',
    desc: "La puissance de 15W se transfère en continu. Récupérez exactement ce dont vous avez besoin, en toute sérénité.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 lg:py-48 bg-transparent overflow-hidden transition-colors duration-500">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-silk-white via-white to-silk-white pointer-events-none" />

      <div className="container-solar relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Utilisation // Guide</div>
          <h2 className="section-title text-5xl lg:text-7xl">
            Trois étapes, <br />
            <em>zéro friction.</em>
          </h2>
          <motion.div
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-sage-green/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 relative">
          {/* Animated connecting line */}
          <motion.div
            className="hidden lg:block absolute top-16 left-[16.5%] right-[16.5%] h-[1px] z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(139,148,116,0.3), transparent)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style2={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center gap-8 z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Large number watermark with parallax drift */}
              <motion.div
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9rem] font-black text-deep-olive/[0.03] leading-none pointer-events-none select-none"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                {step.num}
              </motion.div>

              {/* Icon circle with pulsing ring */}
              <div className="relative z-10">
                <motion.div
                  className="w-32 h-32 rounded-full flex items-center justify-center bg-white border border-sage-green/10 shadow-lg group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 50px rgba(139, 148, 116, 0.15)',
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon size={36} className="text-sage-green" strokeWidth={1.5} />
                </motion.div>
                
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-sage-green/20"
                  animate={{
                    scale: [1, 1.3, 1.3],
                    opacity: [0.4, 0, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="font-condensed text-[11px] font-bold uppercase tracking-[0.4em] text-sage-green">
                  {step.num}
                </div>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-4xl text-deep-olive font-bold italic"
                >
                  {step.title}
                </h3>
                <p className="font-sans text-base text-slate-gray leading-relaxed opacity-70 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
