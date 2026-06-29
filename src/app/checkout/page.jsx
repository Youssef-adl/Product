"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, ShieldCheck, CheckCircle, Package, ArrowLeft, ArrowRight, Building, MapPin, Phone } from 'lucide-react';
import { useApp } from '../../contexts/AppProvider';

export default function Checkout() {
  const { auth, cart, clearCart } = useApp();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone: '',
    company: auth?.user?.company || '',
    payment_method: 'T/T Transfer'
  });

  const paymentMethods = [
    { id: 'Visa', name: 'VISA', colorClass: 'bg-[#1434CB] text-white border-[#1434CB]' },
    { id: 'Mastercard', name: 'MASTERCARD', colorClass: 'bg-[#EB001B] text-white border-[#EB001B]' },
    { id: 'T/T Transfer', name: 'T/T TRANSFER', colorClass: 'bg-[#005A9C] text-white border-[#005A9C]' },
    { id: 'L/C', name: 'L/C', colorClass: 'bg-[#333333] text-white border-[#333333]' }
  ];

  useEffect(() => {
    if (auth.status !== 'loading' && !auth.user) {
      router.push('/login?redirect=checkout');
    }
  }, [auth, router]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 8.00; 
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    const orderData = {
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: total,
      shipping_address: formData.shipping_address,
      phone: formData.phone,
      status: 'pending'
    };

    try {
      const response = await fetch(`/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        clearCart();
        router.push(`/order-confirmation?orderId=${result.order.id}`);
      } else {
        // Handle validation errors from Laravel
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join('\n');
          alert(`Erreur de validation :\n${errorMessages}`);
        } else {
          alert(result.message || result.error || 'Échec du traitement de la commande. Veuillez vérifier vos données.');
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert('Erreur de connexion au serveur.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (auth.status === 'loading' || !auth.user) return null;

  return (
    <div className="bg-transparent min-h-screen pt-40 pb-40 overflow-hidden relative font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white uppercase italic">
      {/* Background Accents */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-solar relative z-10 px-6 md:px-16 mx-auto">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
           
           {/* LEFT: CHECKOUT FORM (8 cols) */}
           <div className="lg:col-span-8 space-y-12">
              <div className="flex flex-col gap-4 mb-16">
                 <div className="flex items-center gap-4 text-[var(--accent-primary)] mb-2">
                    <div className="w-12 h-[1px] bg-[var(--accent-primary)]/40" />
                    <span className="text-[10px] font-black tracking-[0.6em] uppercase italic">Sécurisation Flux Archive</span>
                 </div>
                 <h1 className="text-6xl lg:text-8xl font-heading font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                    Validation <br/>
                    <span className="text-[var(--accent-primary)] opacity-80">Protocole</span>
                 </h1>
              </div>

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
                <div className="glass-obsidian rounded-[3.5rem] p-12 lg:p-16 border border-white/10 shadow-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-[30%] h-full bg-[var(--accent-primary)]/5 blur-[100px] pointer-events-none" />
                   
                   <h2 className="text-2xl font-heading font-black text-white mb-16 flex items-center gap-6 uppercase tracking-widest italic group-hover:text-[var(--accent-primary)] transition-colors duration-700">
                      <Truck size={32} className="text-[var(--accent-primary)] stroke-[2.5]"/> Destination Logistique
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="md:col-span-2">
                         <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 italic pt-1">Coordonnées de Livraison</label>
                         <div className="relative group/field">
                            <MapPin className="absolute left-10 top-8 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" size={24} />
                            <textarea 
                               required
                               rows="3"
                               className="w-full glass-obsidian border border-white/5 rounded-[2.5rem] pl-24 pr-10 py-7 focus:border-[var(--accent-primary)]/50 focus:ring-4 focus:ring-[var(--accent-primary)]/5 outline-none transition-all duration-700 font-black text-sm text-white uppercase tracking-wider italic placeholder:text-white/10"
                               placeholder="RUE, VILLE, ZONE INDUSTRIELLE, CODE POSTAL..."
                               value={formData.shipping_address}
                               onChange={e => setFormData({...formData, shipping_address: e.target.value})}
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 italic pt-1">Terminal de Contact</label>
                         <div className="relative group/field">
                            <Phone className="absolute left-10 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" size={20} />
                            <input 
                               type="text"
                               required
                               className="w-full glass-obsidian border border-white/5 rounded-full pl-24 pr-10 py-7 focus:border-[var(--accent-primary)]/50 focus:ring-4 focus:ring-[var(--accent-primary)]/5 outline-none transition-all duration-700 font-black text-sm text-white uppercase tracking-wider italic placeholder:text-white/10"
                               placeholder="+212 600-000000"
                               value={formData.phone}
                               onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 italic pt-1">Entité de Sourcing</label>
                         <div className="relative group/field">
                            <Building className="absolute left-10 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" size={20} />
                            <input 
                               type="text"
                               required
                               className="w-full glass-obsidian border border-white/5 rounded-full pl-24 pr-10 py-7 focus:border-[var(--accent-primary)]/50 focus:ring-4 focus:ring-[var(--accent-primary)]/5 outline-none transition-all duration-700 font-black text-sm text-white uppercase tracking-wider italic placeholder:text-white/10"
                               placeholder="NOM DE L'ENTREPRISE"
                               value={formData.company}
                               onChange={e => setFormData({...formData, company: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="glass-obsidian rounded-[3.5rem] p-12 lg:p-16 border border-white/10 shadow-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-[30%] h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                   
                   <h2 className="text-2xl font-heading font-black text-white mb-16 flex items-center gap-6 uppercase tracking-widest italic group-hover:text-blue-400 transition-colors duration-700">
                      <CreditCard size={32} className="text-[var(--accent-primary)] stroke-[2.5]"/> Protocole de Règlement
                   </h2>
                   
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                       {paymentMethods.map(m => (
                         <button 
                           key={m.id}
                           type="button"
                           onClick={() => setFormData({...formData, payment_method: m.id})}
                           className={`relative p-8 rounded-[1.5rem] border transition-all duration-700 font-black text-[10px] uppercase tracking-[0.3em] italic overflow-hidden group/pay ${
                             formData.payment_method === m.id 
                               ? `border-transparent bg-white text-black shadow-3xl scale-105` 
                               : 'glass-obsidian border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                           }`}
                         >
                            {formData.payment_method === m.id && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />}
                            <span className="relative z-10">{m.name}</span>
                         </button>
                       ))}
                    </div>
                    
                    <div className="mt-12 flex items-center gap-6 p-6 glass-obsidian border-white/5 rounded-2xl">
                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                       <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic">
                          Transactions régies par le cadre de conformité Solaris Flux 2028.
                       </p>
                    </div>
                </div>
              </form>
           </div>

             {/* RIGHT: SUMMARY (4 cols) */}
             <div className="lg:col-span-4">
                <div className="glass-obsidian p-12 border border-white/10 shadow-5xl sticky top-32 overflow-hidden rounded-[3.5rem]">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-primary)]/10 blur-[100px] pointer-events-none animate-pulse" />
                   <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 animate-scan" />

                   <h2 className="text-3xl font-heading font-black text-white mb-12 uppercase tracking-tighter italic">Validation <span className="text-[var(--accent-primary)] font-thin opacity-50">//</span> Final</h2>
                   
                   <div className="space-y-6 mb-12">
                      {cart.map(item => (
                        <div key={item.id} className="flex flex-col gap-2 group/item">
                           <div className="flex justify-between items-center">
                             <span className="text-[12px] font-black text-white/40 truncate max-w-[200px] uppercase tracking-wider italic group-hover/item:text-white transition-colors">{item.name}</span>
                             <span className="text-[10px] font-bold text-[var(--accent-primary)] opacity-50 italic">x{item.quantity}</span>
                           </div>
                           <div className="flex justify-between items-end border-b border-white/5 pb-3">
                             <div className="h-[2px] w-8 bg-white/5 group-hover/item:bg-[var(--accent-primary)]/30 transition-colors" />
                             <span className="font-black text-white text-lg italic mt-1 font-heading">{(item.price * item.quantity).toFixed(0)} DH</span>
                           </div>
                        </div>
                      ))}
                   </div>
  
                   <div className="space-y-6 mb-12">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] italic pt-1">Actifs Archivés</span>
                         <span className="font-black text-white italic">{subtotal.toFixed(0)} DH</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                         <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] italic pt-1">Logistique Flux</span>
                         <span className="font-black text-[var(--accent-primary)] italic">OFFERT</span>
                      </div>
                      
                      <div className="pt-10 mt-10 border-t border-white/10 flex flex-col gap-4">
                         <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-[var(--accent-primary)] uppercase tracking-[0.6em] italic">Valeur Totale</span>
                         </div>
                         <span className="text-7xl font-heading font-black text-white italic tracking-tighter shadow-black drop-shadow-2xl"> {total.toFixed(0)} <span className="text-2xl text-[var(--accent-primary)]">DH</span></span>
                      </div>
                   </div>
 
                   <button 
                     form="checkout-form"
                     type="submit"
                     disabled={isProcessing || cart.length === 0}
                     className={`w-full group/btn relative flex items-center justify-center gap-6 py-8 rounded-[2rem] font-black uppercase tracking-[0.6em] transition-all duration-700 italic
                        ${isProcessing ? 'bg-white/10 text-white/40' : 'bg-white text-black hover:scale-[1.05] shadow-[0_40px_80px_rgba(255,255,255,0.1)]'}
                     `}
                   >
                      {!isProcessing && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-2xl" />}
                      <span className="relative z-10">{isProcessing ? 'TRANSFERT...' : 'VALIDER'}</span>
                      <ArrowRight size={22} className="relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500 stroke-[3]" />
                   </button>
  
                   <div className="mt-12 flex flex-col items-center gap-6">
                      <div className="flex items-center gap-4 text-[10px] font-black text-[var(--accent-primary)] uppercase tracking-[0.5em] italic bg-[var(--accent-primary)]/5 px-8 py-4 rounded-full border border-[var(--accent-primary)]/20 animate-pulse">
                         <ShieldCheck size={20} className="stroke-[3]"/> Chiffrement AES-256
                      </div>
                   </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
