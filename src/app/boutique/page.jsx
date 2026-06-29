"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useApp } from '../../contexts/AppProvider';

const categories = ["TOUS", "CHARGING", "ACCESSORIES"];

export default function Boutique() {
  const { addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState("TOUS");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const result = await response.json();
        const data = result.data || result;
        setProductsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Boutique fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const categoryMatch = activeCategory === "TOUS" || 
                           (product.category && product.category.toUpperCase() === activeCategory);
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = (product.name && product.name.toLowerCase().includes(searchLower)) || 
                         (product.description && product.description.toLowerCase().includes(searchLower));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, productsList]);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-32 overflow-hidden selection:bg-[var(--accent-primary)] selection:text-black transition-colors duration-700">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--accent-primary)]/5 blur-[120px] pointer-events-none" />

      <div className="container-solar relative z-10 mb-12 lg:mb-20 px-6">
        <div className="flex flex-col gap-8 border-b border-[var(--glass-border)] pb-12">
          <div className="flex items-center gap-3 opacity-50">
             <div className="h-[1px] w-6 bg-[var(--accent-primary)]" />
             <span className="text-[9px] font-black tracking-[0.4em] uppercase font-mono italic">SOLARIS_EXPANSION_PACK</span>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] font-black uppercase text-[var(--text-primary)] italic tracking-tighter">
              Solaris <span className="text-[var(--accent-primary)]">Flux.</span>
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <p className="max-w-[60ch] font-sans text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--accent-primary)] pl-6 font-medium">
                Matériel conçu pour une mobilité trans-temporelle et une efficacité absolue. Archive V1.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                <div className="flex glass-obsidian p-1 rounded-full border border-[var(--glass-border)] overflow-x-auto scrollbar-hide w-full sm:w-auto">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        playSound?.('click');
                      }}
                      className={`px-8 py-2.5 text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-500 rounded-full whitespace-nowrap italic flex-1 sm:flex-none
                        ${activeCategory === cat 
                          ? 'bg-[var(--accent-primary)] text-black shadow-md' 
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5'
                        }
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className={`relative flex items-center transition-all duration-500 ${showSearch ? 'bg-[var(--surface)] px-4 py-2 rounded-full border border-[var(--glass-border)] w-full sm:w-64' : 'w-10'}`}>
                  <Search 
                    size={16} 
                    className={`cursor-pointer transition-colors ${showSearch ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                    onClick={() => setShowSearch(!showSearch)} 
                  />
                  <input 
                    type="text"
                    placeholder="RECHERCHER..."
                    className={`bg-transparent border-none outline-none font-sans text-[9px] font-black tracking-[0.1em] text-[var(--text-primary)] ml-3 transition-all ${showSearch ? 'opacity-100 w-full' : 'opacity-0 w-0 pointer-events-none'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-solar relative z-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-[2rem] glass-obsidian animate-pulse opacity-10" />
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] italic">Aucun spécimen détecté dans cette archive.</span>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative glass-obsidian border border-[var(--glass-border)] rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full bg-[var(--bg-primary)]/40 hover:bg-[var(--surface)]/10"
                >
                  <div className="relative h-[280px] bg-[var(--surface)] flex items-center justify-center p-12 overflow-hidden transition-colors duration-700">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 ease-[var(--ease-out-expo)]"
                      onError={(e) => {
                        e.target.src = '/product-studio.png';
                      }}
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[8px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black italic">{product.category}</span>
                      <span className="text-xs font-black text-[var(--text-primary)] italic tracking-tight">{parseFloat(product.price).toFixed(2)} DH</span>
                    </div>

                    <Link href={`/product/${product.id}`} className="font-heading text-2xl lg:text-3xl text-[var(--text-primary)] tracking-tight mb-4 hover:text-[var(--accent-primary)] transition-colors font-black uppercase italic leading-tight">
                      {product.name}
                    </Link>

                    <p className="font-sans text-[11px] text-[var(--text-muted)] leading-relaxed mb-8 line-clamp-2 italic font-medium opacity-80">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-[var(--glass-border)] flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] text-[var(--text-muted)] font-black tracking-[0.3em] uppercase italic opacity-60">MODÈLE</span>
                        <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.05em] italic">{product.model || "Standard"}</span>
                      </div>

                      <button 
                        onClick={() => {
                          addToCart(product);
                          playSound?.('action');
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] text-black hover:scale-105 transition-all duration-300 shadow-md group/btn"
                      >
                        <ShoppingBag size={14} className="group-hover/btn:rotate-6 transition-transform" />
                        <span className="text-[9px] font-black tracking-[0.1em] uppercase italic">ADD</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
