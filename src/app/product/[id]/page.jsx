"use client";
import { useApp } from '../../../contexts/AppProvider';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ArrowLeft, ChevronRight, ShoppingCart, 
  CheckCircle, Box, Zap, Minus, Plus
} from 'lucide-react';
import SketchfabViewer from '../../../components/SketchfabViewer';

// Signature Easing
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1];

export default function ProductDetail() {
  const { addToCart } = useApp();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [view3D, setView3D] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const result = await response.json();
        const data = result.data || result;
        setProduct(data);
      } catch (error) {
        console.error("Product detail fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center font-sans">
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="w-16 h-16 border-2 border-[var(--border-light)] border-t-[var(--accent-primary)] rounded-full animate-spin mb-8" 
       />
       <motion.span 
         initial={{ y: 10, opacity: 0 }}
         animate={{ y: 0, opacity: 0.5 }}
         className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--text-muted)] italic"
       >
         Initialisation Flux...
       </motion.span>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-10 font-sans">
      <h1 className="font-heading text-4xl text-[var(--text-primary)] font-black uppercase italic tracking-tighter">Produit Introuvable.</h1>
      <Link href="/boutique" className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold uppercase tracking-widest text-[10px]">Retour Boutique</Link>
    </div>
  );

  const displaySpecs = product.specs || (product.spec ? [{ label: "Matériau", value: product.spec }] : []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO }
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-24 md:pt-32 pb-40 overflow-hidden relative font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white transition-colors duration-700">
      {/* Parallax Background Accents */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-[-10%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[var(--accent-primary)]/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-[var(--accent-secondary)]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-solar relative z-10 px-6 md:px-16"
      >
        {/* BREADCRUMBS */}
        <motion.nav variants={itemVariants} className="flex flex-wrap items-center gap-3 md:gap-4 mb-12 md:mb-16 opacity-60">
          <Link href="/" className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors uppercase italic">Matrix</Link>
          <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]/40" />
          <Link href="/boutique" className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors uppercase italic">Archive Flux</Link>
          <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]/40" />
          <span className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase italic truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          
          {/* LEFT: VISUALIZATION ARCHIVE */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
            <div className={`relative glass-obsidian rounded-[2.5rem] md:rounded-[3rem] border border-[var(--glass-border)] shadow-2xl flex items-center justify-center overflow-hidden aspect-square transition-all duration-1000 group ${view3D ? 'p-0' : 'p-6 md:p-20'}`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <AnimatePresence mode="wait">
                {!view3D ? (
                  <motion.img 
                    key="product-image"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0,
                      y: [0, -10, 0]
                    }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                    transition={{ 
                      opacity: { duration: 0.6 },
                      scale: { duration: 0.8, ease: EASE_OUT_EXPO },
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    src={product.image_url} 
                    alt={product.name}
                    className="max-h-[90%] object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
                    onError={(e) => {
                      e.target.src = '/product-studio.png';
                    }}
                  />
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <SketchfabViewer modelId="f8a25b0fd4104ee9ae4206b4420ecd36" title={`${product.name} // Archive Specimen`} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView3D(!view3D)} 
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border transition-all duration-700 shadow-2xl ${view3D ? 'bg-[var(--accent-primary)] border-transparent text-white' : 'glass-obsidian border-[var(--glass-border)] text-[var(--text-primary)]'}`}
                  >
                     <div className="relative">
                       {view3D ? <ChevronRight size={22} className="stroke-[2.5]" /> : <Box size={28} className="stroke-[1.2]" />}
                       {!view3D && <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-2 bg-[var(--accent-primary)]/10 blur-lg rounded-full -z-10" />}
                     </div>
                     <span className="text-[7px] font-black uppercase tracking-[0.2em] mt-2 opacity-50 italic">{view3D ? 'Fermer' : '3D Scan'}</span>
                  </motion.button>
              </div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent-primary)]/10 shadow-[0_0_15px_var(--accent-primary-alpha)] animate-[scan_8s_linear_infinite] pointer-events-none" />
            </div>

            <div className="flex gap-4 md:gap-6 overflow-x-auto py-2 no-scrollbar px-1">
              {[0, 1, 2].map((idx) => (
                <motion.button 
                  key={idx} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)} 
                  className={`flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl glass-obsidian border transition-all duration-500 p-3 md:p-4 relative overflow-hidden ${selectedImage === idx ? 'border-[var(--accent-primary)] shadow-lg' : 'border-[var(--glass-border)] opacity-60'}`}
                >
                  <img src={product.image_url} alt="Thumbnail" className="w-full h-full object-contain relative z-10" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: CONFIGURATION & ACQUISITION */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-4 md:gap-6 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] italic">Prototype Flux // {product.sku || 'N/A'}</span>
                </div>
                <div className="h-[1px] flex-grow bg-[var(--border-light)]" />
              </div>
 
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] font-black uppercase tracking-tighter text-[var(--text-primary)] italic">
                {product.name}
              </h1>
 
              <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] font-medium leading-relaxed italic tracking-tight border-l border-[var(--accent-primary)]/30 pl-6 md:pl-8 opacity-90 max-w-[45ch]">
                {product.description}
              </p>

              {/* PRICE MODULE - Animated Pulse */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="glass-obsidian rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-[var(--glass-border)] relative overflow-hidden shadow-premium group/price"
              >
                <motion.div 
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 w-[50%] h-full bg-[var(--accent-primary)]/5 blur-[50px] pointer-events-none" 
                />
                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-wrap items-end gap-3 md:gap-4">
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-5xl md:text-7xl font-heading font-black text-[var(--text-primary)] italic tracking-tighter leading-none"
                    >
                      {parseFloat(product.price).toFixed(2)}
                    </motion.span>
                    <span className="text-xl md:text-2xl font-heading font-black text-[var(--accent-primary)] italic">DH</span>
                    <div className="ml-auto text-right min-w-fit">
                       <span className="block text-[9px] font-black tracking-[0.2em] text-[var(--text-primary)] uppercase italic">Expédition Archive</span>
                       <span className="block text-[8px] font-black text-[var(--accent-secondary)] uppercase tracking-[0.1em] italic mt-1">Disponibilité : Haute</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]/30">
                    <div className="flex items-center gap-2 md:gap-3 text-[var(--text-primary)] font-black text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] italic">
                      <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse shadow-[0_0_5px_var(--accent-primary)]" />
                      Status: Prêt à l'envoi
                    </div>
                    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.1em] italic">Cat: {product.category}</span>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                {/* QUANTITY PICKER */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-between glass-obsidian p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border border-[var(--glass-border)] px-8 shadow-inner-soft group/qty"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] italic opacity-40">Quantité</span>
                    <span className="text-[7px] font-bold text-[var(--accent-primary)] uppercase tracking-[0.1em] italic">Spécimen</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: "var(--accent-primary-alpha)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity-1))} 
                      className="w-12 h-12 flex items-center justify-center glass-obsidian text-[var(--text-primary)] rounded-full border border-[var(--glass-border)] transition-all duration-500 group/minus hover:border-[var(--accent-primary)]/30"
                    >
                      <Minus size={16} className="text-[var(--text-primary)] opacity-60 group-hover/minus:opacity-100 transition-opacity" />
                    </motion.button>
                    <div className="relative min-w-[40px] flex justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={quantity}
                          initial={{ y: 10, opacity: 0, filter: 'blur(10px)' }}
                          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                          exit={{ y: -10, opacity: 0, filter: 'blur(10px)' }}
                          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                          className="text-3xl md:text-4xl font-serif-display font-black text-[var(--text-primary)] text-center italic leading-none"
                        >
                          {quantity}
                        </motion.span>
                      </AnimatePresence>
                      <div className="absolute -bottom-2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent scale-x-0 group-hover/qty:scale-x-100 transition-transform duration-700" />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: "var(--accent-primary-alpha)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity+1)} 
                      className="w-12 h-12 flex items-center justify-center glass-obsidian text-[var(--text-primary)] rounded-full border border-[var(--glass-border)] transition-all duration-500 group/plus hover:border-[var(--accent-primary)]/30"
                    >
                      <Plus size={16} className="text-[var(--text-primary)] opacity-60 group-hover/plus:opacity-100 transition-opacity" />
                    </motion.button>
                  </div>
                </motion.div>
  
                {/* MAIN ACTIONS */}
                <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart} 
                    className={`group/btn relative w-full py-6 md:py-7 rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] flex items-center justify-center gap-4 transition-all duration-700 italic overflow-hidden ${added ? 'bg-[var(--accent-primary)] text-white border-transparent shadow-2xl' : 'glass-obsidian border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'}`}
                  >
                    {!added && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" 
                      />
                    )}
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.div 
                          key="added"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="flex items-center gap-4"
                        >
                          Acquisition Confirmée <CheckCircle size={18} className="stroke-[3]" />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="idle"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="flex items-center gap-4"
                        >
                          Acquérir le Spécimen <ShoppingCart size={18} className="stroke-[2.5]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <Link href="/boutique" className="w-full py-5 md:py-6 rounded-[2rem] font-black text-[9px] uppercase tracking-[0.3em] border border-[var(--glass-border)] text-[var(--text-muted)] active:bg-[var(--surface)] transition-all flex items-center justify-center gap-3 italic">
                    <ArrowLeft size={14} /> Retour à l'Archive
                  </Link>
                </motion.div>
              </div>
            </motion.div>
  
            {/* TECHNICAL SPECIFICATIONS */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 md:gap-10 pt-10 border-t border-[var(--border-light)] relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 80 }}
                 transition={{ duration: 1, delay: 1, ease: EASE_OUT_EXPO }}
                 className="absolute top-0 left-0 h-[1px] bg-[var(--accent-primary)]" 
               />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                 {displaySpecs.map((spec, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 5 }}
                     className="flex flex-col gap-2 group/spec"
                   >
                      <span className="text-[10px] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em] italic">{spec.label}</span>
                      <div className="glass-obsidian border-[var(--glass-border)] p-5 rounded-2xl transition-all duration-500 hover:border-[var(--accent-primary)]/20 shadow-sm hover:shadow-md">
                        <span className="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-[0.1em] italic">{spec.value}</span>
                      </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
