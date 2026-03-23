import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, ChevronLeft, Package, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  // ... (subtotal, shipping, total logic same)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 45.00; // Sample B2B logic
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* LEFT: CART ITEMS (8 cols) */}
           <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase tracking-widest">Sourcing Cart</h1>
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{cart.length} Assets Selected</span>
              </div>

              {cart.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                      <ShoppingBag size={40} />
                   </div>
                   <h2 className="text-2xl font-black text-gray-900 mb-2">Cart is empty</h2>
                   <p className="text-gray-500 font-medium mb-8 max-w-xs">You haven't added any industrial components to your procurement list yet.</p>
                   <Link to="/boutique" className="bg-black text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all no-underline">
                      Explore Catalogue
                   </Link>
                </div>
              ) : (
                <div className="space-y-4">
                   {cart.map((item) => (
                     <div key={item.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-blue-100 transition-colors">
                        <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                           {item.image_url ? (
                             <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                           ) : (
                             <Package size={32} className="text-gray-300" />
                           )}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start mb-2">
                              <div>
                                 <h3 className="text-lg font-black text-gray-900 tracking-tight">{item.name}</h3>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">SKU: {item.sku}</p>
                                  <div className="flex items-center gap-4 mt-3">
                                     <button 
                                       onClick={() => updateQuantity(item.id, -1)}
                                       className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white cursor-pointer"
                                     >
                                       -
                                     </button>
                                     <span className="text-xs font-black">{item.quantity}</span>
                                     <button 
                                       onClick={() => updateQuantity(item.id, 1)}
                                       className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white cursor-pointer"
                                     >
                                       +
                                     </button>
                                  </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-lg font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                                 <div className="text-[10px] font-bold text-gray-400 mt-1">${item.price} / unit</div>
                              </div>
                           </div>
                           <div className="flex justify-between items-center mt-4">
                              <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 uppercase tracking-widest">
                                 <CheckCircle size={12}/> High Availability
                              </span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                   
                   <Link to="/boutique" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] no-underline pt-4 pl-4">
                      <ChevronLeft size={16} /> Continue Selection
                   </Link>
                </div>
              )}
           </div>

           {/* RIGHT: SUMMARY (4 cols) */}
           <div className="lg:col-span-4">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl sticky top-28">
                 <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Procurement Summary</h2>
                 
                 <div className="space-y-4 mb-10">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest">Subtotal Assets</span>
                       <span className="font-black text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest">Logistics Est.</span>
                       <span className="font-black text-blue-600">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                       <span className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Total Investment</span>
                       <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                    </div>
                 </div>

                 <button 
                   disabled={cart.length === 0}
                   onClick={() => navigate('/checkout')}
                   className="w-full bg-black text-white p-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-gray-200"
                 >
                    Initiate Procurement <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>

                 <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                       <ShieldCheck size={16}/> End-to-End Secure Payment
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold text-center leading-relaxed">
                       Subject to Solaris's standard Terms of Sale and Global Sourcing Agreement. Logistical fees final after address validation.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
