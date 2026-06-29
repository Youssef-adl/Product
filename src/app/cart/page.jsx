"use client";
import { useApp } from '../../contexts/AppProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, ChevronLeft, Package, CheckCircle } from 'lucide-react';


export default function Cart() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const router = useRouter();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 8.00; // Updated to match user estimate base
  const total = subtotal + (cart.length > 0 ? shipping : 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-transparent min-h-screen pt-40 pb-24 font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white uppercase italic">
      {/* Background Accents */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="container-solar mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* LEFT: CART ITEMS */}
           <div className="lg:col-span-8 flex-1">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex flex-col">
                    <h1 className="text-5xl font-heading font-black tracking-tighter text-white uppercase italic leading-none">Flux <br/><span className="text-[var(--accent-primary)] opacity-80">Sourcing</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                       <div className="h-[1px] w-8 bg-[var(--accent-primary)]/30" />
                       <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] italic">Archive Active 2028</span>
                    </div>
                 </div>
                 <div className="glass-obsidian px-6 py-2 rounded-full border border-white/10">
                    <span className="text-[10px] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em] italic">{totalItems} COMPOSANTS</span>
                 </div>
              </div>

              {cart.length === 0 ? (
                <div className="glass-obsidian rounded-[4rem] p-24 text-center border border-white/10 shadow-5xl flex flex-col items-center group overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <div className="w-24 h-24 glass-obsidian rounded-full flex items-center justify-center text-white/10 mb-10 border border-white/5 shadow-3xl group-hover:border-[var(--accent-primary)]/50 transition-all duration-700">
                      <ShoppingBag size={42} className="group-hover:text-[var(--accent-primary)] transition-colors duration-700 stroke-[1.5]" />
                   </div>
                   <h2 className="text-3xl font-heading font-black text-white mb-4 uppercase italic tracking-tighter">Flux Vide</h2>
                   <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mb-12 max-w-sm italic leading-relaxed">Aucun composant technologique n'a été indexé dans votre archive de procurement.</p>
                   <Link href="/boutique" className="group/btn relative px-12 py-5 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] hover:scale-105 transition-all duration-700 italic flex items-center gap-4">
                      <span className="relative z-10">EXPLORER L'ARCHIVE</span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 stroke-[3]" />
                   </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="glass-obsidian rounded-[3rem] p-10 border border-white/10 shadow-4xl flex flex-col md:flex-row items-center gap-10 group hover:border-[var(--accent-primary)]/30 transition-all duration-700 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-widest italic">INDEXED SOL-28</span>
                         </div>
                         
                         <div className="w-36 h-36 glass-obsidian rounded-3xl flex items-center justify-center p-6 overflow-hidden flex-shrink-0 border border-white/5 transition-all duration-700 group-hover:scale-105 shadow-2xl">
                            {item.image_url || item.image || (item.images && item.images[0]) ? (
                              <img src={item.image_url || item.image || (item.images && item.images[0])} alt={item.name} className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-90 group-hover:scale-110" />
                            ) : (
                              <Package size={42} className="text-white/10 group-hover:text-[var(--accent-primary)]/50 transition-colors duration-700" />
                            )}
                         </div>
                         
                         <div className="flex-1 w-full relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
                               <div className="space-y-2">
                                  <h3 className="text-2xl font-heading font-black text-white tracking-tighter uppercase italic group-hover:text-[var(--accent-primary)] transition-colors duration-700">{item.name}</h3>
                                   <div className="flex items-center gap-3">
                                      <div className="w-4 h-[1px] bg-white/10" />
                                      <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] italic">SPEC: {item.sku || 'SOL-PROTO-9'}</p>
                                   </div>
                                   
                                   <div className="flex items-center gap-6 mt-8">
                                      <div className="flex items-center glass-obsidian rounded-full border border-white/10 p-1">
                                         <button 
                                           onClick={() => updateQuantity(item.id, -1)}
                                           className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all bg-transparent font-black text-lg cursor-pointer border-none"
                                         >
                                           -
                                         </button>
                                         <span className="w-12 text-center text-xs font-black text-white italic">{item.quantity}</span>
                                         <button 
                                           onClick={() => updateQuantity(item.id, 1)}
                                           className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all bg-transparent font-black text-lg cursor-pointer border-none"
                                         >
                                           +
                                         </button>
                                      </div>
                                   </div>
                               </div>
                                <div className="text-left md:text-right">
                                   <div className="text-3xl font-heading font-black text-white italic tracking-tighter">{(item.price * item.quantity).toFixed(2)} <span className="text-sm opacity-50">DH</span></div>
                                   <div className="text-[9px] font-black text-white/20 mt-2 uppercase tracking-[0.3em] italic">{item.price} DH / UNITÉ</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/5">
                               <span className="text-[9px] font-black text-[var(--accent-primary)] flex items-center gap-3 uppercase tracking-[0.4em] italic">
                                  <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_rgba(136, 8, 8,1)]" /> Flux Actif
                               </span>
                               <button 
                                 onClick={() => removeFromCart(item.id)}
                                 className="text-white/20 hover:text-red-500 transition-all bg-transparent border-none cursor-pointer flex items-center gap-3 uppercase text-[9px] font-black tracking-[0.3em] italic group/del"
                               >
                                  <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" /> TERMINER FLUX
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
              )}
           </div>

           {/* RIGHT: SUMMARY */}
           <div className="lg:w-[28rem]">
              <div className="glass-obsidian rounded-[3.5rem] p-12 border border-white/10 shadow-5xl sticky top-40 overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent-primary)]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.5)] animate-[scan_5s_linear_infinite]" />
                 
                 <h2 className="text-2xl font-heading font-black text-white mb-10 uppercase italic tracking-tighter">Protocol Summary</h2>
                 
                 <div className="space-y-6 mb-12">
                    <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">
                       <span>Archive Totale</span>
                       <span className="text-white">{subtotal.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic py-4 border-y border-white/5">
                       <span>Taxes Logistiques</span>
                       <span className="text-white">FIXE 8.00 DH</span>
                    </div>
                    <div className="pt-4 flex flex-col gap-2">
                       <span className="text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-[0.5em] italic">Paiement Final</span>
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-black text-white/10 uppercase tracking-[0.5em] italic pb-1">Total</span>
                          <span className="text-5xl font-heading font-black text-white italic tracking-tighter leading-none">{total.toFixed(2)} <span className="text-xl opacity-30">DH</span></span>
                       </div>
                    </div>
                 </div>

                 <button 
                   onClick={() => router.push('/checkout')}
                   disabled={cart.length === 0}
                   className="group/checkout relative w-full flex items-center justify-center gap-4 py-8 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-[0.6em] hover:scale-[1.05] active:scale-[0.98] transition-all duration-700 outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-3xl italic"
                 >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/checkout:opacity-100 transition-opacity blur-2xl" />
                    <span className="relative z-10">INITIALISER COMMANDE</span> 
                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-4 transition-transform duration-500 stroke-[3]" />
                 </button>

                 <div className="mt-12 pt-10 border-t border-white/5">
                    <div className="flex items-start gap-6 text-white/20">
                       <ShieldCheck size={24} className="text-[var(--accent-primary)] opacity-50 mt-1" />
                       <div className="flex flex-col gap-2">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] leading-relaxed italic text-white/40">
                             Protocole de SÉCURITÉ SOLARIS-X
                          </p>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-relaxed italic">
                             Transactions chiffrées de bout-en-bout. <br/>
                             Validation par Archive Centrale Solaris.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
