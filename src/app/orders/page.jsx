"use client";
import { useApp } from '../../contexts/AppProvider';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ArrowLeft, Loader2, MapPin, Phone, RefreshCcw, X, CheckCheck, AlertTriangle } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config';

export default function Orders() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [returnOrder, setReturnOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [isReturning, setIsReturning] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(null);
  const [returnError, setReturnError] = useState(null);

  useEffect(() => {
    if (auth.token) {
      fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(err => console.error("Error fetching orders:", err))
      .finally(() => setIsLoading(false));
    }
  }, [auth.token]);

  if (!auth.user) {
    return null; // Handle unauthorized state
  }

  const handleReturnSubmit = async () => {
    if (!returnReason || !returnOrder) return;
    setIsReturning(true);
    setReturnError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/return-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          order_id: returnOrder.id,
          reason: returnReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReturnSuccess(returnOrder.order_number);
        setReturnOrder(null);
        setReturnReason('');
      } else {
        setReturnError(data.message || 'Erreur lors de la demande.');
      }
    } catch (err) {
      setReturnError('Erreur réseau. Réessayez.');
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen pt-40 pb-24 font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white uppercase italic">
      {/* Background Accents */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-solar mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-7xl font-heading font-black text-[var(--text-primary)] tracking-tighter uppercase italic leading-none">
              Archive <br/>
              <span className="text-[var(--accent-primary)] opacity-80">Commandes</span>
            </h1>
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-24 bg-[var(--accent-primary)]/40 shadow-[0_0_8px_var(--accent-primary)]" />
               <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.6em] italic leading-relaxed">
                 BASE DE DONNÉES LOGISTIQUE SOLARIS-X <span className="text-[var(--text-muted)] opacity-50 px-4">//</span> INDEX ACTIF
               </p>
            </div>
          </motion.div>
        </div>

        {/* SUCCESS BANNER */}
        <AnimatePresence>
          {returnSuccess && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 p-8 rounded-[3rem] glass-obsidian border-[var(--accent-primary)]/30 flex items-center gap-6 overflow-hidden relative shadow-premium"
            >
               <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent-primary)]/40 shadow-[0_0_15px_var(--accent-primary)] animate-[scan_5s_linear_infinite] pointer-events-none" />
              <CheckCheck size={20} className="text-[var(--accent-primary)]" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Demande de retour envoyée !</p>
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider">Commande {returnSuccess} — Notre équipe vous contactera sous 24h.</p>
              </div>
              <button onClick={() => setReturnSuccess(null)} className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"><X size={18} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 glass-obsidian rounded-[4rem] border border-[var(--glass-border)]">
             <Loader2 size={40} className="animate-spin text-[var(--accent-primary)] mb-6 opacity-80" />
             <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] animate-pulse">Synchronisation chiffrée...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-12">
             {orders.map((order) => (
               <div key={order.id} className="glass-obsidian rounded-[4rem] overflow-hidden border border-[var(--glass-border)] hover:border-[var(--accent-primary)]/30 transition-all duration-700 group/card shadow-premium">
                  {/* ORDER HEADER */}
                  <div className="bg-[var(--text-primary)]/[0.01] p-8 md:p-12 border-b border-[var(--border-light)] flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                     <div className="flex flex-wrap gap-x-16 gap-y-8">
                         <div>
                            <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-3 italic">N° Transaction</p>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse flex-shrink-0" />
                              <span className="font-mono text-sm font-black text-[var(--accent-primary)] tracking-[0.15em] bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 px-5 py-2 rounded-full group-hover/card:bg-[var(--accent-primary)]/10 group-hover/card:border-[var(--accent-primary)]/40 transition-all duration-500 shadow-premium">
                                {order.order_number}
                              </span>
                            </div>
                         </div>
                        <div>
                           <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-3 italic">Acquisition</p>
                           <p className="text-lg font-black text-[var(--text-primary)] tracking-widest">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                     </div>
                     <div className="flex flex-wrap items-center gap-10 md:gap-16">
                        <div className="text-left md:text-right">
                           <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-3 italic">État du flux</p>
                           <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full italic shadow-premium transition-all ${
                             order.status === 'pending' 
                               ? 'bg-blue-500/10 text-blue-400 border border-blue-400/30' 
                               : 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                           }`}>
                             {order.status === 'pending' ? <Truck size={12} strokeWidth={3}/> : <CheckCircle size={12} strokeWidth={3}/>}
                             {order.status === 'pending' ? 'Transit' : 'Validé'}
                           </span>
                        </div>
                        <div className="h-16 w-[1px] bg-[var(--border-light)] hidden md:block"></div>
                        <div className="text-left md:text-right">
                           <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-3 italic">Investissement</p>
                           <p className="text-5xl font-heading font-black text-[var(--text-primary)] italic tracking-tighter">{parseFloat(order.total_amount).toFixed(2)} <span className="text-xl text-[var(--accent-primary)] opacity-80">DH</span></p>
                        </div>
                     </div>
                  </div>

                  {/* ORDER CONTENT */}
                  <div className="p-8 md:p-12">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* ARTICLES */}
                        <div>
                           <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-10 italic flex items-center gap-4">
                              Spécimens Acquis
                              <div className="h-[1px] flex-grow bg-[var(--border-light)]"></div>
                           </h4>
                           <div className="space-y-6">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-8 p-6 rounded-[2.5rem] bg-[var(--text-primary)]/[0.01] border border-[var(--border-light)] hover:bg-[var(--text-primary)]/[0.03] hover:border-[var(--accent-primary)]/40 transition-all duration-500 group/item">
                                   <div className="relative w-24 h-24 bg-[var(--text-primary)]/5 rounded-[1.5rem] flex items-center justify-center p-5 border border-[var(--glass-border)] overflow-hidden group-hover/item:scale-105 transition-all shadow-premium">
                                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)]/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                      <img src={item.product?.image_url} alt="" className="w-full h-full object-contain mix-blend-screen transition-all" onError={(e) => e.target.src = '/noise.svg'} />
                                   </div>
                                   <div>
                                      <p className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic mb-1 group-hover/item:text-[var(--accent-primary)] transition-colors">{item.product?.name}</p>
                                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] flex items-center gap-3">
                                        UNITÉS: <span className="text-[var(--text-primary)]">{item.quantity}</span> 
                                        <span className="w-1 h-1 bg-[var(--text-muted)] opacity-20 rounded-full"></span>
                                        <span className="text-[var(--accent-primary)]">{parseFloat(item.price).toFixed(2)} DH</span>
                                      </p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* SHIPPING & CONTACT */}
                        <div className="space-y-12">
                           <div>
                              <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-10 italic flex items-center gap-4">
                                 <MapPin size={16} className="text-[var(--accent-primary)] opacity-50" /> 
                                 Coordonnées de Livraison
                              </h4>
                              <div className="p-8 rounded-[2.5rem] bg-[var(--text-primary)]/[0.01] border border-[var(--border-light)] group-hover/card:border-[var(--glass-border)] transition-colors shadow-premium">
                                <p className="text-sm font-black text-[var(--text-primary)] leading-relaxed uppercase tracking-[0.25em]">
                                   {order.shipping_address}
                                </p>
                              </div>
                           </div>
                           
                           {order.phone && (
                              <div>
                                 <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-10 italic flex items-center gap-4">
                                    <Phone size={16} className="text-[var(--accent-primary)] opacity-50" /> 
                                    Canal Logistique
                                 </h4>
                                 <div className="p-8 rounded-[2.5rem] bg-[var(--text-primary)]/[0.01] border border-[var(--border-light)] inline-block group-hover/card:border-[var(--glass-border)] transition-colors shadow-premium">
                                   <p className="text-lg font-black text-[var(--text-primary)] tracking-[0.3em]">
                                      {order.phone}
                                   </p>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* RETURN ACTION */}
                     <div className="mt-16 pt-12 border-t border-[var(--border-light)] flex justify-start">
                       <button 
                         onClick={() => setReturnOrder(order)}
                         className="group/btn flex items-center justify-center gap-5 px-12 py-5 rounded-[2rem] border border-[var(--glass-border)] text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)] transition-all duration-500 shadow-premium"
                       >
                         <RefreshCcw size={18} className="group-hover/btn:rotate-180 transition-transform duration-700" />
                         Initier une réclamation
                       </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="glass-obsidian p-24 rounded-[4rem] text-center border border-[var(--glass-border)]">
             <div className="w-24 h-24 bg-[var(--text-primary)]/5 rounded-full flex items-center justify-center mb-10 mx-auto border border-[var(--glass-border)] shadow-inner">
                <Package size={36} className="text-[var(--text-muted)] opacity-20" />
             </div>
             <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] mb-4 uppercase italic tracking-widest">Zone de Vide</h3>
             <p className="text-[var(--text-muted)] text-[10px] uppercase font-black tracking-[0.5em] lg:max-w-md mx-auto mb-12 leading-loose">
                Le registre ne contient aucune archive liée à votre identité numérique.
             </p>
             <Link href="/boutique" className="inline-flex items-center gap-4 px-12 py-5 bg-[var(--accent-primary)] text-white rounded-full font-black uppercase tracking-[0.3em] text-[11px] hover:scale-105 transition-transform no-underline shadow-premium">
                Accéder au Store
             </Link>
          </div>
        )}

        {/* RETURN MODAL */}
        <AnimatePresence>
          {returnOrder && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4" onClick={() => setReturnOrder(null)}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-lg glass-obsidian rounded-[3rem] p-12 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-[var(--glass-border)]" 
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setReturnOrder(null)} 
                  className="absolute top-8 right-8 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-[var(--accent-primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[var(--accent-primary)]/20">
                    <RefreshCcw size={28} className="text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="font-heading text-3xl font-black italic uppercase mb-2 text-[var(--text-primary)] tracking-tighter">Réclamation Post-Vente</h3>
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)]">Flux {returnOrder.order_number}</p>
                </div>
                
                {returnError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-4"
                  >
                    <AlertTriangle size={18} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{returnError}</span>
                  </motion.div>
                )}

                <div className="mb-12">
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] mb-5 text-[var(--text-muted)] ml-2">Motif du Signalement</label>
                  <select 
                    value={returnReason} 
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full glass-obsidian border-[var(--glass-border)] rounded-2xl p-5 text-sm font-black outline-none cursor-pointer appearance-none text-[var(--text-primary)] focus:border-[var(--accent-primary)]/40 transition-colors uppercase tracking-widest"
                  >
                    <option value="" disabled className="bg-[var(--bg-primary)]">SÉLECTION DU MOTIF</option>
                    <option value="not_liked" className="bg-[var(--bg-primary)]">NON-CONFORMITÉ ESTHÉTIQUE</option>
                    <option value="defective" className="bg-[var(--bg-primary)]">DÉFAILLANCE TECHNIQUE</option>
                    <option value="wrong_item" className="bg-[var(--bg-primary)]">ERREUR DE FLUX LOGISTIQUE</option>
                    <option value="other" className="bg-[var(--bg-primary)]">AUTRE JUSTIFICATION</option>
                  </select>
                </div>

                <button 
                  disabled={!returnReason || isReturning}
                  onClick={handleReturnSubmit}
                  className="w-full flex items-center justify-center gap-4 py-6 rounded-2xl bg-[var(--accent-primary)] text-white text-[12px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_-10px_rgba(136, 8, 8,0.3)]"
                >
                  {isReturning ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                  {isReturning ? 'Transmission en cours...' : 'Valider le Signalement'}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
