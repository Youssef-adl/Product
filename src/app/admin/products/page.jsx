"use client";
import { useApp } from '../../../contexts/AppProvider';
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, Filter, AlertCircle, X, Zap, ChevronRight, Layers, BarChart3, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../../config';

export default function AdminProducts() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      setError('Impossible de synchroniser le catalogue.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `${API_BASE_URL}/api/products/${currentProduct.id}` 
      : `${API_BASE_URL}/api/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(currentProduct)
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
        closeModal();
      } else {
        alert(JSON.stringify(data.errors));
      }
    } catch (err) {
      console.error('Sauvegarde échouée', err);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Confirmer la suppression de cet actif ?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      });
      fetchProducts();
    } catch (err) {
      console.error('Suppression échouée', err);
    }
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 selection:bg-[#1ED760]/30 selection:text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 pt-32 relative z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-[#1ED760]" />
               <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">INVENTAIRE // ADM-04</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6">
              Solaris <br/>
              <span className="text-white/10 text-7xl lg:text-9xl">Inventory.</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg font-sans italic tracking-tight max-w-2xl opacity-80">
              Gérez les actifs technologiques et les niveaux de stock de l'écosystème <span className="text-white font-bold">SOLARIS LUX</span>.
            </p>
          </div>
          
          <button 
            onClick={() => openModal()}
            className="group relative flex items-center justify-center gap-4 bg-[#1ED760] text-black px-10 py-6 rounded-2xl hover:scale-105 active:scale-95 transition-all font-black text-[10px] uppercase tracking-[0.3em] italic outline-none shadow-[0_20px_40px_rgba(136, 8, 8,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Plus size={20} className="relative z-10 stroke-[3px]"/>
            <span className="relative z-10">Nouvel Actif Solaris</span>
          </button>
        </header>

        {/* STATS PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
                { label: 'Total Actifs', value: products.length, icon: Layers },
                { label: 'Valeur Stock', value: `${(products.reduce((acc, p) => acc + (parseFloat(p.price) * p.stock), 0) / 1000).toFixed(1)}K DH`, icon: BarChart3 },
                { label: 'Intégrité Flux', value: '100%', icon: Database }
            ].map((stat, i) => (
                <div key={i} className="glass-obsidian p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                        <stat.icon size={60} strokeWidth={1}/>
                    </div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic mb-3">{stat.label}</div>
                    <div className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase">{stat.value}</div>
                </div>
            ))}
        </div>

        {/* LOADING & ERRORS */}
        {loading && (
            <div className="flex flex-col items-center justify-center py-40 gap-8">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-2 border-[#1ED760] animate-spin shadow-[0_0_30px_rgba(136, 8, 8,0.2)]" />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1ED760] animate-pulse" size={28}/>
                </div>
                <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[1em] italic animate-pulse">Scan du catalogue technologique...</p>
            </div>
        )}
        
        {error && (
          <div className="glass-obsidian border-[#EF4444]/20 p-8 rounded-[2.5rem] flex items-center gap-6 text-[#EF4444] mb-12 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative overflow-hidden">
            <div className="absolute left-0 top-0 w-2 h-full bg-[#EF4444]" />
            <div className="p-4 bg-[#EF4444]/10 rounded-2xl"><AlertCircle size={24}/></div>
            <div className="text-[11px] font-black uppercase tracking-[0.3em] italic">{error}</div>
          </div>
        )}
        {!loading && !error && (
          <div className="glass-obsidian rounded-[3.5rem] overflow-hidden shadow-2xl relative mb-24 border-white/5">
             <div className="absolute left-0 top-0 w-full h-[1px] bg-[#1ED760]/20 shadow-[0_0_15px_rgba(136, 8, 8,0.2)] animate-[scan_15s_linear_infinite] pointer-events-none" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] text-[10px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/5 italic">
                  <tr>
                    <th className="px-12 py-8">PRÉCISION PRODUIT</th>
                    <th className="px-12 py-8">SKU ACCRÉDITATION</th>
                    <th className="px-12 py-8 text-center">CATÉGORIE</th>
                    <th className="px-12 py-8 text-right">VALEUR UNITAIRE</th>
                    <th className="px-12 py-8 text-center">ÉTAT FLUX</th>
                    <th className="px-12 py-8 text-right">PROTOCOLES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="group/row hover:bg-white/[0.02] transition-all duration-500">
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-10">
                          {/* Signature Oval Image Container */}
                          <div className="relative w-16 h-28 flex-shrink-0">
                            <div className="absolute inset-0 rounded-full border border-white/10 group-hover/row:border-[#1ED760]/40 transition-all duration-700" />
                            <div className="absolute inset-[2px] rounded-full border border-white/5 overflow-hidden bg-[#080808] flex items-center justify-center">
                               {p.image_url ? (
                                 <img 
                                   src={p.image_url} 
                                   alt={p.name} 
                                   className="w-full h-full object-cover opacity-40 group-hover/row:opacity-100 group-hover/row:scale-110 transition-all duration-700" 
                                 />
                               ) : (
                                 <Package className="text-white/10 group-hover/row:text-[#1ED760]/20 transition-colors" size={24} />
                               )}
                            </div>
                            <div className="absolute -inset-2 bg-[#1ED760]/5 rounded-full blur-2xl opacity-0 group-hover/row:opacity-100 transition-opacity duration-700" />
                          </div>
                          
                          {/* Typography Implementation */}
                          <div className="relative">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-[0.9] mb-2 flex flex-wrap gap-x-2">
                               {p.name.split(' ').map((word, i) => (
                                 <span 
                                   key={i} 
                                   className={
                                     word.toUpperCase().includes('TITANE') || 
                                     word.toUpperCase().includes('V1') || 
                                     word.toUpperCase().includes('V2') || 
                                     word.toUpperCase().includes('SMARTCHARGE') ||
                                     word.toUpperCase().includes('SOLARIS') 
                                     ? 'text-[#1ED760]' : 'text-white'
                                   }
                                 >
                                   {word}
                                 </span>
                               ))}
                            </h2>
                            <div className="flex items-center gap-3">
                               <span className="text-[#1ED760] font-black text-[10px] animate-pulse">#</span>
                               <span className="text-white/20 font-mono text-[10px] font-black tracking-[0.4em] uppercase group-hover/row:text-white/40 transition-colors">
                                 {p.sku || '0000'}
                               </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                         <div className="font-mono text-[10px] font-black text-white/40 tracking-[0.3em] group-hover/row:text-[#1ED760]/60 transition-colors">
                             {p.sku || 'N/A'}
                         </div>
                      </td>
                      <td className="px-12 py-10 text-center">
                        <span className="px-5 py-2.5 glass-obsidian bg-white/5 border-white/5 text-white/60 text-[9px] uppercase tracking-[0.3em] font-black italic rounded-full shadow-lg group-hover/row:border-[#1ED760]/20 transition-all">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-12 py-10 text-right">
                         <div className="text-xl font-black text-white italic tracking-tighter font-mono group-hover/row:scale-110 transition-transform origin-right duration-500">
                             {parseFloat(p.price).toLocaleString()} <span className="text-[10px] opacity-30">DH</span>
                         </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-1000 ${p.stock < 20 ? 'bg-[#EF4444]' : 'bg-[#1ED760]'}`} 
                                style={{ width: `${Math.min(100, (p.stock / 200) * 100)}%` }}
                             />
                          </div>
                          <div className={`text-[9px] font-black uppercase tracking-[0.3em] italic ${p.stock < 20 ? 'text-[#EF4444]' : 'text-white/40'}`}>
                              {p.stock} UNITÉS
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <div className="flex justify-end gap-5">
                          <button 
                            onClick={() => openModal(p)}
                            className="p-4 glass-obsidian bg-white/5 text-white/20 hover:text-white hover:border-[#1ED760]/30 rounded-[1.2rem] transition-all cursor-pointer group/action" 
                            title="Éditer"
                          >
                            <Edit size={20} strokeWidth={1.5} className="group-hover/action:rotate-12 transition-transform"/>
                          </button>
                          <button 
                            onClick={() => deleteProduct(p.id)}
                            className="p-4 glass-obsidian bg-white/5 text-white/20 hover:text-[#EF4444] hover:border-[#EF4444]/30 rounded-[1.2rem] transition-all cursor-pointer group/delete" 
                            title="Supprimer"
                          >
                            <Trash2 size={20} strokeWidth={1.5} className="group-hover/delete:scale-110 transition-transform"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* PRODUCT MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6">
              <motion.div 
                className="absolute inset-0 bg-black/95 backdrop-blur-[20px]" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              />
              <motion.div 
                className="relative glass-obsidian border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(136, 8, 8,0.1)] w-full max-w-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
              >
                <div className="px-12 py-10 bg-black/40 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1ED760]/20" />
                  <div>
                    <h3 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter">
                        {isEditing ? 'Édition Actif' : 'Nouveau Protocole'}
                    </h3>
                    <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[0.5em] mt-2 italic">CONFIG COMMANDER // SOLARIS</p>
                  </div>
                  <button onClick={closeModal} className="p-5 glass-obsidian bg-white/5 text-white/30 hover:text-white hover:border-[#1ED760]/30 rounded-full transition-all group/close">
                    <X size={24} className="group-hover/close:rotate-90 transition-transform duration-300"/>
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-12 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-2 space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Nom de l'Actif</label>
                      <input 
                        type="text" 
                        required
                        value={currentProduct.name}
                        onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                        className="w-full px-8 py-5 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-black text-lg tracking-tighter italic transition-all appearance-none"
                        placeholder="SOLARIS CORE V2"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Accréditation SKU</label>
                      <input 
                        type="text" 
                        required
                        value={currentProduct.sku}
                        onChange={e => setCurrentProduct({...currentProduct, sku: e.target.value})}
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-mono text-xs font-black tracking-widest uppercase transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Secteur Catégorie</label>
                      <div className="relative group/select">
                        <select 
                          value={currentProduct.category}
                          onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                          className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-black text-[10px] tracking-[0.2em] uppercase transition-all appearance-none italic cursor-pointer"
                        >
                          <option>UNITÉ PRINCIPALE</option>
                          <option>ACCESSOIRE</option>
                          <option>BUNDLES</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none group-hover/select:text-[#1ED760] transition-colors" size={16}/>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Valeur DH</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={currentProduct.price}
                        onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})}
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-mono text-lg font-black tracking-tighter italic transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Niveau Stock</label>
                      <input 
                        type="number" 
                        required
                        value={currentProduct.stock}
                        onChange={e => setCurrentProduct({...currentProduct, stock: e.target.value})}
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-mono text-lg font-black tracking-tighter italic transition-all"
                      />
                    </div>

                    <div className="col-span-2 space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Asset Image Link</label>
                      <input 
                        type="text" 
                        value={currentProduct.image_url || ''}
                        onChange={e => setCurrentProduct({...currentProduct, image_url: e.target.value})}
                        placeholder="/assets/product-v1.png"
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-[#1ED760]/60 font-mono text-[10px] transition-all"
                      />
                    </div>

                    <div className="col-span-2 space-y-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Spécification Technique</label>
                      <input 
                        type="text" 
                        value={currentProduct.spec || ''}
                        onChange={e => setCurrentProduct({...currentProduct, spec: e.target.value})}
                        placeholder="TITANE G5 USINÉ // OPTIQUE 4K"
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-black text-[10px] tracking-[0.3em] uppercase italic transition-all"
                      />
                    </div>

                    <div className="col-span-2 space-y-4 pb-4">
                      <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic pl-2">Bref Descriptif</label>
                      <textarea 
                        rows={3}
                        value={currentProduct.description || ''}
                        onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                        className="w-full px-6 py-4 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 text-white font-sans text-sm italic tracking-tight transition-all resize-none"
                        placeholder="Détails du produit..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-8 mt-4 rounded-3xl bg-[#1ED760] text-black font-black text-[11px] uppercase tracking-[0.5em] italic hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(136, 8, 8,0.3)] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10">{isEditing ? 'Valider les Modifications' : 'Enregistrer dans le Catalogue'}</span>
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
