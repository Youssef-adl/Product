"use client";

import React, { useEffect, useRef } from 'react';
import { Sparkles, Sun, Zap, Shield, Battery } from 'lucide-react';
import gsap from 'gsap';

const items = [
  { icon: Sun, text: 'ÉNERGIE SOLAIRE' },
  { icon: Zap, text: '15W QI2 CERTIFIÉ' },
  { icon: Shield, text: 'GARANTIE 2 ANS' },
  { icon: Battery, text: 'RECHARGE SANS FIL' },
  { icon: Sparkles, text: 'DESIGN PREMIUM' },
  { icon: Sun, text: '249 DH SEULEMENT' },
  { icon: Zap, text: 'FAIT À L\'ISTA TÉMARA' },
  { icon: Shield, text: 'QUALITÉ ABORDABLE' },
];

export default function MarqueeBanner() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      const width = track.offsetWidth / 2;
      
      gsap.to(track, {
        x: -width,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const renderItems = () =>
    items.map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-4 px-8 whitespace-nowrap"
      >
        <item.icon size={14} className="text-[#880808]" />
        <span className="font-condensed text-sm font-bold tracking-[0.3em] text-white/70 uppercase">
          {item.text}
        </span>
        <span className="text-[#B8860B] opacity-40 text-lg">✦</span>
      </div>
    ));

  return (
    <section className="relative py-8 border-y border-white/[0.04] bg-transparent overflow-hidden">
      <div 
        ref={trackRef} 
        className="flex"
        style={{ width: 'max-content' }}
      >
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
}
