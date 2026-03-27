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

  const paymentMethods = [
    { id: 'Visa', name: 'VISA', colorClass: 'bg-[#1434CB] text-white border-[#1434CB]' },
    { id: 'Mastercard', name: 'MASTERCARD', colorClass: 'bg-[#EB001B] text-white border-[#EB001B]' },
    { id: 'T/T Transfer', name: 'T/T TRANSFER', colorClass: 'bg-[#005A9C] text-white border-[#005A9C]' },
    { id: 'L/C', name: 'L/C', colorClass: 'bg-[#333333] text-white border-[#333333]' }
  ];

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
    <div className="bg-solar-bg-primary min-h-screen pt-32 pb-20 font-sans selection:bg-solar-accent-sun selection:text-white">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* LEFT: CHECKOUT FORM (8 cols) */}
           <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-3xl font-heading font-black tracking-tighter text-solar-text-primary uppercase tracking-widest italic">Procurement Checkout</h1>
              </div>

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
                <div className="bg-solar-bg-secondary rounded-[2.5rem] p-10 border border-solar-glass-border shadow-sm">
                   <h2 className="text-xl font-heading font-black text-solar-text-primary mb-8 flex items-center gap-3 uppercase tracking-widest italic">
                      <Truck size={24} className="text-solar-accent-sun"/> Logistical Information
                   </h2>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="md:col-span-2">
                          <label className="block text-[10px] font-black text-solar-text-muted uppercase tracking-widest mb-3">Detailed Shipping Address</label>
                          <div className="relative group">
                             <MapPin className="absolute left-6 top-5 text-solar-text-muted group-focus-within:text-solar-accent-sun transition-colors" size={18} />
                             <textarea 
                                required
                                rows="3"
                                className="w-full pl-16 pr-6 py-4 bg-solar-bg-primary border border-solar-glass-border rounded-3xl focus:border-solar-accent-sun focus:ring-2 focus:ring-solar-accent-sun/5 outline-none transition-all font-bold text-sm text-solar-text-primary uppercase tracking-wider"
                                placeholder="Street, City, Industrial Zone, Postal Code..."
                                value={formData.shipping_address}
                                onChange={e => setFormData({...formData, shipping_address: e.target.value})}
                             />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-solar-text-muted uppercase tracking-widest mb-3">Direct Contact Phone</label>
                          <div className="relative group">
                             <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-solar-text-muted group-focus-within:text-solar-accent-sun transition-colors" size={18} />
                             <input 
                                type="text"
                                required
                                className="w-full pl-16 pr-6 py-4 bg-solar-bg-primary border border-solar-glass-border rounded-full focus:border-solar-accent-sun focus:ring-2 focus:ring-solar-accent-sun/5 outline-none transition-all font-bold text-sm text-solar-text-primary uppercase tracking-wider"
                                placeholder="+212 600-000000"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                             />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-solar-text-muted uppercase tracking-widest mb-3">Procurement Entity (Company)</label>
                          <div className="relative group">
                             <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-solar-text-muted group-focus-within:text-solar-accent-sun transition-colors" size={18} />
                             <input 
                                type="text"
                                required
                                className="w-full pl-16 pr-6 py-4 bg-solar-bg-primary border border-solar-glass-border rounded-full focus:border-solar-accent-sun focus:ring-2 focus:ring-solar-accent-sun/5 outline-none transition-all font-bold text-sm text-solar-text-primary uppercase tracking-wider"
                                placeholder="Global Tech Solutions Inc."
                                value={formData.company}
                                onChange={e => setFormData({...formData, company: e.target.value})}
                             />
                          </div>
                       </div>
                    </div>
                </div>

                <div className="bg-solar-bg-secondary rounded-[2.5rem] p-10 border border-solar-glass-border shadow-sm">
                   <h2 className="text-xl font-heading font-black text-solar-text-primary mb-8 flex items-center gap-3 uppercase tracking-widest italic">
                      <CreditCard size={24} className="text-solar-accent-sun"/> Secure Payment Protocol
                   </h2>
                   
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                       {paymentMethods.map(m => (
                         <button 
                           key={m.id}
                           type="button"
                           onClick={() => setFormData({...formData, payment_method: m.id})}
                           className={`p-5 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                             formData.payment_method === m.id 
                               ? `${m.colorClass} shadow-xl scale-105` 
                               : 'border-solar-glass-border bg-solar-bg-primary text-solar-text-muted hover:border-solar-accent-sun/50'
                           }`}
                         >
                            {m.name}
                         </button>
                       ))}
                    </div>
                    <p className="mt-6 text-[10px] text-solar-text-muted font-bold uppercase tracking-widest border-l-2 border-solar-accent-sun pl-4">
                       Payment terms are governed by the Solaris Sourcing Framework 2028.
                    </p>
                </div>
              </form>
           </div>

            {/* RIGHT: SUMMARY (4 cols) */}
            <div className="lg:col-span-4">
               <div className="bg-white rounded-[2.5rem] p-10 border border-solar-glass-border shadow-2xl sticky top-28 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-solar-accent-sun/5 blur-3xl pointer-events-none" />
                  <h2 className="text-xl font-heading font-black text-solar-text-primary mb-8 uppercase tracking-widest italic">Order Validation</h2>
                  
                  <div className="space-y-4 mb-8">
                     {cart.map(item => (
                       <div key={item.id} className="flex justify-between items-center text-xs">
                          <span className="font-bold text-solar-text-secondary truncate max-w-[150px] uppercase tracking-wider">{item.name} x{item.quantity}</span>
                          <span className="font-black text-solar-text-primary">{(item.price * item.quantity).toFixed(2)} DH</span>
                       </div>
                     ))}
                  </div>
 
                  <div className="space-y-4 mb-10 pt-6 border-t border-solar-glass-border">
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-solar-text-muted uppercase tracking-widest">Sous-total actifs</span>
                        <span className="font-black text-solar-text-primary">{subtotal.toFixed(2)} DH</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-solar-text-muted uppercase tracking-widest">Logistique</span>
                        <span className="font-black text-solar-accent-sun">{shipping === 0 ? 'GRATUIT' : `${shipping.toFixed(2)} DH`}</span>
                     </div>
                     <div className="pt-6 border-t border-solar-glass-border flex justify-between items-center">
                        <span className="text-xs font-black text-solar-text-primary uppercase tracking-[0.2em] italic">Valeur Totale</span>
                        <span className="text-2xl font-heading font-black text-solar-text-primary italic"> {total.toFixed(2)} DH</span>
                     </div>
                  </div>

                  <button 
                    form="checkout-form"
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="btn-primary w-full justify-center !py-6 rounded-3xl"
                  >
                     {isProcessing ? 'Validating Protocols...' : 'Place Secure Order'} 
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
 
                  <div className="mt-10 flex flex-col items-center gap-3">
                     <div className="flex items-center gap-3 text-[10px] font-black text-green-600 uppercase tracking-[0.2em] italic">
                        <ShieldCheck size={18}/> Trade Assurance Enabled
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
