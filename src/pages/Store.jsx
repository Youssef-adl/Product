import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter, Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';



export default function Store({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('TOUS');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (product) => {
    if (addToCart) {
      addToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  const filteredProducts = products.filter(p => 
    (activeCategory === 'TOUS' || p.category?.toUpperCase() === activeCategory) && 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-solar-bg-primary min-h-screen pt-32 pb-40 transition-colors duration-500 overflow-hidden relative">
      
      {/* CINEMATIC BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-solar-accent-sun/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-solar-text-primary/5 blur-[150px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="container-solar relative z-10 mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-solar-glass-border pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="subtitle-silk text-solar-accent-sun flex items-center gap-3">
               <Sparkles size={14} className="animate-pulse" /> Exclusive Store // Solaris Lux
            </div>
            <h1 className="title-solar text-6xl lg:text-9xl leading-[0.85] !font-heading !font-black">
              Solar <br />
              <em className="text-solar-accent-sun">Portal.</em>
            </h1>
            <p className="max-w-md font-sans text-solar-text-secondary italic font-light leading-relaxed border-l-2 border-solar-glass-border pl-8">
              Explore the SmartCharge V1 series — an ecosystem engineered for premium mobility and technical excellence.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-8 lg:items-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* CATEGORY SELECTOR */}
            <div className="flex bg-solar-bg-secondary/60 backdrop-blur-xl p-1.5 rounded-full border border-solar-glass-border shadow-inner overflow-x-auto no-scrollbar max-w-[90vw]">
              {['TOUS', 'UNITÉ PRINCIPALE', 'ACCESSOIRE'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-8 py-4 text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-500 rounded-full whitespace-nowrap
                    ${activeCategory === cat 
                      ? 'bg-solar-text-primary text-solar-bg-primary shadow-2xl scale-[1.02]' 
                      : 'text-solar-text-muted hover:text-solar-text-primary hover:bg-solar-bg-secondary/40'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SEARCH & FILTER UI */}
            <div className="flex items-center gap-8">
              <div className={`relative flex items-center transition-all duration-500 ${showSearch ? 'bg-solar-bg-secondary/60 backdrop-blur-md px-5 py-3 rounded-full border border-solar-glass-border w-64' : 'w-10'}`}>
                <Search 
                  size={18} 
                  className={`cursor-pointer transition-all duration-300 ${showSearch ? 'text-solar-accent-sun' : 'text-solar-text-muted hover:text-solar-accent-sun hover:scale-110'}`}
                  onClick={() => setShowSearch(!showSearch)} 
                />
                <input 
                  type="text"
                  placeholder="SEARCH..."
                  className={`bg-transparent border-none outline-none font-sans text-[10px] tracking-widest text-solar-text-primary ml-3 transition-all duration-500 ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 w-0 pointer-events-none'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 text-solar-text-muted hover:text-solar-text-primary cursor-pointer transition-all duration-300 group">
                <span className="text-[10px] font-bold tracking-[0.2em]">FILTER</span>
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
            {loading ? (
              <motion.div key="loading" className="col-span-full py-20 text-center text-solar-text-secondary font-bold tracking-widest text-sm">LOADING SOLARIS CATALOG...</motion.div>
            ) : filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative bg-solar-bg-secondary/60 border-solar-glass-border shadow-lg hover:shadow-2xl hover:border-solar-accent-sun/20 transition-all active:scale-[0.98] rounded-[32px] overflow-hidden"
              >
                {/* PRODUCT BADGE */}
                {product.trending && (
                  <div className="absolute top-4 left-4 bg-solar-accent-sun text-solar-text-primary text-[8px] font-black tracking-[0.3em] px-4 py-2 rounded-full shadow-xl z-20 italic">
                    POPULAR
                  </div>
                )}

                {/* IMAGE CONTAINER */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-solar-bg-primary/50 border-b border-solar-glass-border">
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-accent-sun/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity " />
                  <motion.img 
                    src={product.image_url || '/product-v1.png'} 
                    alt={product.name}
                    className="w-full h-full object-contain p-10 transition-all group-hover:scale-105 group-hover:-translate-y-2 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* HOVER QUICK ACTION */}
                   <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                      <div className="bg-solar-bg-secondary/90 backdrop-blur-xl py-3 px-5 flex items-center justify-between pointer-events-auto shadow-2xl rounded-full border border-solar-glass-border">
                         <span className="text-[10px] font-black tracking-[0.3em] text-solar-accent-sun italic">VIEW PRODUCT</span>
                         <ArrowRight size={14} className="text-solar-accent-sun" />
                      </div>
                   </div>
                </Link>

                {/* CONTENT AREA */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-solar-text-muted font-bold">{product.category}</span>
                    <span className="text-[10px] font-black text-solar-accent-sun">{parseFloat(product.price).toFixed(2)} DH</span>
                  </div>

                  <Link to={`/product/${product.id}`} className="font-heading text-xl text-solar-text-primary tracking-tight mb-3 hover:text-solar-accent-sun transition-colors leading-tight font-black uppercase italic">
                    {product.name}
                  </Link>

                  <p className="font-sans text-[11px] text-solar-text-secondary italic leading-relaxed mb-8 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-solar-glass-border flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-solar-text-muted font-black tracking-widest uppercase">Tech</span>
                      <span className="text-[9px] font-bold text-solar-text-primary uppercase tracking-wider">{product.spec}</span>
                    </div>

                    <button 
                      onClick={() => handleAdd(product)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg
                        ${addedId === product.id 
                          ? 'bg-green-500 text-solar-text-primary scale-110 shadow-green-500/20' 
                          : 'bg-solar-text-primary text-solar-bg-primary hover:bg-solar-accent-sun hover:shadow-solar-accent-sun/30 active:scale-90'
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
