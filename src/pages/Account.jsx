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
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4">
      <div className="container-solar max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h1 className="font-serif text-5xl text-text-primary mb-4">Mon Compte</h1>
          <p className="text-text-muted tracking-widest uppercase text-xs font-medium">
            Gérez vos informations et vos commandes SOLARIS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="glass-solar p-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-left duration-700 delay-100">
              <div className="w-24 h-24 bg-gradient-sun rounded-full flex items-center justify-center mb-6 shadow-xl">
                <User size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-serif text-text-primary mb-1">{user.name}</h2>
              <p className="text-coral font-sans text-xs font-bold tracking-widest uppercase mb-6">
                {user.role || 'Client Privé'}
              </p>
              
              <div className="w-full border-t border-glass-border pt-6 mt-2 space-y-4">
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <Calendar size={16} className="text-accent-sun" />
                  <span>Membre depuis 2026</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <Shield size={16} className="text-accent-sun" />
                  <span>Compte Vérifié</span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS & ACTIONS */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-200">
            {/* PERSONAL INFO */}
            <div className="glass-solar !overflow-visible">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif text-text-primary">Informations Personnelles</h3>
                <button className="text-[10px] font-bold tracking-widest uppercase text-accent-sun hover:text-coral transition-colors">
                  Modifier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Nom Complet</p>
                  <div className="flex items-center gap-3 text-text-primary">
                    <User size={18} className="text-glass-border" />
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Email Professionnel</p>
                  <div className="flex items-center gap-3 text-text-primary">
                    <Mail size={18} className="text-glass-border" />
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Téléphone</p>
                  <div className="flex items-center gap-3 text-text-primary">
                    <Phone size={18} className="text-glass-border" />
                    <p className="font-medium">{user.phone || 'Non renseigné'}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Entreprise / Organisation</p>
                  <div className="flex items-center gap-3 text-text-primary">
                    <Building size={18} className="text-glass-border" />
                    <p className="font-medium">{user.company || 'Indépendant'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDERS PREVIEW */}
            <div className="glass-solar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif text-text-primary">Commandes Récentes</h3>
                <Link to="/orders" className="text-[10px] font-bold tracking-widest uppercase text-accent-sun hover:text-coral transition-colors flex items-center gap-2">
                  Voir tout <ArrowRight size={12} />
                </Link>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                   <Loader2 size={24} className="animate-spin text-coral mb-2" />
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Chargement des données...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-4 rounded-2xl bg-white/50 border border-glass-border hover:border-coral/20 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Commande #{order.order_number}</p>
                          <p className="text-xs font-bold text-text-primary">
                            {order.items?.length} article(s) • {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-text-primary">{parseFloat(order.total_amount).toFixed(2)} DH</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {order.status === 'pending' ? 'En attente' : 'Terminée'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                         {order.items?.map((item, idx) => (
                           <div key={idx} className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center border border-glass-border">
                              <img src={item.product?.image_url} alt="" className="w-6 h-6 object-contain" onError={(e) => e.target.src = '/noise.svg'} />
                           </div>
                         ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mb-4 border border-glass-border">
                    <Package size={24} className="text-text-muted" />
                  </div>
                  <p className="text-text-secondary text-sm font-medium mb-1">Aucune commande pour le moment.</p>
                  <p className="text-text-muted text-xs">Vos futures acquisitions apparaîtront ici.</p>
                  <Link to="/boutique" className="mt-6 btn-primary !py-3 !px-6 !text-[10px]">
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
