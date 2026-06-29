"use client";
import { useApp } from '../../../contexts/AppProvider';
import React, { useState, useEffect } from 'react';
import { User, Shield, ShieldAlert, Trash2, Mail, Calendar, Search, Filter, Lock, Unlock, Zap } from 'lucide-react';

export default function AdminUsers() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth.token) {
         window.location.href = '/login?error=session_expired';
         return;
      }
      
      // Simulated delay for cinematic feel
      setTimeout(() => {
        setUsers([
          { id: 1, name: 'Admin Lodestone', email: 'admin@lodestone.com', role: 'admin', joined: '10 Jan 2026', status: 'Active' },
          { id: 2, name: 'Industrial Partner A', email: 'partner@factory.ma', role: 'client', joined: '15 Feb 2026', status: 'Active' },
          { id: 3, name: 'Logistic Corp', email: 'contact@logistic.net', role: 'client', joined: '01 Mar 2026', status: 'Blocked' },
          { id: 4, name: 'Sourcing Expert', email: 'expert@sourcing.com', role: 'client', joined: '20 Mar 2026', status: 'Active' }
        ]);
        setLoading(false);
      }, 800);
    };

    fetchUsers();
  }, [auth.token]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 selection:bg-[#1ED760]/30 selection:text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#1ED760]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-8 pt-32 relative z-10">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-[#1ED760]" />
             <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">GOUVERNANCE // ADM-02</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6">
            User <br/>
            <span className="text-white/10">Governance.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg font-sans italic tracking-tight max-w-2xl opacity-80">
            Gérez les privilèges administratifs et les protocoles d'accès des partenaires. 
            Contrôle total sur l'écosystème <span className="text-white font-bold">SOLARIS LUX</span>.
          </p>
        </header>

        {/* FILTERS & SEARCH */}
        <div className="glass-obsidian rounded-[2.5rem] p-6 mb-12 flex flex-col lg:row gap-6 shadow-2xl relative overflow-hidden group">
           {/* Scanning line for filter bar */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-[#1ED760]/30 shadow-[0_0_15px_rgba(136, 8, 8,0.3)] animate-[scan-horizontal_10s_linear_infinite] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-6 w-full items-center">
            <div className="relative flex-1 group/search w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-[#1ED760] transition-colors" size={20}/>
              <input 
                type="text" 
                placeholder="Rechercher par identité, email ou accréditation..."
                className="w-full pl-16 pr-8 py-5 glass-obsidian bg-black/40 border-white/5 rounded-2xl focus:outline-none focus:border-[#1ED760]/30 transition-all text-sm text-white font-black tracking-widest placeholder:text-white/10 uppercase italic"
              />
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-5 glass-obsidian bg-white/5 border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-[#1ED760] hover:border-[#1ED760]/20 transition-all italic cursor-pointer group/btn">
                <Filter size={18} className="group-hover/btn:rotate-180 transition-transform duration-500"/>
                Filtrer
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
             <div className="relative">
                <div className="h-20 w-20 rounded-full border-t-2 border-[#1ED760] animate-spin shadow-[0_0_20px_rgba(136, 8, 8,0.2)]" />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1ED760] animate-pulse" size={24}/>
             </div>
             <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[1em] italic animate-pulse">Décryptage des registres...</p>
          </div>
        ) : (
          <div className="glass-obsidian rounded-[3.5rem] overflow-hidden shadow-2xl relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] text-[10px] font-black text-white/30 uppercase tracking-[0.4em] border-b border-white/5 italic">
                  <tr>
                    <th className="px-12 py-8">IDENTITÉ CORPORATE</th>
                    <th className="px-12 py-8">ACCRÉDITATION</th>
                    <th className="px-12 py-8">DATE D'ENRÔLEMENT</th>
                    <th className="px-12 py-8">STATUT SYSTÈME</th>
                    <th className="px-12 py-8 text-right">PROTOCOLE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-white/5 transition-all group/row relative">
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-6">
                          <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center border transition-all duration-700 group-hover/row:scale-110 ${
                            user.role === 'admin' 
                            ? 'bg-[#1ED760]/10 text-[#1ED760] border-[#1ED760]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.1)]' 
                            : 'bg-white/5 text-white/20 border-white/5'
                          }`}>
                            <User size={28} strokeWidth={1.5}/>
                          </div>
                          <div>
                            <div className="text-xl font-heading font-black text-white italic tracking-tighter uppercase group-hover/row:text-[#1ED760] transition-colors">{user.name}</div>
                            <div className="text-[10px] font-black text-white/20 flex items-center gap-3 mt-2 uppercase tracking-[0.2em] italic">
                              <Mail size={14} className="opacity-30"/> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic border ${
                          user.role === 'admin' 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          <Shield size={14} />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-[0.15em] italic">
                          <Calendar size={16} className="text-white/10"/>
                          {user.joined}
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic border ${
                          user.status === 'Active' 
                          ? 'bg-[#1ED760]/10 text-[#1ED760] border-[#1ED760]/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                        }`}>
                          <div className={`h-2 w-2 rounded-full animate-pulse ${user.status === 'Active' ? 'bg-[#1ED760]' : 'bg-red-500'}`}></div>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <div className="flex justify-end gap-4 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500">
                          <button 
                            onClick={() => toggleStatus(user.id)}
                            className={`p-4 rounded-[1.2rem] transition-all border border-white/5 cursor-pointer flex items-center justify-center ${
                              user.status === 'Active' 
                              ? 'glass-obsidian bg-white/5 text-white/40 hover:text-red-400 hover:border-red-500/30' 
                              : 'bg-[#1ED760]/10 text-[#1ED760] border-[#1ED760]/30 hover:bg-[#1ED760]/20'
                            }`}
                            title={user.status === 'Active' ? 'Bloquer l\'accès' : 'Rétablir l\'accès'}
                          >
                            {user.status === 'Active' ? <Lock size={20} strokeWidth={1.5} /> : <Unlock size={20} strokeWidth={1.5} />}
                          </button>
                          <button className="p-4 glass-obsidian bg-white/5 text-white/40 hover:text-red-500 hover:border-red-500/30 rounded-[1.2rem] transition-all border border-white/5 cursor-pointer flex items-center justify-center">
                            <Trash2 size={20} strokeWidth={1.5}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
