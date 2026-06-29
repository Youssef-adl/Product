"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCanvas from './Three/ProductCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Capture Solaire",
    description: "Panneaux monocristallins haute performance intégrés pour une autonomie infinie.",
    position: "top"
  },
  {
    title: "Noyau Intelligent",
    description: "Puce de contrôle thermique et gestion de charge intelligente pour protéger vos appareils.",
    position: "middle"
  },
  {
    title: "Qi2 Wireless",
    description: "Bobine de cuivre pur pour une transmission d'énergie sans perte jusqu'à 15W.",
    position: "bottom"
  }
];

export default function ProductAnatomy() {
  const containerRef = useRef(null);
  const [decomposition, setDecomposition] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setDecomposition(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky 3D Background */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-accent-primary/[0.02] blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-navy-deep/[0.02] blur-[150px] rounded-full" />
        </div>
        
        <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
          <ProductCanvas decomposition={decomposition} />
        </div>

        {/* Floating Labels based on decomposition */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {features.map((feature, i) => (
            <AnatomyLabel 
              key={i} 
              feature={feature} 
              index={i} 
              active={decomposition > (i / features.length) && decomposition < ((i + 1) / features.length)} 
            />
          ))}
        </div>
      </div>
      
      {/* Scroll Spacers */}
      <div className="h-screen w-full" />
      <div className="h-screen w-full" />
      <div className="h-screen w-full" />
    </div>
  );
}

function AnatomyLabel({ feature, index, active }) {
  const positions = [
    "top-[20%] left-[10%]",
    "top-[50%] right-[10%]",
    "bottom-[20%] left-[10%]"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: active ? 1 : 0, 
        x: active ? 0 : (index === 1 ? 20 : -20),
        y: active ? 0 : 20
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${positions[index]} max-w-sm pointer-events-auto`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-accent-primary" />
          <span className="font-mono text-[10px] font-black tracking-[0.4em] text-accent-primary uppercase">
            COMPOSANT 0{index + 1}
          </span>
        </div>
        <h3 className="font-heading text-4xl md:text-5xl font-black text-primary-text uppercase tracking-tighter">
          {feature.title}
        </h3>
        <p className="font-sans text-lg text-secondary-text leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
