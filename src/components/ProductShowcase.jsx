"use client";
import Link from 'next/link';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight, Sun, Zap, Cable, Smartphone, Battery } from 'lucide-react';
import { products as localProducts } from '../data/products';

// Mapping local data to showcase structure with icons
const products = localProducts.filter(p => p.id <= 4).map(p => {
  const icons = { 1: Sun, 2: Cable, 3: Smartphone, 4: Zap };
  const accents = { 1: '#880808', 2: '#B8860B', 3: '#5E0000', 4: '#E5E4E2' };
  return {
    ...p,
    subtitle: p.model,
    icon: icons[p.id] || Zap,
    accent: p.id === 1 ? '#880808' : (accents[p.id] || '#000'),
    image: p.image_url,
    features: p.features || (p.specs ? p.specs.slice(0, 3).map(s => s.value) : [])
  };
});

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const current = products[active];

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: `${current.accent}08` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-solar relative z-10">
        {/* Section header */}
        <motion.div
          className="flex flex-col gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-accent-primary/30" />
            <span className="font-mono font-bold text-[10px] tracking-[0.5em] text-accent-primary uppercase">
              NOS PRODUITS // ÉCOSYSTÈME V1
            </span>
          </div>
          <h2 className="font-condensed text-6xl lg:text-[8rem] font-black text-primary-text uppercase tracking-tight leading-[0.85]">
            L'ÉCOSYSTÈME<br />
            <span className="font-heading italic font-normal text-secondary-text">complet.</span>
          </h2>
        </motion.div>

        {/* Product showcase grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
          {/* Left — Product selector cards */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {products.map((product, i) => (
              <motion.button
                key={product.id}
                onClick={() => setActive(i)}
                className={`text-left p-6 lg:p-8 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden group
                  ${active === i
                    ? 'bg-white border-black/10 shadow-elevation'
                    : 'bg-transparent border-transparent hover:bg-black/[0.01] hover:border-black/5'
                  }`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                      ${active === i ? 'scale-110' : 'opacity-50'}
                    `}
                    style={{ background: `${product.accent}10` }}
                  >
                    <product.icon size={22} style={{ color: product.accent }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className={`font-condensed text-xl font-bold uppercase tracking-wider transition-colors
                        ${active === i ? 'text-primary-text' : 'text-secondary-text'}
                      `}>
                        {product.name}
                      </h3>
                      <span className="font-condensed text-2xl font-black text-primary-text">
                        {product.price}<span className="text-sm font-bold text-secondary-text ml-1">DH</span>
                      </span>
                    </div>
                    <p className="font-sans text-xs text-secondary-text/60 font-medium">{product.subtitle}</p>
                  </div>
                </div>

                {/* Active indicator */}
                {active === i && (
                  <motion.div
                    layoutId="product-active-bar"
                    className="absolute left-0 top-0 w-1 h-full rounded-full"
                    style={{ background: product.accent }}
                  />
                )}
              </motion.button>
            ))}

            {/* View all button */}
            <Link
              href="/boutique"
              className="btn-liquid-primary group flex items-center justify-center gap-4 mt-4 px-8 py-5 rounded-full bg-primary-text text-white text-[10px] font-black tracking-[0.3em] uppercase transition-all shadow-xl shadow-black/5"
            >
              VOIR LA BOUTIQUE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right — Product display */}
          <div className="relative order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="relative rounded-[2.5rem] bg-black/60 border border-white/5 p-8 lg:p-16 overflow-hidden shadow-2xl shadow-black/50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tag */}
                <div className="absolute top-8 left-8 flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-[8px] font-bold tracking-[0.3em] uppercase"
                    style={{ background: `${current.accent}10`, color: current.accent }}
                  >
                    {current.tag}
                  </span>
                </div>

                {/* Product image */}
                <div className="relative pt-8 pb-12">
                  <div className="absolute inset-0 m-auto w-[80%] h-[80%] blur-[120px] rounded-full opacity-20"
                    style={{ background: `linear-gradient(135deg, ${current.accent}, transparent)` }} />
                  <motion.img
                    src={current.image}
                    alt={current.name}
                    className="w-full max-w-md mx-auto h-auto object-contain relative z-10"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Product info */}
                <div className="relative z-10">
                  <h3 className="font-condensed text-4xl lg:text-5xl font-black text-primary-text uppercase tracking-tight mb-3">
                    {current.name}
                  </h3>
                  <p className="font-sans text-base text-secondary-text/70 leading-relaxed mb-8 max-w-md">
                    {current.description}
                  </p>

                  {/* Features tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {current.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase bg-black/[0.03] text-secondary-text border border-black/[0.03]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-condensed text-6xl font-black text-primary-text">{current.price}</span>
                    <span className="font-mono text-lg font-bold text-secondary-text">DH</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
