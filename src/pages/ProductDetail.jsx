import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Star, Heart, Share2, Globe, ShoppingCart, 
  CheckCircle, Package, ArrowLeft, ChevronRight, Zap, 
  Maximize2, RotateCw, Sparkles 
} from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "SmartCharge V1 (Edition Titane)",
    category: "UNITÉ PRINCIPALE",
    price: 159,
    sku: "SL-V1-TITAN",
    images: ["/product-v1.png", "/product-v1-alt.png"],
    description: "L'unité phare avec recharge 15W et dissipateur thermique ionique.",
    specs: [
      { label: "Puissance", value: "15W Qi Certified" },
      { label: "Matériau", value: "Titane G5 & Verre Saphir" },
      { label: "Connexion", value: "USB-C Stasis" },
      { label: "Spécificité", value: "TITANE G5 USINÉ" }
    ]
  },
  {
    id: 2,
    name: "Câble Solaris Precision (2m)",
    category: "ACCESSOIRE",
    price: 39,
    sku: "SL-ACC-CABLE",
    images: ["/product-cable.png", "/product-cable-alt.png"],
    description: "Conductivité maximale pour une charge sans perte thermique.",
    specs: [
      { label: "Longueur", value: "2.0 Mètres" },
      { label: "Revêtement", value: "Tressage Double" },
      { label: "Conductivité", value: "TRESSAGE ARAMIDE" },
      { label: "Garantie", value: "À vie" }
    ]
  },
  {
    id: 3,
    name: "Support Stasis v2",
    category: "ACCESSOIRE",
    price: 89,
    sku: "SL-ACC-STAND",
    images: ["/product-stasis.png", "/product-stasis-alt.png"],
    description: "Angle de vue optimisé à 45° pour un usage bureau.",
    specs: [
      { label: "Inclinaison", value: "45° Fixe" },
      { label: "Base", value: "Nano-succion" },
      { label: "Matériau", value: "ALUMINIUM AÉRONAUTIQUE" },
      { label: "Compatibilité", value: "MagSafe & Qi" }
    ]
  },
  {
    id: 4,
    name: "Adaptateur Mural 45W Plus",
    category: "ACCESSOIRE",
    price: 59,
    sku: "SL-ACC-WALL",
    images: ["/product-gan.png", "/product-gan-alt.png"],
    description: "Énergie ultra-compacte avec protection contre les surtensions.",
    specs: [
      { label: "Technologie", value: "GAN TECHNOLOGY" },
      { label: "Ports", value: "2x USB-C" },
      { label: "Protection", value: "ISO Thermal" },
      { label: "Sortie Max", value: "45W PD" }
    ]
  }
];

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Attempt fetch, fallback to mock
    setLoading(true);
    setTimeout(() => {
      const p = MOCK_PRODUCTS.find(m => m.id === parseInt(id));
      setProduct(p);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-solar-bg-primary flex flex-col items-center justify-center selection:bg-solar-accent-sun selection:text-white font-sans">
       <div className="w-16 h-16 border-2 border-solar-glass-border border-t-solar-accent-sun rounded-full animate-spin mb-8" />
       <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-solar-text-muted italic">Synchronisation Solaris...</span>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-solar-bg-primary flex flex-col items-center justify-center gap-10 selection:bg-solar-accent-sun selection:text-white font-sans">
      <h1 className="font-heading text-4xl text-solar-text-primary font-black uppercase italic tracking-tighter">Asset Introuvable.</h1>
      <Link to="/boutique" className="btn-primary no-underline">Retour Boutique</Link>
    </div>
  );

  return (
    <div className="bg-solar-bg-primary min-h-screen pt-32 pb-40 overflow-hidden relative selection:bg-solar-accent-sun selection:text-white font-sans">
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-sun/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-coral-soft/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-solar relative z-10">
        {/* BREADCRUMBS */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-16"
        >
          <Link to="/" className="text-[10px] font-black tracking-[0.2em] text-solar-text-muted hover:text-solar-accent-sun transition-colors uppercase italic">Accueil</Link>
          <ChevronRight size={10} className="text-solar-glass-border" />
          <Link to="/boutique" className="text-[10px] font-black tracking-[0.2em] text-solar-text-muted hover:text-solar-accent-sun transition-colors uppercase italic">Boutique</Link>
          <ChevronRight size={10} className="text-solar-glass-border" />
          <span className="text-[10px] font-black tracking-[0.2em] text-solar-text-primary uppercase italic">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group bg-solar-bg-secondary rounded-[3rem] overflow-hidden border border-solar-glass-border shadow-2xl flex items-center justify-center p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-solar-accent-sun/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity " />
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                  transition={{ duration: 0.6 }}
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="max-w-[90%] max-h-[90%] object-contain grayscale group-hover:grayscale-0 transition-all "
                />
              </AnimatePresence>
 
               {/* ZOOM HINT */}
              <div className="absolute bottom-10 right-10 flex gap-4 text-solar-text-muted">
                <div className="bg-solar-bg-primary p-4 rounded-full border border-solar-glass-border shadow-sm cursor-pointer hover:text-solar-accent-sun transition-colors">
                  <Maximize2 size={20} />
                </div>
              </div>
            </motion.div>

            {/* THUMBNAILS */}
            <div className="flex gap-6 overflow-x-auto py-4 no-scrollbar px-2">
              {product.images.map((img, idx) => (
                <motion.button 
                  key={idx}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-28 h-28 rounded-3xl bg-white/60 border-2 transition-all p-4 backdrop-blur-md overflow-hidden ${selectedImage === idx ? 'border-coral-deep shadow-xl shadow-coral-deep/10 scale-105' : 'border-transparent hover:border-sand'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONFIGURATION & ADD TO CART */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-solar-accent-sun italic">Série Solaris 2028 // {product.sku}</span>
                <div className="flex text-solar-accent-sun gap-1 opacity-40"><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/></div>
              </div>
 
              <h1 className="font-heading text-5xl lg:text-[5.5rem] leading-[0.9] mb-10 font-black uppercase italic tracking-tighter text-solar-text-primary">
                {product.name.split('(')[0]} <br/>
                <span className="text-solar-accent-sun">{product.name.includes('(') ? `(${product.name.split('(')[1]}` : ''}</span>
              </h1>
 
              <p className="font-sans text-lg text-solar-text-muted font-bold italic leading-relaxed mb-12 opacity-80 uppercase tracking-tight">
                {product.description}
              </p>

              {/* PRICE & AVAILABILITY */}
              <div className="bg-solar-bg-secondary p-10 mb-12 border border-solar-glass-border rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-solar-accent-sun" />
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="text-6xl font-heading font-black text-solar-text-primary italic">{product.price} DH</span>
                  <span className="text-[10px] font-black tracking-[0.2em] text-solar-text-muted uppercase italic">TVA Incluse</span>
                </div>
                <div className="flex items-center gap-3 text-green-600 font-bold text-[10px] font-black tracking-[0.2em] uppercase italic">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                  Stock Limité Campus Solaris 2028
                </div>
              </div>

              {/* QUANTITY & CTA */}
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-solar-bg-secondary p-2 rounded-full border border-solar-glass-border shadow-sm">
                  <div className="flex items-center gap-4 pl-8">
                    <span className="text-[10px] font-black text-solar-text-muted uppercase tracking-[0.3em] italic">Unités</span>
                  </div>
                  <div className="flex items-center gap-10 pr-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity-1))} 
                      className="w-12 h-12 flex items-center justify-center text-xl font-black bg-solar-bg-primary rounded-full hover:bg-solar-accent-sun hover:text-white transition-all border border-solar-glass-border cursor-pointer shadow-sm"
                    >
                      −
                    </button>
                    <span className="text-2xl font-heading font-black text-solar-text-primary min-w-[30px] text-center italic">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity+1)} 
                      className="w-12 h-12 flex items-center justify-center text-xl font-black bg-solar-bg-primary rounded-full hover:bg-solar-accent-sun hover:text-white transition-all border border-solar-glass-border cursor-pointer shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
 
                <div className="flex flex-col gap-5 pt-4">
                  <motion.button 
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`btn-primary w-full justify-center !py-6 !text-sm !font-black !tracking-[0.3em]
                      ${added ? '!bg-green-600 !border-green-600' : ''}
                    `}
                  >
                    {added ? (
                      <>CONFIRMÉ <CheckCircle size={20} /></>
                    ) : (
                      <>AJOUTER AU PANIER <ShoppingCart size={20} /></>
                    )}
                  </motion.button>
                  
                  <Link 
                    to="/boutique"
                    className="w-full py-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] bg-solar-bg-secondary border border-solar-glass-border text-solar-text-muted hover:text-solar-accent-sun hover:border-solar-accent-sun transition-all flex items-center justify-center gap-4 italic no-underline"
                  >
                    <ArrowLeft size={16} /> Retour à la Boutique
                  </Link>
                </div>
              </div>
            </motion.div>
 
            {/* SPECS GRID */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="grid grid-cols-2 gap-10 pt-12 border-t border-solar-glass-border"
            >
               {product.specs.map((spec, i) => (
                 <div key={i} className="flex flex-col gap-2 group">
                    <span className="text-[10px] font-black text-solar-text-muted uppercase tracking-[0.3em] group-hover:text-solar-accent-sun transition-all italic">{spec.label}</span>
                    <span className="text-sm font-bold text-solar-text-primary uppercase tracking-wider">{spec.value}</span>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
