import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter, Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

const PRODUCTS = [
  { 
    id: 1, 
    name: 'SmartCharge V1 (Edition Titane)', 
    price: 159, 
    category: 'UNITÉ PRINCIPALE', 
    image: '/hero-product.png', 
    spec: 'TITANE G5 USINÉ',
    desc: 'L\'unité phare avec recharge 15W et dissipateur thermique ionique.',
    trending: true
  },
  { 
    id: 2, 
    name: 'Câble Solaris Precision (2m)', 
    price: 39, 
    category: 'ACCESSOIRE', 
    image: '/cable.png', 
    spec: 'TRESSAGE ARAMIDE',
    desc: 'Conductivité maximale pour une charge sans perte thermique.'
  },
  { 
    id: 3, 
    name: 'Support Stasis v2', 
    price: 89, 
    category: 'ACCESSOIRE', 
    image: '/gallery_1.png', 
    spec: 'ALUMINIUM AÉRONAUTIQUE',
    desc: 'Angle de vue optimisé à 45° pour un usage bureau.'
  },
  { 
    id: 4, 
    name: 'Adaptateur Mural 45W Plus', 
    price: 59, 
    category: 'ACCESSOIRE', 
    image: '/gallery_2.png', 
    spec: 'GAN TECHNOLOGY',
    desc: 'Énergie ultra-compacte avec protection contre les surtensions.'
  }
];

export default function Store({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('TOUT');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    if (addToCart) {
      addToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === 'TOUT' || p.category.includes(activeCategory)) && 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-bg-primary min-h-screen pt-32 pb-40 transition-colors duration-500 overflow-hidden relative">
      
      {/* CINEMATIC BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold-sun/5 dark:bg-lunar-violet/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-coral/5 blur-[150px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="container-solar relative z-10 mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-glass-border/30 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="subtitle-silk text-coral flex items-center gap-3">
               <Sparkles size={14} className="animate-pulse" /> Boutique Exclusive // Solaris Lux
            </div>
            <h1 className="title-solar text-6xl lg:text-8xl leading-none">
              Accès <br />
              <em className="text-gradient-sun">Solaire.</em>
            </h1>
            <p className="max-w-md font-sans text-text-secondary italic font-light leading-relaxed">
              Explorez la série SmartCharge V1 — un écosystème conçu pour la mobilité premium sur le campus de l'ISTA Témara.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-8 lg:items-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* CATEGORY SELECTOR */}
            <div className="flex bg-bg-secondary/60 backdrop-blur-xl p-1.5 rounded-2xl border border-glass-border shadow-inner overflow-x-auto no-scrollbar max-w-[90vw]">
              {['TOUT', 'UNITÉ PRINCIPALE', 'ACCESSOIRE'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 rounded-xl whitespace-nowrap
                    ${activeCategory === cat 
                      ? 'bg-text-primary text-bg-primary shadow-xl scale-[1.02]' 
                      : 'text-text-muted hover:text-text-primary hover:bg-bg-secondary/40'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SEARCH & FILTER UI */}
            <div className="flex items-center gap-8">
              <div className={`relative flex items-center transition-all duration-500 ${showSearch ? 'bg-bg-secondary/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-glass-border w-64' : 'w-10'}`}>
                <Search 
                  size={18} 
                  className={`cursor-pointer transition-all duration-300 ${showSearch ? 'text-coral' : 'text-text-muted hover:text-coral hover:scale-110'}`}
                  onClick={() => setShowSearch(!showSearch)} 
                />
                <input 
                  type="text"
                  placeholder="RECHERCHER..."
                  className={`bg-transparent border-none outline-none font-sans text-[10px] tracking-widest text-text-primary ml-3 transition-all duration-500 ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 w-0 pointer-events-none'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 text-text-muted hover:text-text-primary cursor-pointer transition-all duration-300 group">
                <span className="text-[10px] font-bold tracking-[0.2em]">FILTRE</span>
                <Filter size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="container-solar relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative glass-solar !p-0 !overflow-visible flex flex-col h-full bg-white/40 border-white/80 shadow-lg hover:shadow-2xl hover:border-sand/50 transition-all duration-700 active:scale-[0.98] rounded-[32px]"
              >
                {/* PRODUCT BADGE */}
                {product.trending && (
                  <div className="absolute -top-3 -right-3 bg-coral-deep text-white text-[8px] font-black tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-lg shadow-coral-deep/20 z-20 animate-bounce-subtle">
                    POPULAIRE
                  </div>
                )}

                {/* IMAGE CONTAINER */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-t-[32px] bg-solar-ivory/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-2"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  
                  {/* HOVER QUICK ACTION */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                     <div className="glass-solar !py-2.5 !px-3.5 flex items-center justify-between pointer-events-auto shadow-2xl !rounded-2xl">
                        <span className="text-[9px] font-black tracking-widest text-[#E85D4E]">VOIR PRODUIT</span>
                        <ArrowRight size={12} className="text-[#E85D4E]" />
                     </div>
                  </div>
                </Link>

                {/* CONTENT AREA */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold">{product.category}</span>
                    <span className="text-[10px] font-black text-coral-deep">{product.price} DH</span>
                  </div>

                  <Link to={`/product/${product.id}`} className="font-serif text-xl text-navy-deep tracking-tight mb-3 hover:text-coral-deep transition-colors leading-tight">
                    {product.name}
                  </Link>

                  <p className="font-sans text-[11px] text-slate-400 italic leading-relaxed mb-8 line-clamp-2">
                    {product.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-sand/20 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-300 font-black tracking-widest uppercase">Tech</span>
                      <span className="text-[9px] font-bold text-navy-soft uppercase tracking-wider">{product.spec}</span>
                    </div>

                    <button 
                      onClick={() => handleAdd(product)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg
                        ${addedId === product.id 
                          ? 'bg-green-500 text-white scale-110 shadow-green-500/20' 
                          : 'bg-navy-deep text-white hover:bg-coral-deep hover:shadow-coral-deep/30 active:scale-90'
                        }
                      `}
                    >
                      {addedId === product.id ? <Check size={16} /> : <ShoppingBag size={16} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
