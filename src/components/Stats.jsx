"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function CountUp({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const stats = [
  { label: 'Prix Powerbank',     value: 249,   suffix: ' DH',  detail: 'SmartCharge V1' },
  { label: 'Borne Kiosque',      value: 2,     suffix: ' DH/h', detail: 'Recharge Campus' },
  { label: 'Revenu Mensuel',     value: 13290, prefix: '',  suffix: ' DH', detail: 'Projection CA' },
  { label: 'Marge Unitaire',     value: 44,    suffix: ' DH',  detail: 'Par Powerbank' },
];

export default function StatsSection() {
  return (
    <section className="relative py-40 lg:py-64 overflow-hidden bg-transparent font-sans">
      {/* Immersive Depth Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[200px] bg-[var(--accent-primary)]/5"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-solar relative z-10 px-6 md:px-16">
        {/* Header - Aggressive & Cinematic */}
        <motion.div
          className="mb-32 flex flex-col items-start gap-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-[var(--accent-primary)]/40" />
            <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase italic pt-1">
              TÉLÉMÉTRIE D'EXPLOITATION // SOL-V1
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none italic">
            Métro-Data <br />
            <span className="text-[var(--accent-primary)] opacity-80">Solaris.</span>
          </h2>
        </motion.div>

        {/* Stats Grid - High Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="group flex flex-col items-start relative p-10 glass-obsidian rounded-[3rem] border border-white/5 transition-all duration-700 hover:border-[var(--accent-primary)]/30 shadow-4xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {/* Value - Oversized Cinematic */}
              <div className="text-5xl lg:text-7xl font-heading font-black text-white leading-none tracking-tighter mb-4 italic group-hover:text-[var(--accent-primary)] transition-colors duration-700">
                <CountUp end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>

              <div className="flex flex-col gap-3">
                <div className="font-heading text-lg font-black text-white/40 uppercase tracking-widest italic">
                  {stat.label}
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/20 font-black italic">
                  {stat.detail}
                </div>
              </div>

              {/* Scanning Line Animation Mini */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent animate-scan opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
