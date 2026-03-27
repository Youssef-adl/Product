import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, ChevronLeft, Package, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 45.00; 
  const total = subtotal + (cart.length > 0 ? shipping : 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-solar-bg-primary min-h-screen pt-32 pb-20 font-sans selection:bg-solar-accent-sun selection:text-white">
      <div className="container-solar mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* LEFT: CART ITEMS */}
           <div className="lg:col-span-8 flex-1">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-3xl font-heading font-black tracking-tighter text-solar-text-primary uppercase tracking-[0.2em] italic">Sourcing Cart</h1>
                 <span className="text-[10px] font-black text-solar-text-muted uppercase tracking-[0.2em] italic">{totalItems} ACTIF{totalItems !== 1 ? 'S' : ''} SÉLECTIONNÉ{totalItems !== 1 ? 'S' : ''}</span>
              </div>

              {cart.length === 0 ? (
                <div className="bg-solar-bg-secondary rounded-[2.5rem] p-20 text-center border border-solar-glass-border shadow-sm flex flex-col items-center">
                   <div className="w-20 h-20 bg-solar-bg-primary rounded-full flex items-center justify-center text-solar-text-muted mb-8 border border-solar-glass-border shadow-inner">
                      <ShoppingBag size={40} className="opacity-40" />
                   </div>
                   <h2 className="text-2xl font-heading font-black text-solar-text-primary mb-3 uppercase italic tracking-widest">Cart is empty</h2>
                   <p className="text-solar-text-muted font-bold text-[10px] uppercase tracking-widest mb-10 max-w-xs opacity-70">You haven't added any industrial components to your procurement list yet.</p>
                   <Link to="/boutique" className="btn-primary no-underline">
                      Explore Catalogue
                   </Link>
                </div>
              ) : (
                 <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-solar-bg-secondary rounded-[2rem] p-8 border border-solar-glass-border shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-solar-accent-sun/20 transition-all">
                         <div className="w-28 h-28 bg-solar-bg-primary/40 rounded-2xl flex items-center justify-center p-4 overflow-hidden flex-shrink-0 border border-solar-glass-border group-hover:bg-solar-bg-primary transition-colors">
                            {item.image_url || item.image || (item.images && item.images[0]) ? (
                              <img src={item.image_url || item.image || (item.images && item.images[0])} alt={item.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                            ) : (
                              <Package size={32} className="text-solar-text-muted opacity-30" />
                            )}
                         </div>
                         <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                               <div>
                                  <h3 className="text-xl font-heading font-black text-solar-text-primary tracking-tighter uppercase italic">{item.name}</h3>
                                   <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mt-1 italic">SKU: {item.sku || 'SOL-TECH-99'}</p>
                                   <div className="flex items-center gap-5 mt-5">
                                      <button 
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-10 h-10 rounded-full border border-solar-glass-border flex items-center justify-center hover:bg-solar-accent-sun hover:text-white hover:border-solar-accent-sun transition-all bg-solar-bg-primary font-black text-lg cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span className="text-sm font-black text-solar-text-primary">{item.quantity}</span>
                                      <button 
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-10 h-10 rounded-full border border-solar-glass-border flex items-center justify-center hover:bg-solar-accent-sun hover:text-white hover:border-solar-accent-sun transition-all bg-solar-bg-primary font-black text-lg cursor-pointer"
                                      >
                                        +
                                      </button>
                                   </div>
                               </div>
                                <div className="text-left md:text-right">
                                   <div className="text-xl font-heading font-black text-solar-text-primary italic">{(item.price * item.quantity).toFixed(2)} DH</div>
                                   <div className="text-[10px] font-bold text-solar-text-muted mt-1 uppercase tracking-widest">{item.price} DH / UNITÉ</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-solar-glass-border">
                               <span className="text-[10px] font-bold text-green-600 flex items-center gap-2 uppercase tracking-[0.2em] italic">
                                  <CheckCircle size={14}/> High Availability
                               </span>
                               <button 
                                 onClick={() => removeFromCart(item.id)}
                                 className="text-solar-text-muted hover:text-red-500 transition-all bg-transparent border-none cursor-pointer flex items-center gap-2 uppercase text-[10px] font-black tracking-widest"
                               >
                                  <Trash2 size={18} /> SUPPRIMER
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              )}
           </div>

           {/* RIGHT: SUMMARY */}
           <div className="lg:w-96">
              <div className="bg-solar-bg-secondary rounded-[2.5rem] p-8 border border-solar-glass-border shadow-xl sticky top-32">
                 <h2 className="text-xl font-heading font-black text-solar-text-primary mb-8 uppercase italic tracking-tighter">Order Summary</h2>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-[11px] font-bold text-solar-text-muted uppercase tracking-widest italic">
                       <span>Subtotal</span>
                       <span className="text-solar-text-primary font-black">{subtotal.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-solar-text-muted uppercase tracking-widest italic">
                       <span>Logistics Fee</span>
                       <span className="text-solar-text-primary font-black">{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} DH`}</span>
                    </div>
                    <div className="pt-4 border-t border-solar-glass-border flex justify-between">
                       <span className="text-sm font-black text-solar-text-primary uppercase tracking-widest italic">Grand Total</span>
                       <span className="text-2xl font-heading font-black text-solar-accent-sun italic">{total.toFixed(2)} DH</span>
                    </div>
                 </div>

                 <button 
                   onClick={() => navigate('/checkout')}
                   disabled={cart.length === 0}
                   className="btn-primary w-full justify-center !py-5 !text-xs !font-black !tracking-[0.3em] group shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    INITIATE CHECKOUT <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </button>

                 <div className="mt-8 pt-8 border-t border-solar-glass-border">
                    <div className="flex items-center gap-4 text-solar-text-muted opacity-60">
                       <ShieldCheck size={20} className="text-solar-accent-sun" />
                       <p className="text-[8px] font-black uppercase tracking-widest leading-relaxed">
                          Secure Protocol 2028 <br/>
                          Encrypted Sourcing Transaction
                       </p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
