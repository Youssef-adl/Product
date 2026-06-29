"use client";
import { useApp } from '../../contexts/AppProvider';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Phone, Calendar, Shield, Package, ArrowRight, Loader2, Zap, Settings, Fingerprint } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config';

export default function Account() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (auth.token) {
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
          console.error("Error fetching orders:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrders();
  }, [auth.token]);

  if (!auth.user) {
    return null; // Handle unauthorized state
  }

  const user = auth.user;

  return (
    <div className="bg-transparent min-h-screen pt-40 pb-32 font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white uppercase italic">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="mb-24">
          <div className="flex flex-col gap-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
                <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[var(--accent-primary)] uppercase italic">REGISTRE PERSONNEL // USR-{user.id || '298'}</span>
             </div>
             
             <div className="relative">
                <h1 className="text-6xl lg:text-9xl font-heading font-black text-[var(--text-primary)] italic tracking-tighter uppercase leading-[0.8] mb-4">
                  User <br/>
                  <span className="text-[var(--text-primary)] opacity-5 text-7xl lg:text-[11rem] font-serif-display">Identity.</span>
                </h1>
                <div className="absolute right-0 bottom-4 hidden lg:block">
                   <div className="flex items-center gap-4 text-[10px] font-black text-[var(--accent-primary)] uppercase tracking-[0.4em] italic opacity-60">
                      <Fingerprint size={20} className="animate-pulse" /> Session Certifiée
                   </div>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* PROFILE CARD */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-obsidian rounded-[3.5rem] p-16 text-center flex flex-col items-center border border-[var(--glass-border)] shadow-2xl relative group overflow-hidden"
            >
               {/* Scanning Effect */}
               <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent-primary)]/20 shadow-[0_0_15px_var(--accent-primary)] animate-[scan_8s_linear_infinite] pointer-events-none" />
              
              <div className="relative mb-10">
                <div className="w-40 h-40 glass-obsidian rounded-[2.5rem] flex items-center justify-center border border-[var(--glass-border)] relative z-10 group-hover:scale-105 transition-transform duration-700 shadow-premium">
                  <User size={64} className="text-[var(--accent-primary)] opacity-80" />
                </div>
                <div className="absolute inset-[-20px] bg-[var(--accent-primary)]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
              </div>

              <h2 className="text-4xl font-heading font-black text-[var(--text-primary)] mb-4 uppercase tracking-tighter italic leading-none">{user.name}</h2>
              
              <div className="inline-flex items-center gap-3 px-6 py-2 glass-obsidian border-[var(--accent-primary)]/20 rounded-full mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                <span className="text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em] italic">
                  {user.role || 'Client Privé'}
                </span>
              </div>
              
              <div className="w-full space-y-6 border-t border-[var(--border-light)] pt-10">
                <div className="flex items-center justify-between px-4">
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] italic">Statut Flux</span>
                  <div className="flex items-center gap-3 text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest italic">
                    <Shield size={14} className="text-[var(--accent-primary)]" /> Protégé
                  </div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] italic">Node ID</span>
                  <span className="text-[10px] font-mono font-black text-[var(--text-muted)] uppercase tracking-widest">SLRX-{user.id || 'NFG-01'}</span>
                </div>
              </div>

              <button className="mt-12 w-full py-6 glass-obsidian border-[var(--glass-border)] rounded-2xl text-[10px] font-black text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 uppercase tracking-[0.6em] italic flex items-center justify-center gap-4">
                <Settings size={16} /> CONFIGURATION
              </button>
            </motion.div>
          </div>

          {/* DETAILS & ACTIONS */}
          <div className="lg:col-span-8 space-y-16">
            {/* PERSONAL INFO */}
            <motion.div 
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className="glass-obsidian p-16 rounded-[4rem] border border-[var(--glass-border)] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-[var(--accent-primary)]/5 blur-[120px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-20 relative z-10">
                <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] uppercase tracking-tighter italic border-l-4 border-[var(--accent-primary)] pl-6">Spécifications Profil</h3>
                <button className="px-8 py-3 glass-obsidian rounded-full text-[9px] font-black tracking-[0.4em] uppercase text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-500 border border-[var(--accent-primary)]/20 shadow-lg italic">
                  Édition
                </button>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 relative z-10">
                {[
                  { label: 'Identité Civile', value: user.name, icon: User },
                  { label: 'Canal de Communication', value: user.email, icon: Mail },
                  { label: 'Ligne Directe', value: user.phone || 'Non renseigné', icon: Phone },
                  { label: 'Affiliation', value: user.company || 'Indépendant', icon: Building }
                ].map((item, i) => (
                  <div key={i} className="group/item">
                    <div className="flex items-center gap-4 mb-6">
                       <item.icon size={16} className="text-[var(--accent-primary)] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                       <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] italic">
                         {item.label}
                       </p>
                    </div>
                    <div className="p-8 glass-obsidian bg-[var(--bg-primary)]/40 border border-[var(--glass-border)] rounded-3xl group-hover/item:border-[var(--accent-primary)]/40 transition-all duration-700 shadow-xl overflow-hidden">
                      <p className="font-heading font-black text-lg lg:text-xl text-[var(--text-primary)] uppercase tracking-tight italic break-all leading-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ORDERS PREVIEW */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="glass-obsidian p-16 rounded-[4rem] border border-[var(--glass-border)] shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-16">
                <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] uppercase tracking-tighter italic border-l-4 border-[var(--accent-secondary)] pl-6">Historique Flux</h3>
                <Link href="/orders" className="flex items-center gap-4 text-[10px] font-black tracking-[0.5em] uppercase text-[var(--accent-secondary)] hover:translate-x-3 transition-all italic duration-500">
                  Archives <ArrowRight size={16} />
                </Link>
              </div>
 
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-8">
                   <Loader2 size={40} className="animate-spin text-[var(--accent-primary)] opacity-50" />
                   <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[1em] italic animate-pulse">Extraction des registres...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-8">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-8 lg:p-10 rounded-[3rem] glass-obsidian border border-[var(--glass-border)] hover:border-[var(--accent-primary)]/30 transition-all duration-700 group/order relative overflow-hidden bg-[var(--bg-primary)]/40">
                      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 glass-obsidian rounded-2xl flex items-center justify-center border border-[var(--glass-border)] group-hover/order:scale-110 group-hover/order:border-[var(--accent-primary)]/20 transition-all duration-700 shadow-2xl shrink-0">
                            <Package size={24} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-2 italic">FLUX REF. {order.order_number}</p>
                            <p className="text-xl lg:text-2xl font-heading font-black text-[var(--text-primary)] uppercase tracking-tighter italic leading-none">
                              {order.items?.length} Unités <span className="mx-2 text-[var(--text-muted)] opacity-30">//</span> {new Date(order.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
                          <p className="text-3xl lg:text-4xl font-heading font-black text-[var(--text-primary)] italic tracking-tighter group-hover/order:text-[var(--accent-primary)] transition-colors">
                             {parseFloat(order.total_amount).toFixed(2).toLocaleString()} <span className="text-xs lg:text-sm">DH</span>
                          </p>
                          <span className={`text-[8px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full italic shadow-premium border ${
                            order.status === 'pending' ? 'bg-blue-500/10 text-blue-400 border-blue-400/20' : 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20'
                          }`}>
                            {order.status === 'pending' ? 'EN TRANSIT' : 'ARCHIVÉ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center glass-obsidian rounded-[3rem] border border-[var(--glass-border)] bg-[var(--text-primary)]/[0.01]">
                  <div className="w-24 h-24 glass-obsidian rounded-[2rem] flex items-center justify-center mb-12 border border-[var(--glass-border)] shadow-2xl">
                    <Package size={40} className="text-[var(--text-muted)]" />
                  </div>
                  <h4 className="text-2xl font-heading font-black text-[var(--text-muted)] uppercase tracking-tighter mb-4 italic">Registre Vide.</h4>
                  <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic">Aucune acquisition enregistrée dans le flux actuel.</p>
                  <Link href="/boutique" className="px-12 py-5 glass-obsidian border-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full font-black uppercase tracking-[0.5em] text-[11px] hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-xl italic">
                    Ouvrir le Catalogue
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
