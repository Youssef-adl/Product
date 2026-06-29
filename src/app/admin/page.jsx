"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Users, ShoppingBag, BarChart3, Plus, Edit, Trash2, ArrowUpRight, Activity, Shield, RefreshCcw } from 'lucide-react';
import { useApp } from '../../contexts/AppProvider';

export default function AdminDashboard() {
  const { auth } = useApp();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    activeUsers: 0,
    recentOrders: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Basic role protection check
    if (auth.status !== 'loading' && (!auth.user || auth.user.role !== 'admin')) {
      router.replace('/login?error=admin_required');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/admin/dashboard`);
        
        if (response.status === 401 || response.status === 403) {
           router.replace('/login?error=' + (response.status === 403 ? 'admin_required' : 'session_expired'));
           return;
        }

        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (auth.user && auth.user.role === 'admin') {
      fetchStats();
    }
  }, [auth, router]);

  if (auth.status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[#1ED760] font-black uppercase tracking-[0.8em] animate-pulse italic">Authenticating Protocol...</div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-12 selection:bg-[#1ED760]/30 selection:text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 pt-32 relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-8 h-[1px] bg-[#1ED760]" />
               <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">CONSOLE DE GESTION</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Admin <br/>
              <span className="text-[#1ED760] opacity-80 underline underline-offset-8 decoration-[#1ED760]/20">Dashboard.</span>
            </h1>
          </div>
          <p className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest max-w-sm italic mb-2 text-right">
            Welcome back, {auth.user?.name}. <br/>
            <span className="text-white opacity-40">Manage your B2B marketplace operations with full oversight.</span>
          </p>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Package size={24}/>} label="Total Products" value={stats.totalProducts} trend="+4 active today" />
          <StatCard icon={<ShoppingBag size={24}/>} label="Total Revenue" value={`${stats.totalSales.toLocaleString()} DH`} trend="+12.5% VS MOIS DERNIER" color="#1ED760" />
          <StatCard icon={<Users size={24}/>} label="Active Clients" value={stats.activeUsers} trend="+8 NOUVEAUX" />
          <StatCard icon={<Activity size={24}/>} label="Conversion" value="3.2%" trend="+0.4% DEPUIS ADS" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RECENT ORDERS */}
          <div className="lg:col-span-2 glass-obsidian rounded-[3rem] !p-0 overflow-hidden shadow-2xl group">
             {/* Scanning Effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1ED760]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.3)] animate-[scan_8s_linear_infinite] pointer-events-none" />
            
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">Commandes Récentes</h2>
              <button 
                onClick={() => router.push('/admin/orders')} 
                className="text-[#1ED760] text-[10px] font-black uppercase tracking-[0.3em] hover:scale-110 transition-transform cursor-pointer italic"
              >
                Voir tout l'historique
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5 italic">
                  <tr>
                    <th className="px-10 py-6">ID COMMANDE</th>
                    <th className="px-10 py-6">CLIENT CORPORATE</th>
                    <th className="px-10 py-6 text-right">MONTANT</th>
                    <th className="px-10 py-6 text-center">STATUT FLUX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {stats.recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-all group/row">
                      <td className="px-10 py-6 text-xs font-black uppercase tracking-widest text-white/40 italic">#{order.id}</td>
                      <td className="px-10 py-6 text-sm font-heading font-black text-white italic tracking-tight">{order.client || 'Client Anonyme'}</td>
                      <td className="px-10 py-6 text-sm font-black text-white text-right italic tracking-widest">{order.total.toLocaleString()} DH</td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center">
                          <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic border ${
                            order.status === 'completed' || order.status === 'shipped' ? 'bg-[#1ED760]/10 text-[#1ED760] border-[#1ED760]/20' : 
                            order.status === 'processing' || order.status === 'pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="glass-obsidian rounded-[3rem] p-10 shadow-2xl flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1ED760]/5 to-transparent pointer-events-none" />
            <h2 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter mb-10 relative z-10">Actions Systèmes</h2>
            <div className="space-y-4 flex-1 relative z-10">
              <ActionButton icon={<Plus size={20}/>} label="Nouveau Produit" onClick={() => router.push('/admin/products')} />
              <ActionButton icon={<Edit size={20}/>} label="Gérer Inventaire" onClick={() => router.push('/admin/products')} />
              <ActionButton icon={<Users size={20}/>} label="Accréditations" onClick={() => router.push('/admin/users')} />
              <ActionButton icon={<RefreshCcw size={20}/>} label="Service Retours" onClick={() => router.push('/admin/returns')} />
              <ActionButton icon={<Shield size={20}/>} label="Logger Sécurité" onClick={() => {}} />
            </div>
            
            <button 
              onClick={() => window.print()}
              className="mt-12 w-full py-5 glass-obsidian bg-white/5 border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] italic rounded-2xl hover:bg-white hover:text-black transition-all relative z-10"
            >
              Générer Rapport PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color = '#ffffff' }) {
  return (
    <div className="glass-obsidian rounded-[2.5rem] p-10 hover:border-[#1ED760]/30 transition-all shadow-2xl group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-[#1ED760]/5 transition-colors">
        {icon}
      </div>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="p-4 glass-obsidian bg-black/40 rounded-2xl border-white/5 text-[#1ED760] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(136, 8, 8,0.2)] transition-all duration-700">{icon}</div>
      </div>
      <div className="text-4xl font-heading font-black text-white italic tracking-tighter group-hover:text-[#1ED760] transition-colors relative z-10 leading-none">{value}</div>
      <div className="flex flex-col gap-2 mt-6 relative z-10">
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">{label}</div>
        <span className="text-[9px] text-[#1ED760] font-black uppercase tracking-[0.2em] italic">{trend}</span>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-8 py-6 glass-obsidian border-white/5 rounded-2xl hover:border-[#1ED760]/40 transition-all group relative overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-[#1ED760]/0 group-hover:bg-[#1ED760]/5 transition-colors" />
      <div className="flex items-center gap-6 relative z-10">
        <div className="text-white/20 group-hover:text-[#1ED760] transition-colors">
           {icon}
        </div>
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors italic">{label}</span>
      </div>
      <ArrowUpRight size={18} className="text-white/10 group-hover:text-[#1ED760] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all relative z-10" />
    </button>
  );
}
