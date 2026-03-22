import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Star, Heart, Share2, Globe, ShoppingCart, CheckCircle, Package, ArrowLeft, ChevronRight } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Solaris PRO 2026",
    category: "UNITÉ PRINCIPALE",
    price: 159,
    sku: "LS-2026-X1",
    images: ["/hero-product.png", "/gallery_1.png", "/gallery_2.png"],
    description: "Le summum de la charge inductive. Usiné dans un bloc d'aluminium aéronautique 7075-T6 avec gestion thermique Ionic-Cooling."
  },
  {
    id: 2,
    name: "CÂBLE LI-ION PRECISION",
    category: "ACCESSOIRE",
    price: 39,
    sku: "LS-ACC-C1",
    images: ["/gallery_1.png"],
    description: "Câble USB-C renforcé en fibre d'aramide pour une durabilité extrême."
  },
  {
    id: 3,
    name: "ADAPTATEUR IONIC 45W",
    category: "ACCESSOIRE",
    price: 59,
    sku: "LS-ACC-P1",
    images: ["/gallery_2.png"],
    description: "Adaptateur secteur haute efficacité optimisé pour la charge ultra-rapide."
  },
  {
    id: 4,
    name: "SUPPORT BUREAU CNC",
    category: "ACCESSOIRE",
    price: 89,
    sku: "LS-ACC-S1",
    images: ["/gallery_1.png"],
    description: "Support ergonomique usiné dans la masse pour un alignement magnétique parfait."
  }
];

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [view3D, setView3D] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const p = data.data;
          if (!p.images || p.images.length === 0) {
            p.images = [p.image_url || '/hero-product.png'];
          }
          setProduct(p);
        } else {
           const mock = MOCK_PRODUCTS.find(m => m.id === parseInt(id));
           if (mock) setProduct(mock);
        }
      })
      .catch(err => {
         const mock = MOCK_PRODUCTS.find(m => m.id === parseInt(id));
         if (mock) setProduct(mock);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-4" />
       <span className="text-[10px] font-black tracking-widest uppercase">Initialisation de l'Asset...</span>
    </div>
  );
  
  if (!product) return <div className="min-h-screen flex items-center justify-center font-black text-red-500 uppercase tracking-widest">Composant Introuvable.</div>;

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-3 text-[10px] font-black text-gray-400 mb-12 overflow-x-auto whitespace-nowrap uppercase tracking-widest">
           <Link to="/" className="hover:text-black no-underline transition-colors">Accueil</Link>
           <div className="w-1 h-1 bg-gray-300 rounded-full" />
           <Link to="/store" className="hover:text-black no-underline transition-colors">Boutique</Link>
           <div className="w-1 h-1 bg-[#CCFF00] rounded-full" />
           <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* LEFT: GALLERY */}
           <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-gray-50 rounded-[48px] p-8 relative group overflow-hidden border border-gray-100">
                  <div className="aspect-square flex items-center justify-center rounded-[32px] overflow-hidden">
                    <img 
                      src={product.images[selectedImage]} 
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="absolute top-8 left-8">
                     <div className="bg-black text-[#CCFF00] p-3 rounded-2xl shadow-xl">
                        <Package size={20} />
                     </div>
                  </div>
                  <button 
                    onClick={() => setView3D(!view3D)}
                    className="absolute bottom-10 right-10 bg-black/90 backdrop-blur-md text-white px-8 py-4 rounded-full text-[10px] font-black shadow-2xl hover:bg-[#CCFF00] hover:text-black transition-all flex items-center gap-3 z-10 uppercase tracking-[0.2em]"
                  >
                    <Globe size={16} className={view3D ? 'animate-spin' : ''}/>
                    {view3D ? 'MODE STATIQUE' : 'EXPLORER VR'}
                  </button>
              </div>

              {/* THUMBS */}
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-28 h-28 rounded-3xl bg-white border-2 transition-all p-3 ${selectedImage === idx ? 'border-black scale-105 shadow-xl' : 'border-gray-50 hover:border-gray-200 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
           </div>

           {/* RIGHT: BUY BOX */}
           <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-10">
                 <div className="space-y-6">
                    <div>
                       <div className="flex items-center gap-3 mb-6">
                          <span className="bg-[#CCFF00] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.3)]">Source Certifiée</span>
                          <div className="flex text-black gap-0.5"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                       </div>
                       <h1 className="text-5xl lg:text-6xl font-black text-black tracking-tighter leading-[0.9] uppercase">{product.name}</h1>
                       <p className="text-lg text-gray-500 font-medium mt-8 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/10 blur-[80px] group-hover:bg-[#CCFF00]/20 transition-all" />
                       <div className="flex items-baseline gap-3 relative z-10">
                          <span className="text-5xl font-black text-black">{product.price}€</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HT / UNITÉ B2B</span>
                       </div>
                       <div className="flex items-center gap-2 mt-6 text-green-600 font-black text-[10px] uppercase tracking-widest relative z-10">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Disponible Immédiatement
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex items-center justify-between bg-gray-50 p-3 rounded-full border border-gray-100">
                          <div className="flex items-center gap-2 pl-4">
                             <div className="w-2 h-2 bg-black rounded-full" />
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantité</span>
                          </div>
                          <div className="flex items-center gap-6 pr-2">
                             <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-10 h-10 flex items-center justify-center font-black bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">-</button>
                             <span className="text-xl font-black min-w-[20px] text-center">{quantity}</span>
                             <button onClick={() => setQuantity(quantity+1)} className="w-10 h-10 flex items-center justify-center font-black bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">+</button>
                          </div>
                       </div>

                       <div className="flex flex-col gap-4">
                          <button 
                            onClick={() => { addToCart(product, quantity); navigate('/cart'); }}
                            className="w-full bg-black text-white p-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all flex items-center justify-center gap-4 hover:translate-y-[-4px] shadow-2xl"
                          >
                             Acheter Maintenant <ArrowLeft className="rotate-180" size={18} />
                          </button>
                          <button 
                            onClick={() => addToCart(product, quantity)}
                            className="w-full bg-white text-black border-2 border-black p-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4"
                          >
                             <ShoppingCart size={18} /> Ajouter au Panier
                          </button>
                       </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 grid grid-cols-2 gap-8">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-100 text-black rounded-2xl"><ShieldCheck size={24}/></div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight leading-tight">Garantie<br />Professionnelle</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-100 text-black rounded-2xl"><Globe size={24}/></div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight leading-tight">Support<br />Logistique Global</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="mt-32">
           <div className="bg-gray-50 rounded-[48px] p-16 border border-gray-100">
              <h2 className="text-4xl font-black tracking-tighter text-black mb-12 border-b border-white pb-8 uppercase">Spécifications Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 <SpecItem label="SKU" value={product.sku} />
                 <SpecItem label="Catégorie" value={product.category} />
                 <SpecItem label="Matériau" value="Aluminium 7075-T6" />
                 <SpecItem label="Certification" value="CE, FCC, RoHS" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-xl font-black text-black">{value}</span>
    </div>
  );
}
