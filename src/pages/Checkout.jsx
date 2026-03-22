import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle, Package, ArrowLeft, ArrowRight, Building, MapPin, Phone } from 'lucide-react';

export default function Checkout({ auth, cart, clearCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone: '',
    company: auth?.user?.company || '',
    payment_method: 'T/T Transfer'
  });

  useEffect(() => {
    if (!auth?.token) {
      navigate('/login?redirect=checkout');
    }
  }, [auth, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 45.00;
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    const orderData = {
      user_id: auth.user.id,
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
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        clearCart();
        navigate('/order-confirmation', { state: { order: result.order } });
      } else {
        alert('Order processing failed. Please check your data or contact support.');
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert('Connection error. Is the backend server running?');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!auth?.token) return null;

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* LEFT: CHECKOUT FORM (8 cols) */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase tracking-widest">Procurement Checkout</h1>
              </div>

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                   <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                      <Truck size={24} className="text-blue-600"/> Logistical Information
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Shipping Address</label>
                         <div className="relative">
                            <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                            <textarea 
                               required
                               rows="3"
                               className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold text-sm"
                               placeholder="Street, City, Industrial Zone, Postal Code..."
                               value={formData.shipping_address}
                               onChange={e => setFormData({...formData, shipping_address: e.target.value})}
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Direct Contact Phone</label>
                         <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                               type="text"
                               required
                               className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold text-sm"
                               placeholder="+212 600-000000"
                               value={formData.phone}
                               onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Procurement Entity (Company)</label>
                         <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                               type="text"
                               required
                               className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold text-sm"
                               placeholder="Global Tech Solutions Inc."
                               value={formData.company}
                               onChange={e => setFormData({...formData, company: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                   <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                      <CreditCard size={24} className="text-blue-600"/> Secure Payment Protocol
                   </h2>
                   
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {['Visa', 'Mastercard', 'T/T Transfer', 'L/C'].map(m => (
                        <button 
                          key={m}
                          type="button"
                          onClick={() => setFormData({...formData, payment_method: m})}
                          className={`p-4 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${formData.payment_method === m ? 'border-black bg-black text-white' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                        >
                           {m}
                        </button>
                      ))}
                   </div>
                   <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Payment terms are governed by the Solaris Sourcing Framework.
                   </p>
                </div>
              </form>
           </div>

           {/* RIGHT: SUMMARY (4 cols) */}
           <div className="lg:col-span-4">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl sticky top-28">
                 <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Order Validation</h2>
                 
                 <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                         <span className="font-bold text-gray-500 truncate max-w-[150px]">{item.name} x{item.quantity}</span>
                         <span className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4 mb-10 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest">Subtotal Assets</span>
                       <span className="font-black text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest">Logistics</span>
                       <span className="font-black text-blue-600">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                       <span className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Total Value</span>
                       <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                    </div>
                 </div>

                 <button 
                   form="checkout-form"
                   type="submit"
                   disabled={isProcessing || cart.length === 0}
                   className="w-full bg-black text-white p-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-gray-200"
                 >
                    {isProcessing ? 'Validating...' : 'Place Secure Order'} 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>

                 <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                       <ShieldCheck size={16}/> Trade Assurance Enabled
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
