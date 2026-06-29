"use client";
import { useApp } from '../../../contexts/AppProvider';
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Truck, CheckCircle, Clock, AlertCircle, Search, Filter, X, User, MapPin, Phone, Hash, Zap, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../../config';

export default function AdminOrders() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!newStatus) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Update status failed', err);
    }
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 selection:bg-[#1ED760]/30 selection:text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 pt-32 relative z-10">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-[#1ED760]" />
             <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">LOGISTIQUE // ADM-03</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6">
            Procurement <br/>
            <span className="text-white/10 text-7xl lg:text-9xl">Oversight.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg font-sans italic tracking-tight max-w-2xl opacity-80">
            Supervisez les cycles de vente B2B et l'exécution logistique du réseau <span className="text-white font-bold">SOLARIS</span>. 
          </p>
        </header>

        {/* FILTERS */}
        <div className="glass-obsidian rounded-[2.5rem] p-6 mb-12 flex flex-col lg:flex-row gap-6 shadow-2xl relative overflow-hidden group">
           {/* Scanning line for filter bar */}
           <div className="absolute left-0 top-0 w-full h-[1px] bg-[#1ED760]/30 shadow-[0_0_15px_rgba(136, 8, 8,0.3)] animate-[scan_10s_linear_infinite] pointer-events-none" />
          
          <div className="relative flex-1 group/search">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-[#1ED760] transition-colors" size={20}/>
            <input 
              type="text" 
              placeholder="Filtrer par ID Commande ou Client..."
              className="w-full pl-16 pr-8 py-5 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 transition-all text-sm text-white font-black tracking-widest placeholder:text-white/10 uppercase italic"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-5 glass-obsidian bg-white/5 border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-[#1ED760] hover:border-[#1ED760]/20 transition-all italic cursor-pointer group/btn">
              <Filter size={18} className="group-hover/btn:rotate-180 transition-transform duration-500"/>
              Status
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
             <div className="relative">
                <div className="h-20 w-20 rounded-full border-t-2 border-[#1ED760] animate-spin shadow-[0_0_20px_rgba(136, 8, 8,0.2)]" />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1ED760] animate-pulse" size={24}/>
             </div>
             <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[1em] italic animate-pulse">Synchronisation du flux...</p>
          </div>
        ) : (
          <div className="glass-obsidian rounded-[3.5rem] overflow-hidden shadow-2xl relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] text-[10px] font-black text-white/30 uppercase tracking-[0.4em] border-b border-white/5 italic">
                  <tr>
                    <th className="px-12 py-8">DÉTAILS COMMANDE</th>
                    <th className="px-12 py-8">CLIENT PROCUREMENT</th>
                    <th className="px-12 py-8 text-right">MONTANT TOTAL</th>
                    <th className="px-12 py-8 text-center">STATUT LOGISTIQUE</th>
                    <th className="px-12 py-8 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-all group/row relative">
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 bg-black/40 text-[#1ED760] rounded-[1.5rem] flex items-center justify-center border border-white/5 group-hover/row:scale-110 group-hover/row:shadow-[0_0_20px_rgba(136, 8, 8,0.15)] transition-all duration-700">
                            <ShoppingBag size={28} strokeWidth={1.5}/>
                          </div>
                          <div>
                            <div className="text-xl font-heading font-black text-white italic tracking-tighter uppercase group-hover/row:text-[#1ED760] transition-colors">
                              {order.order_number || `ORD-${order.id.toString().padStart(4, '0')}`}
                            </div>
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-2 italic flex items-center gap-3">
                              {new Date(order.created_at).toLocaleDateString()} <span className="w-1 h-1 bg-white/20 rounded-full" /> {order.items?.length || 0} ITEMS
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="text-lg font-heading font-black text-white italic tracking-tight uppercase">{order.user?.name || 'Client Anonyme'}</div>
                        <div className="text-[9px] font-black text-[#1ED760]/60 uppercase tracking-[0.3em] mt-2 italic">CORPORATE ACCREDITED</div>
                      </td>
                      <td className="px-12 py-10 text-right text-xl font-black text-white italic tracking-tighter font-mono">
                        {parseFloat(order.total_amount).toLocaleString()} <span className="text-[10px] opacity-40">DH</span>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic border ${
                            order.status === 'Delivered' ? 'bg-[#1ED760]/10 text-[#1ED760] border-[#1ED760]/20' :
                            order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            order.status === 'pending' || order.status === 'Processing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                            'bg-white/5 text-white/20 border-white/10'
                          }`}>
                            {(order.status === 'Delivered') && <CheckCircle size={14}/>}
                            {(order.status === 'Shipped') && <Truck size={14}/>}
                            {(order.status === 'pending' || order.status === 'Processing') && <Clock size={14}/>}
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-4 glass-obsidian bg-white/5 text-white/40 hover:text-white hover:border-[#1ED760]/30 rounded-[1.2rem] transition-all border border-white/5 cursor-pointer group/eye" 
                            title="Consulter le Dossier"
                          >
                            <Eye size={22} strokeWidth={1.5} className="group-hover/eye:scale-110 transition-transform"/>
                          </button>
                          <div className="relative group/select">
                            <select 
                              onChange={(e) => updateStatus(order.id, e.target.value)}
                              className="bg-black/60 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] rounded-[1.2rem] px-6 py-4 outline-none focus:border-[#1ED760]/30 text-white/40 hover:text-white cursor-pointer hover:bg-black transition-all appearance-none italic"
                            >
                              <option value="">STATUT</option>
                              <option value="Processing">PROCESS</option>
                              <option value="Shipped">SHIPPED</option>
                              <option value="Delivered">DONE</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6">
              <motion.div 
                className="absolute inset-0 bg-black/95 backdrop-blur-[20px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
              />
              
              <motion.div 
                className="relative glass-obsidian border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(136, 8, 8,0.1)] w-full max-w-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
              >
                {/* Header */}
                <div className="px-12 py-10 bg-black/40 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1ED760]/20" />
                  <div>
                    <h3 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter">Dossier Commande</h3>
                    <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[0.5em] mt-2 italic">{selectedOrder.order_number || `ORD-${selectedOrder.id}`}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-5 glass-obsidian bg-white/5 text-white/30 hover:text-white hover:border-[#1ED760]/30 rounded-full transition-all group/close"
                  >
                    <X size={24} className="group-hover/close:rotate-90 transition-transform duration-300"/>
                  </button>
                </div>

                {/* Body */}
                <div className="p-12 space-y-16 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-16">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4 text-[#1ED760]/60">
                        <User size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Information Client</span>
                      </div>
                      <div className="glass-obsidian p-8 rounded-[2.5rem] bg-black/20 border-white/5 transition-all hover:border-[#1ED760]/20">
                        <div className="text-2xl font-heading font-black text-white italic uppercase tracking-tighter">{selectedOrder.user?.name || 'Standard Client'}</div>
                        <div className="text-[10px] font-black text-white/30 mt-3 uppercase tracking-[0.2em] italic flex items-center gap-3">
                           <Mail size={12} /> {selectedOrder.user?.email}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-4 text-[#1ED760]/60">
                        <MapPin size={20}/>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Logistique & Flux</span>
                      </div>
                      <div className="glass-obsidian p-8 rounded-[2.5rem] bg-black/20 border-white/5 transition-all hover:border-[#1ED760]/20">
                        <div className="text-xs font-bold text-white/80 leading-relaxed italic tracking-tight">{selectedOrder.shipping_address || 'Aucune adresse enregistrée'}</div>
                        <div className="flex items-center gap-4 mt-6 text-[#1ED760] font-mono text-[10px] font-black uppercase tracking-widest italic">
                          <Phone size={14} className="opacity-40"/> {selectedOrder.phone || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-[#1ED760]/60">
                      <Hash size={20}/>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Itemization Procurement</span>
                    </div>
                    <div className="glass-obsidian rounded-[3rem] border-white/5 overflow-hidden shadow-2xl">
                      <table className="w-full text-left">
                        <thead className="bg-[#050505] text-[9px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/5 italic">
                          <tr>
                            <th className="px-10 py-5 text-white/30 italic">PRÉCISION PRODUIT</th>
                            <th className="px-10 py-5 text-center">QTÉ</th>
                            <th className="px-10 py-5 text-right">UNITÉ PRIX</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-black/10">
                          {selectedOrder.items?.map((item, idx) => (
                            <tr key={idx} className="group/item hover:bg-white/5 transition-colors">
                              <td className="px-10 py-6">
                                <span className="text-sm font-heading font-black text-white uppercase italic tracking-tight group-hover/item:text-[#1ED760] transition-colors">{item.product?.name || 'Produit Inconnu'}</span>
                              </td>
                              <td className="px-10 py-6 text-center text-xs font-mono font-black text-white/30 italic">×{item.quantity}</td>
                              <td className="px-10 py-6 text-sm font-black text-right italic font-mono text-white tracking-widest">{parseFloat(item.price).toLocaleString()} DH</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-[#050505] border-t border-[#1ED760]/20 relative">
                          <tr>
                            <td colSpan={2} className="px-10 py-8 text-[11px] font-black text-white uppercase tracking-[0.4em] italic">Estimation Engagement Total</td>
                            <td className="px-10 py-8 text-3xl font-heading font-black text-[#1ED760] text-right italic tracking-tighter leading-none shadow-[inset_0_1px_0_0_rgba(136, 8, 8,0.1)]">
                               {parseFloat(selectedOrder.total_amount).toLocaleString()} <span className="text-[14px]">DH</span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-12 py-10 bg-black/60 border-t border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] animate-pulse ${selectedOrder.status === 'Delivered' ? 'text-[#1ED760] bg-[#1ED760]' : 'text-orange-500 bg-orange-500'}`} />
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic">Statut Flux: {selectedOrder.status}</span>
                   </div>
                   <button 
                     onClick={() => setSelectedOrder(null)}
                     className="px-12 py-5 glass-obsidian bg-[#1ED760] text-black font-black text-[10px] uppercase tracking-[0.4em] italic rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(136, 8, 8,0.2)]"
                   >
                     Fermer le Dossier
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
