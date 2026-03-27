import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ArrowLeft, Loader2, MapPin, Phone, RefreshCcw, X, CheckCheck, AlertTriangle } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function Orders({ auth }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [returnOrder, setReturnOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [isReturning, setIsReturning] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(null);
  const [returnError, setReturnError] = useState(null);

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

  const handleReturnSubmit = async () => {
    if (!returnReason || !returnOrder) return;
    setIsReturning(true);
    setReturnError(null);
    try {
      const res = await fetch('http://localhost:8000/api/return-requests', {
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
    <div className="min-h-screen bg-solar-bg-primary pt-32 pb-20 px-4 selection:bg-solar-accent-sun selection:text-white font-sans">
      <div className="container-solar max-w-4xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12 ">
           <div>
              <Link to="/account" className="flex items-center gap-2 text-[10px] font-black text-solar-accent-sun uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform italic">
                 <ArrowLeft size={14} /> Retour au compte
              </Link>
              <h1 className="font-heading text-4xl text-solar-text-primary mb-3 font-black uppercase italic tracking-tighter">Historique des Commandes</h1>
              <p className="text-solar-text-muted tracking-widest uppercase text-[10px] font-bold">
                Suivi détaillé de vos acquisitions SOLARIS 2028
              </p>
           </div>
           <div className="hidden md:flex w-16 h-16 bg-solar-bg-secondary border border-solar-glass-border rounded-2xl items-center justify-center shadow-sm">
              <Package size={24} className="text-solar-accent-sun" />
           </div>
        </div>

        {/* SUCCESS BANNER */}
        {returnSuccess && (
          <div className="mb-8 p-5 rounded-2xl flex items-center gap-4" style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <CheckCheck size={20} style={{ color: '#059669' }} />
            <div>
              <p className="text-sm font-bold" style={{ color: '#065f46' }}>Demande de retour envoyée !</p>
              <p className="text-xs" style={{ color: '#047857' }}>Commande {returnSuccess} — Notre équipe vous contactera sous 24h.</p>
            </div>
            <button onClick={() => setReturnSuccess(null)} className="ml-auto" style={{ color: '#059669' }}><X size={18} /></button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-solar-bg-secondary rounded-[2.5rem] border border-solar-glass-border shadow-sm">
             <Loader2 size={32} className="animate-spin text-solar-accent-sun mb-4" />
             <p className="text-[10px] font-black text-solar-text-muted uppercase tracking-widest">Récupération des données sécurisées...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-8">
             {orders.map((order) => (
               <div key={order.id} className="bg-solar-bg-secondary rounded-[2.5rem] border border-solar-glass-border overflow-hidden hover:shadow-2xl hover:shadow-solar-accent-sun/5 transition-all duration-500 shadow-sm">
                  {/* ORDER HEADER */}
                  <div className="bg-white/40 p-8 border-b border-solar-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                     <div className="flex gap-10">
                        <div>
                           <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-1 italic">N° Commande</p>
                           <p className="text-sm font-black text-solar-text-primary tracking-wider font-mono">{order.order_number}</p>
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-1 italic">Date</p>
                           <p className="text-sm font-black text-solar-text-primary tracking-wider">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-1 italic">Status</p>
                           <span className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full italic shadow-sm ${
                             order.status === 'pending' ? 'bg-amber-100/50 text-amber-700 border border-amber-200' : 'bg-green-100/50 text-green-700 border border-green-200'
                           }`}>
                             {order.status === 'pending' ? <Truck size={12}/> : <CheckCircle size={12}/>}
                             {order.status === 'pending' ? 'En cours' : 'Livrée'}
                           </span>
                        </div>
                        <div className="h-10 w-[1px] bg-solar-glass-border hidden md:block"></div>
                        <div className="text-right">
                           <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-1 italic">Total</p>
                           <p className="text-2xl font-heading font-black text-solar-text-primary italic">{parseFloat(order.total_amount).toFixed(2)} DH</p>
                        </div>
                     </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="p-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                           <h4 className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-6 italic">Articles commandés</h4>
                           <div className="space-y-4">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-5 p-4 rounded-2xl bg-solar-bg-primary/40 border border-solar-glass-border/30 hover:border-solar-accent-sun/20 transition-all group">
                                   <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 border border-solar-glass-border shadow-sm">
                                      <img src={item.product?.image_url} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" onError={(e) => e.target.src = '/noise.svg'} />
                                   </div>
                                   <div>
                                      <p className="text-sm font-black text-solar-text-primary line-clamp-1 uppercase tracking-tight italic">{item.product?.name}</p>
                                      <p className="text-[10px] font-bold text-solar-text-muted uppercase tracking-widest">Quantité: {item.quantity} • {parseFloat(item.price).toFixed(2)} DH</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                        <div className="space-y-8">
                           <div className="p-6 rounded-2xl bg-solar-bg-primary/40 border border-solar-glass-border">
                              <h4 className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-3 italic">
                                 <MapPin size={14} className="text-solar-accent-sun" /> Adresse de Livraison
                              </h4>
                              <p className="text-xs font-bold text-solar-text-primary leading-relaxed uppercase tracking-wider">
                                 {order.shipping_address}
                              </p>
                           </div>
                           {order.phone && (
                              <div className="p-6 rounded-2xl bg-solar-bg-primary/40 border border-solar-glass-border">
                                 <h4 className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-3 italic">
                                    <Phone size={14} className="text-solar-accent-sun" /> Contact Logistique
                                 </h4>
                                 <p className="text-xs font-bold text-solar-text-primary tracking-wider">{order.phone}</p>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* RETURN ACTION */}
                     <div className="mt-8 pt-6 border-t border-solar-glass-border/30">
                       <button 
                         onClick={() => setReturnOrder(order)}
                         className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 rounded-xl border border-solar-glass-border text-[10px] font-black uppercase tracking-wider text-solar-text-primary hover:bg-white/5 hover:border-solar-accent-sun/50 hover:text-solar-accent-sun transition-all"
                       >
                         <RefreshCcw size={14} /> Demander un retour
                       </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="bg-solar-bg-secondary p-20 rounded-[2.5rem] border border-solar-glass-border shadow-sm text-center">
             <div className="w-20 h-20 bg-solar-bg-primary rounded-full flex items-center justify-center mb-8 mx-auto border border-solar-glass-border shadow-inner">
                <Package size={32} className="text-solar-text-muted opacity-40" />
             </div>
             <h3 className="text-2xl font-heading font-black text-solar-text-primary mb-3 uppercase italic tracking-widest">Aucune commande</h3>
             <p className="text-solar-text-muted text-[10px] uppercase font-bold tracking-widest max-w-xs mx-auto mb-10 opacity-70">
                Vous n'avez pas encore effectué d'acquisition dans notre catalogue.
             </p>
             <Link to="/boutique" className="btn-primary no-underline">
                Explorer les Technologies
             </Link>
          </div>
        )}

        {/* RETURN MODAL */}
        {returnOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setReturnOrder(null)}>
            <div className="w-full max-w-md rounded-3xl p-10 relative shadow-2xl" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setReturnOrder(null)} className="absolute top-5 right-5 hover:opacity-70 transition-opacity" style={{ color: '#999' }}>
                <X size={22} />
              </button>

              <h3 className="font-heading text-2xl font-black italic uppercase mb-1" style={{ color: '#1a1a1a' }}>Demande de retour</h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-8" style={{ color: '#888' }}>Commande n° {returnOrder.order_number}</p>
              
              {returnError && (
                <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold">{returnError}</span>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#666' }}>Motif du retour</label>
                <select 
                  value={returnReason} 
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full rounded-xl p-4 text-sm font-bold outline-none cursor-pointer"
                  style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', color: '#333' }}
                >
                  <option value="" disabled>Sélectionnez un motif</option>
                  <option value="not_liked">Le produit ne correspond pas à mes attentes</option>
                  <option value="defective">Produit défectueux / endommagé</option>
                  <option value="wrong_item">Erreur dans la livraison</option>
                  <option value="other">Autre motif</option>
                </select>
              </div>

              <button 
                disabled={!returnReason || isReturning}
                onClick={handleReturnSubmit}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
              >
                {isReturning ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                {isReturning ? 'Traitement...' : 'Confirmer le retour'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
