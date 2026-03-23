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
    images: ["/product-v1.png", "/gallery_1.png", "/gallery_2.png"],
    description: "Le summum de la charge inductive. Usiné dans un bloc de titane Grade 5 avec gestion thermique passive avancée. Conçu pour durer une vie entière.",
    specs: [
      { label: "Puissance", value: "15W Qi Certified" },
      { label: "Matériau", value: "Titane G5 & Verre Saphir" },
      { label: "Connexion", value: "USB-C Stasis" },
      { label: "Poids", value: "450g (Densité Premium)" }
    ]
  },
  {
    id: 2,
    name: "Câble Solaris Precision (2m)",
    category: "ACCESSOIRE",
    price: 39,
    sku: "SL-ACC-CABLE",
    images: ["/product-cable.png", "/gallery_1.png"],
    description: "Câble USB-C renforcé en fibre d'aramide (Kevlar) pour une durabilité extrême et une perte d'énergie minimale.",
    specs: [
      { label: "Longueur", value: "2.0 Mètres" },
      { label: "Revêtement", value: "Tressage Double" },
      { label: "Débit", value: "10 Gbps Data" },
      { label: "Garantie", value: "À vie" }
    ]
  },
  {
    id: 3,
    name: "Support Stasis v2",
    category: "ACCESSOIRE",
    price: 89,
    sku: "SL-ACC-STAND",
    images: ["/product-stasis.png", "/gallery_2.png"],
    description: "Support ergonomique usiné CNC pour un alignement magnétique parfait. Idéal pour le mode StandBy d'iOS.",
    specs: [
      { label: "Inclinaison", value: "45° Fixe" },
      { label: "Base", value: "Nano-succion" },
      { label: "Matériau", value: "Alu 7075" },
      { label: "Compatibilité", value: "MagSafe & Qi" }
    ]
  },
  {
    id: 4,
    name: "Adaptateur Mural 45W Plus",
    category: "ACCESSOIRE",
    price: 59,
    sku: "SL-ACC-WALL",
    images: ["/product-gan.png", "/gallery_1.png"],
    description: "Adaptateur secteur GaN ultra-compact. Fournit l'énergie nécessaire pour exploiter 100% du potentiel Solaris.",
    specs: [
      { label: "Technologie", value: "GaN Fast III" },
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
    <div className="min-h-screen bg-solar-cream flex flex-col items-center justify-center">
       <div className="w-16 h-16 border-2 border-sand/30 border-t-coral-deep rounded-full animate-spin mb-6" />
       <span className="subtitle-silk animate-pulse">Synchronisation Solaris...</span>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-solar-cream flex flex-col items-center justify-center gap-8">
      <h1 className="title-solar text-4xl">Asset Introuvable.</h1>
      <Link to="/boutique" className="btn-sun">Retour Boutique</Link>
    </div>
  );

  return (
    <div className="bg-solar-cream min-h-screen pt-32 pb-40 overflow-hidden relative">
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-sun/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-coral-soft/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-solar relative z-10">
        {/* BREADCRUMBS */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <Link to="/" className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-coral-deep transition-colors uppercase">Accueil</Link>
          <ChevronRight size={10} className="text-sand" />
          <Link to="/boutique" className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-coral-deep transition-colors uppercase">Boutique</Link>
          <ChevronRight size={10} className="text-sand" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-navy-deep uppercase">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group glass-solar !p-0 aspect-square rounded-[48px] overflow-hidden bg-white/40 border-white/80 shadow-2xl flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-sun/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                  transition={{ duration: 0.6 }}
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="max-w-[80%] max-h-[80%] object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </AnimatePresence>

              {/* FLOATING BADGE */}
              <div className="absolute top-10 left-10">
                <div className="solar-icon animate-pulse-sun shadow-xl">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* ZOOM HINT */}
              <div className="absolute bottom-10 right-10 flex gap-4 text-slate-300">
                <div className="glass-solar !p-3 cursor-pointer hover:text-coral-deep transition-colors">
                  <Maximize2 size={18} />
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
              <div className="flex items-center gap-4 mb-8">
                <span className="subtitle-silk text-coral-deep">Série Solaris 2026 // {product.sku}</span>
                <div className="flex text-gold-sun gap-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
              </div>

              <h1 className="title-solar text-5xl lg:text-7xl leading-none mb-8">
                {product.name.split('(')[0]} <br/>
                <em className="text-gradient-sun">{product.name.includes('(') ? `(${product.name.split('(')[1]}` : ''}</em>
              </h1>

              <p className="font-sans text-lg text-slate-500 font-light italic leading-relaxed mb-12">
                {product.description}
              </p>

              {/* PRICE & AVAILABILITY */}
              <div className="glass-solar !p-10 mb-12 border-white/80 bg-white/30 backdrop-blur-2xl">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-sans font-light text-navy-deep">{product.price} DH</span>
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">TVA Incluse</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-600 font-sans text-[10px] font-bold tracking-widest uppercase">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                  Stock Limité Campus ISTA
                </div>
              </div>

              {/* QUANTITY & CTA */}
              <div className="space-y-6">
                <div className="flex items-center justify-between glass-solar !py-2 !px-2 border-sand/20">
                  <div className="flex items-center gap-4 pl-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unités</span>
                  </div>
                  <div className="flex items-center gap-8 pr-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity-1))} 
                      className="w-12 h-12 flex items-center justify-center text-xl font-light bg-white rounded-2xl hover:bg-navy-deep hover:text-white transition-all shadow-sm"
                    >
                      −
                    </button>
                    <span className="text-2xl font-serif text-navy-deep min-w-[30px] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity+1)} 
                      className="w-12 h-12 flex items-center justify-center text-xl font-light bg-white rounded-2xl hover:bg-navy-deep hover:text-white transition-all shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.button 
                    whileHover={{ y: -4, shadow: '0 20px 40px rgba(209,77,63,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`w-full py-6 rounded-3xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-4 shadow-xl
                      ${added ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-coral-deep text-white'}
                    `}
                  >
                    {added ? (
                      <>CONFIRMÉ <CheckCircle size={18} /></>
                    ) : (
                      <>AJOUTER AU PANIER <ShoppingCart size={18} /></>
                    )}
                  </motion.button>
                  
                  <Link 
                    to="/boutique"
                    className="w-full py-6 rounded-3xl font-bold text-xs uppercase tracking-[0.2em] bg-white border border-sand/40 text-slate-600 hover:bg-solar-warm transition-all flex items-center justify-center gap-3"
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
               className="grid grid-cols-2 gap-8 pt-10 border-t border-sand/30"
            >
               {product.specs.map((spec, i) => (
                 <div key={i} className="flex flex-col gap-1 group">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-coral-deep transition-colors">{spec.label}</span>
                    <span className="text-sm font-sans text-navy-deep font-semibold tracking-tight">{spec.value}</span>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
