import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function CountUp({ end, suffix = '', duration = 2000 }) {
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
            const eased = 1 - Math.pow(1 - progress, 3);
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

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: 'Énergie Pure',        value: 15,   suffix: 'W',  detail: 'Puissance Qi Max' },
  { label: 'Délai de Réponse',    value: 100,  suffix: 'ms', detail: 'Connexion Instantanée' },
  { label: 'Satisfaction Campus', value: 98,   suffix: '%',  detail: 'Retours positifs' },
  { label: 'Précision d\'usinage', value: 15,  suffix: 'mm', detail: 'Épaisseur Ultra-mince' },
];

export default function StatsSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-bg-secondary border-y border-glass-border transition-colors duration-500">
      {/* Radial background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, var(--color-accent-sun), transparent)' }} 
        className="opacity-[0.03]"
      />

      <div className="container-solar relative z-10">
        {/* Section label */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="subtitle-silk mb-4">Chiffres Clés // SmartCharge V1</div>
          <h2 className="title-solar text-5xl lg:text-6xl">
            Des données <em className="text-gradient-sun">réelles.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-glass-bg backdrop-blur-3xl border border-glass-border rounded-3xl flex flex-col items-center text-center gap-4 p-10 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-serif text-5xl lg:text-6xl font-light text-gradient-sun leading-none">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="h-px w-8 bg-gradient-to-r from-coral/30 to-accent-sun/30 mx-auto" />
              <div>
                <div className="font-sans text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted">{stat.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
