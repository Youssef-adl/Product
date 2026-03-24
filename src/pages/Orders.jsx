import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ArrowLeft, Loader2, MapPin, Phone } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function Orders({ auth }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.token) {
      fetch('http://localhost:8000/api/orders', {
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
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4">
      <div className="container-solar max-w-4xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
           <div>
              <Link to="/account" className="flex items-center gap-2 text-[10px] font-black text-coral uppercase tracking-widest mb-4 hover:translate-x-[-4px] transition-transform">
                 <ArrowLeft size={14} /> Retour au compte
              </Link>
              <h1 className="font-serif text-4xl text-text-primary mb-2">Historique des Commandes</h1>
              <p className="text-text-muted tracking-widest uppercase text-[10px] font-black">
                Suivi détaillé de vos acquisitions SOLARIS
              </p>
           </div>
           <div className="hidden md:flex w-16 h-16 bg-white/50 border border-glass-border rounded-2xl items-center justify-center shadow-sm">
              <Package size={24} className="text-coral" />
           </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 glass-solar">
             <Loader2 size={32} className="animate-spin text-coral mb-4" />
             <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Récupération des données sécurisées...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
             {orders.map((order) => (
               <div key={order.id} className="glass-solar !p-0 overflow-hidden hover:shadow-2xl hover:shadow-coral/5 transition-all duration-500">
                  {/* ORDER HEADER */}
                  <div className="bg-white/40 p-6 border-b border-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <div className="flex gap-6">
                        <div>
                           <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">N° Commande</p>
                           <p className="text-sm font-black text-text-primary">{order.order_number}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Date</p>
                           <p className="text-sm font-black text-text-primary">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Status</p>
                           <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                             order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                           }`}>
                             {order.status === 'pending' ? <Truck size={12}/> : <CheckCircle size={12}/>}
                             {order.status === 'pending' ? 'En cours' : 'Livrée'}
                           </span>
                        </div>
                        <div className="h-10 w-[1px] bg-glass-border hidden md:block"></div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Total</p>
                           <p className="text-xl font-black text-text-primary">{parseFloat(order.total_amount).toFixed(2)} DH</p>
                        </div>
                     </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="p-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Articles commandés</h4>
                           <div className="space-y-4">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/30 border border-glass-border/30">
                                   <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 border border-glass-border">
                                      <img src={item.product?.image_url} alt="" className="w-full h-full object-contain" onError={(e) => e.target.src = '/noise.svg'} />
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-text-primary line-clamp-1">{item.product?.name}</p>
                                      <p className="text-[10px] font-medium text-text-secondary">Quantité: {item.quantity} • {parseFloat(item.price).toFixed(2)} DH</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="p-4 rounded-xl bg-bg-secondary/50 border border-glass-border">
                              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                                 <MapPin size={12} className="text-coral" /> Adresse de Livraison
                              </h4>
                              <p className="text-xs font-medium text-text-primary leading-relaxed">
                                 {order.shipping_address}
                              </p>
                           </div>
                           {order.phone && (
                              <div className="p-4 rounded-xl bg-bg-secondary/50 border border-glass-border">
                                 <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Phone size={12} className="text-coral" /> Contact Logistique
                                 </h4>
                                 <p className="text-xs font-medium text-text-primary">{order.phone}</p>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="glass-solar py-24 text-center">
             <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto border border-glass-border shadow-inner">
                <Package size={32} className="text-text-muted" />
             </div>
             <h3 className="text-2xl font-serif text-text-primary mb-2">Aucune commande</h3>
             <p className="text-text-muted text-sm max-w-xs mx-auto mb-8 font-medium">
                Vous n'avez pas encore effectué d'acquisition dans notre catalogue.
             </p>
             <Link to="/boutique" className="btn-primary !py-4 !px-8">
                Explorer les Technologies
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
