import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Shield, Zap, Search, Filter, Check } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'PASS 1 HEURE', price: 2, category: 'RECHARGE', image: '/hero-charger.png', spec: 'RAPIDE' },
  { id: 2, name: 'PASS 2 HEURES', price: 4, category: 'RECHARGE', image: '/cable.png', spec: 'LONGUE PAUSE' },
  { id: 3, name: 'ABONNEMENT MENSUEL', price: 30, category: 'ABONNEMENT', image: '/hero-charger.png', spec: 'ILLIMITÉ' }
];

export default function Store({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('TOUT');
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    if (addToCart) {
      addToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  return (
    <div className="bg-solar-cream pt-32 min-h-screen">
      
      {/* HEADER */}
      <div className="container-solar mb-20">
        <div className="col-span-12 flex flex-col gap-10 border-b border-gold-sun/20 pb-16 relative">
          {/* Éclat lumineux */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-sun/10 blur-[120px] pointer-events-none" />

          <div className="flex flex-col gap-4 relative z-10">
             <span className="subtitle-silk">MODÈLE DE TARIFICATION SOCIALE</span>
             <h1 className="title-solar text-6xl lg:text-8xl">
                Accès <br />
                <em className="text-gradient-sun">Énergie.</em>
             </h1>
          </div>
           
          <div className="flex flex-wrap items-center justify-between gap-8 relative z-10">
             <div className="flex flex-wrap gap-4">
                {['TOUT', 'RECHARGE', 'ABONNEMENT'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`btn-glass !px-6 !py-2 !text-[10px] tracking-widest uppercase
                      ${activeCategory === cat ? '!bg-gold-sun/10 !border-gold-sun !text-coral-deep' : ''}
                    `}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-4 text-slate-400">
                <Search size={20} className="hover:text-coral-deep cursor-pointer transition-colors" />
                <Filter size={20} className="hover:text-coral-deep cursor-pointer transition-colors" />
             </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="container-solar pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => activeCategory === 'TOUT' || p.category.includes(activeCategory)).map((product) => (
            <div key={product.id} className="group bg-white rounded-[24px] border border-slate-100 aspect-[4/5] p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
              
              {/* Effet de brume solaire — plus subtil */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />

              <div className="flex justify-between items-start mb-10 relative z-10">
                 <div className="flex flex-col">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400">ID: {product.id}00-SPEC</span>
                    <span className="font-sans text-[10px] font-semibold text-coral-deep tracking-wider">{product.category}</span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-gold-sun shadow-[0_0_10px_#FFB347] animate-pulse-sun" />
              </div>

              {/* L'IMAGE AVEC MIX-BLEND-MULTIPLY POUR RENDRE LE BLANC TRANSPARENT */}
              <div className="relative flex-1 flex items-center justify-center mb-10">
                 <div className="absolute inset-0 bg-gold-sun/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-2xl scale-110" />
                 <img 
                   src={product.image} 
                   alt={product.name}
                   className="w-full h-full object-contain filter transition-all duration-700 scale-90 group-hover:scale-105 group-hover:-translate-y-2 "
                   style={{ mixBlendMode: 'multiply' }}
                 />
              </div>

              <div className="mt-auto relative z-10 flex justify-between items-end border-t border-slate-100/50 pt-6">
                 <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl text-navy-deep tracking-tight leading-none group-hover:text-coral-deep transition-colors">
                       {product.name}
                    </h3>
                    <div className="font-sans font-light text-xl text-slate-500">€{product.price}</div>
                 </div>
                                  <button 
                    onClick={() => handleAdd(product)}
                    className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300
                      ${addedId === product.id 
                        ? 'bg-green-500 text-white scale-110' 
                        : 'bg-white text-slate-400 group-hover:text-white group-hover:bg-coral-deep group-hover:shadow-[0_4px_12px_rgba(209,77,63,0.3)]'
                      }
                    `}
                  >
                     {addedId === product.id ? <Check size={18} /> : <ShoppingBag size={18} />}
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
