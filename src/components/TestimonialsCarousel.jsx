"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Youssef EL ADL",
    role: "Étudiant ISTA Témara",
    text: "Une autonomie bluffante pour mes longues journées en amphi. Solaris Lux est devenu l'accessoire indispensable de ma vie d'étudiant.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=8"
  },
  {
    name: "Sami Benjelloun",
    role: "Digital Nomad & Designer",
    text: "Le design est tout simplement intemporel. C'est rare de trouver un produit aussi performant qui soit aussi une véritable pièce de design.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=12"
  },
  {
    name: "Laila Mansour",
    role: "Ingénieure Systèmes",
    text: "La technologie Qi2 combinée à la recharge solaire est incroyablement efficace. Le rendement énergétique est au-delà de mes espérances.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=32"
  },
  {
    name: "Kamal Tazi",
    role: "Explorateur Photo",
    text: "Robuste et fiable. Elle m'accompagne dans les conditions les plus extrêmes sans jamais faillir. Une prouesse technique.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=44"
  }
];

export default function TestimonialsCarousel() {

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="container-solar">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-accent-primary" />
              <span className="font-mono text-[10px] font-black tracking-[0.4em] text-accent-primary uppercase">
                COMMUNAUTÉ LUX
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter leading-[0.9]">
              ÉCHO DES  <br /> <span className="text-[var(--text-muted)]">PIONNIERS.</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <span className="text-4xl font-black text-accent-primary">4.9/5</span>
              <p className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">Score Client</p>
            </div>
          </div>
        </div>

        {/* Editorial Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 lg:col-span-7">
            <TestimonialCard item={testimonials[0]} index={0} featured={true} />
          </div>
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
            <TestimonialCard item={testimonials[1]} index={1} />
            <TestimonialCard item={testimonials[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, index, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`p-8 md:p-12 bg-transparent hover:bg-[var(--glass-bg)] relative overflow-hidden group border-t border-[var(--glass-border)] transition-all duration-500 h-full flex flex-col ${featured ? 'md:p-16' : ''}`}
    >
      {/* Ghosting Quote Background */}
      <div className="absolute top-4 right-4 text-[var(--text-muted)] opacity-[0.05] group-hover:text-accent-primary/10 transition-colors duration-700 pointer-events-none">
        <Quote size={featured ? 160 : 80} weight="fill" />
      </div>

      {/* Testimonial Text */}
      <p className={`${featured ? 'text-2xl md:text-4xl leading-tight' : 'text-lg md:text-xl leading-relaxed'} font-serif text-[var(--text-primary)] opacity-90 mb-12 italic`}>
        "{item.text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-auto">
        <div className={`relative ${featured ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-accent-secondary/30 p-0.5 group-hover:border-accent-secondary/70 transition-colors duration-500">
            <img loading="lazy" decoding="async"
              src={item.avatar} 
              alt={item.name} 
              className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
            />
          </div>
        </div>
        <div>
          <h4 className={`font-bold text-[var(--text-primary)] tracking-tight ${featured ? 'text-lg' : 'text-base'} mb-0.5`}>{item.name}</h4>
          <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] opacity-80">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
