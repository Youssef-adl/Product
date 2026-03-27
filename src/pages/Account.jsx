import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Phone, Calendar, Shield, Package, ArrowRight, Loader2 } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

export default function Account({ auth }) {
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

  const user = auth.user;

  return (
    <div className="min-h-screen bg-solar-bg-primary pt-32 pb-20 px-4 selection:bg-solar-accent-sun selection:text-white font-sans">
      <div className="container-solar max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 ">
          <h1 className="font-heading text-5xl text-solar-text-primary mb-4 font-black uppercase italic tracking-tighter">Mon Compte</h1>
          <p className="text-solar-text-muted tracking-widest uppercase text-[10px] font-bold">
            Gérez vos informations et vos commandes SOLARIS 2028
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="bg-solar-bg-secondary p-8 text-center flex flex-col items-center rounded-[2.5rem] border border-solar-glass-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-solar-accent-sun" />
              <div className="w-24 h-24 bg-solar-accent-sun/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-solar-accent-sun/20">
                <User size={40} className="text-solar-accent-sun" />
              </div>
              <h2 className="text-2xl font-heading font-black text-solar-text-primary mb-1 uppercase tracking-tight italic">{user.name}</h2>
              <p className="text-solar-accent-sun font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 italic opacity-80">
                {user.role || 'Client Privé'}
              </p>
              
              <div className="w-full border-t border-solar-glass-border pt-6 mt-2 space-y-4">
                <div className="flex items-center gap-4 text-solar-text-secondary text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={16} className="text-solar-accent-sun" />
                  <span>Membre depuis 2026</span>
                </div>
                <div className="flex items-center gap-4 text-solar-text-secondary text-[10px] font-bold uppercase tracking-widest">
                  <Shield size={16} className="text-solar-accent-sun" />
                  <span>Compte Vérifié</span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS & ACTIONS */}
          <div className="lg:col-span-2 space-y-8 ">
            {/* PERSONAL INFO */}
            <div className="bg-solar-bg-secondary p-10 rounded-[2.5rem] border border-solar-glass-border shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-heading font-black text-solar-text-primary uppercase tracking-widest italic">Informations Personnelles</h3>
                <button className="text-[10px] font-bold tracking-widest uppercase text-solar-accent-sun hover:opacity-70 transition-colors">
                  Modifier
                </button>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] italic">Nom Complet</p>
                  <div className="flex items-center gap-4 text-solar-text-primary">
                    <User size={18} className="text-solar-accent-sun" />
                    <p className="font-bold text-sm uppercase tracking-wider">{user.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] italic">Email Professionnel</p>
                  <div className="flex items-center gap-4 text-solar-text-primary">
                    <Mail size={18} className="text-solar-accent-sun" />
                    <p className="font-bold text-sm uppercase tracking-wider">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] italic">Téléphone</p>
                  <div className="flex items-center gap-4 text-solar-text-primary">
                    <Phone size={18} className="text-solar-accent-sun" />
                    <p className="font-bold text-sm uppercase tracking-wider">{user.phone || 'Non renseigné'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] italic">Entreprise / Organisation</p>
                  <div className="flex items-center gap-4 text-solar-text-primary">
                    <Building size={18} className="text-solar-accent-sun" />
                    <p className="font-bold text-sm uppercase tracking-wider">{user.company || 'Indépendant'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDERS PREVIEW */}
            <div className="bg-solar-bg-secondary p-10 rounded-[2.5rem] border border-solar-glass-border shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-heading font-black text-solar-text-primary uppercase tracking-widest italic">Commandes Récentes</h3>
                <Link to="/orders" className="text-[10px] font-bold tracking-widest uppercase text-solar-accent-sun hover:opacity-70 transition-colors flex items-center gap-2">
                  Voir tout <ArrowRight size={12} />
                </Link>
              </div>
 
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                   <Loader2 size={24} className="animate-spin text-solar-accent-sun mb-2" />
                   <p className="text-[10px] font-bold text-solar-text-muted uppercase tracking-widest">Chargement des données...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-6 rounded-3xl bg-solar-bg-primary/50 border border-solar-glass-border hover:border-solar-accent-sun/20 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[8px] font-black text-solar-text-muted uppercase tracking-[0.2em] mb-1 italic">Commande #{order.order_number}</p>
                          <p className="text-xs font-bold text-solar-text-primary uppercase tracking-wider">
                            {order.items?.length} article(s) • {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-solar-text-primary">{parseFloat(order.total_amount).toFixed(2)} DH</p>
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full italic ${
                            order.status === 'pending' ? 'bg-amber-100/50 text-amber-700 border border-amber-200' : 'bg-green-100/50 text-green-700 border border-green-200'
                          }`}>
                            {order.status === 'pending' ? 'En attente' : 'Terminée'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                         {order.items?.map((item, idx) => (
                           <div key={idx} className="flex-shrink-0 w-10 h-10 rounded-xl bg-solar-bg-secondary flex items-center justify-center border border-solar-glass-border shadow-sm">
                              <img src={item.product?.image_url} alt="" className="w-7 h-7 object-contain grayscale group-hover:grayscale-0 transition-all" onError={(e) => e.target.src = '/noise.svg'} />
                           </div>
                         ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-solar-bg-primary rounded-full flex items-center justify-center mb-6 border border-solar-glass-border shadow-sm">
                    <Package size={24} className="text-solar-text-muted" />
                  </div>
                  <p className="text-solar-text-secondary text-sm font-bold uppercase tracking-widest mb-1 italic">Aucune commande pour le moment.</p>
                  <p className="text-solar-text-muted text-[10px] uppercase font-medium tracking-widest opacity-60">Vos futures acquisitions apparaîtront ici.</p>
                  <Link to="/boutique" className="mt-8 btn-primary !py-4 !px-8">
                    Explorer la Boutique
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
