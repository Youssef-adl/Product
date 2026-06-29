"use client";
import { useApp } from '../../../contexts/AppProvider';
import { useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';

import { RefreshCcw, CheckCircle, XCircle, Loader2, Clock, Package, AlertCircle, ArrowRight, ArrowLeft, Zap, Box, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../../config';

const REASON_LABELS = {
  not_liked: 'Attentes non satisfaites',
  defective: 'Défaut technique critique',
  wrong_item: 'Erreur de configuration',
  other: 'Motif exceptionnel',
};

export default function AdminReturns() {
  const { auth, setAuth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const router = useRouter();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [debugInfo, setDebugInfo] = useState('Synchronisation...');

  useEffect(() => {
    if (auth.token) {
      fetchReturns();
    }
  }, [auth.token]);

  const fetchReturns = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/return-requests?t=` + new Date().getTime(), {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (res.status === 401 || res.status === 403) {
         localStorage.removeItem('auth_token');
         localStorage.removeItem('user');
         window.location.href = '/login?error=' + (res.status === 403 ? 'admin_required' : 'session_expired');
         return;
      }

      const data = await res.json();
      if (data.success) {
        setReturns(data.returns || []);
        setDebugInfo(null);
      }
    } catch (err) {
      console.error('Failed to load returns', err);
      setDebugInfo('Échec de la connexion sécurisée.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/return-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchReturns();
      }
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic bg-[#1ED760]/10 text-[#1ED760] border border-[#1ED760]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.1)]">
            <CheckCircle size={14} /> Accepté
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <XCircle size={14} /> Refusé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
            <Clock size={14} /> En attente
          </span>
        );
    }
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 selection:bg-[#1ED760]/30 selection:text-white">
      {/* Background Accents */}
      <div className="fixed inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 pt-32 relative z-10">
        <header className="mb-16">
          <div className="flex items-center gap-6 justify-between">
             <div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-[1px] bg-[#1ED760]" />
                   <span className="font-mono text-[10px] font-black tracking-[0.6em] text-[#1ED760] uppercase italic">LOGISTIQUE INVERSE // ADM-05</span>
                </div>
                <h1 className="text-6xl lg:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6">
                  Reverse <br/>
                  <span className="text-white/10 text-7xl lg:text-9xl">Logistics.</span>
                </h1>
                <p className="text-[var(--text-secondary)] text-lg font-sans italic tracking-tight max-w-2xl opacity-80">
                  Supervisez la satisfaction post-achat et les protocoles de retour du réseau <span className="text-white font-bold uppercase italic">Solaris Lux</span>.
                </p>
             </div>
             
             <div className="hidden lg:flex flex-col items-end gap-2">
                <div className="px-8 py-5 glass-obsidian bg-[#1ED760]/5 border-[#1ED760]/20 rounded-2xl flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                      <RefreshCcw size={80} className={loading ? "animate-spin" : ""} />
                   </div>
                   <div className="relative z-10 flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-[#1ED760] animate-pulse shadow-[0_0_10px_#1ED760]" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">{returns.length} REQUÊTES ACTIVES</span>
                   </div>
                </div>
             </div>
          </div>
        </header>

        {debugInfo && (
          <div className="glass-obsidian border-orange-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 text-orange-400 mb-12 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative overflow-hidden">
            <div className="absolute left-0 top-0 w-2 h-full bg-orange-500" />
            <div className="p-4 bg-orange-500/10 rounded-2xl"><AlertCircle size={24}/></div>
            <div className="text-[11px] font-black uppercase tracking-[0.3em] italic">{debugInfo}</div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
             <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-2 border-[#1ED760] animate-spin shadow-[0_0_30px_rgba(136, 8, 8,0.2)]" />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1ED760] animate-pulse" size={28}/>
             </div>
             <p className="text-[#1ED760] text-[10px] font-black uppercase tracking-[1em] italic animate-pulse">Synchronisation des protocoles...</p>
          </div>
        ) : returns.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-40 glass-obsidian rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-radial-at-t from-[#1ED760]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <div className="relative z-10">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:border-[#1ED760]/30 border border-white/5 transition-all duration-700">
                    <Box size={40} className="text-white/10 group-hover:text-[#1ED760] transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-heading font-black text-white italic uppercase tracking-tighter mb-4 leading-none">Cycle de retour vierge</h3>
                <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.4em] italic opacity-40">0 Demandes de retour détectées dans le périmètre.</p>
            </div>
          </motion.div>
        ) : (
          <div className="glass-obsidian rounded-[3.5rem] overflow-hidden shadow-2xl relative border-white/5">
            <div className="absolute left-0 top-0 w-full h-[1px] bg-[#1ED760]/20 shadow-[0_0_15px_rgba(136, 8, 8,0.2)] animate-[scan_15s_linear_infinite] pointer-events-none" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] text-[10px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/5 italic">
                  <tr>
                    <th className="px-12 py-8">PROFIL CLIENT</th>
                    <th className="px-12 py-8">IDENTIFIANT FLUX</th>
                    <th className="px-12 py-8">MOTIF DE REQUÊTE</th>
                    <th className="px-12 py-8 text-center">ÉCHÉANCE</th>
                    <th className="px-12 py-8 text-center">ÉTAT ACTUEL</th>
                    <th className="px-12 py-8 text-right">DÉCISIONNEL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {returns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-white/5 transition-all group/row relative">
                      <td className="px-12 py-10">
                        <div className="flex flex-col">
                          <div className="text-xl font-heading font-black text-white italic tracking-tighter uppercase group-hover/row:text-[#1ED760] transition-colors duration-500">{ret.user?.name || 'Client Solaris'}</div>
                          <div className="text-[9px] font-black text-[#1ED760]/60 uppercase tracking-[0.3em] mt-3 italic">ACCRÉDITATION CERTIFIÉE</div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="text-lg font-heading font-black text-white italic tracking-tight uppercase">{ret.order?.order_number || `ORD-${ret.order_id}`}</div>
                        <div className="text-[11px] font-mono font-black text-white/20 mt-2 italic">{parseFloat(ret.order?.total_amount || 0).toLocaleString()} <span className="text-[9px]">DH</span></div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="text-[10px] font-black text-white italic uppercase tracking-[0.15em] max-w-[220px] leading-relaxed group-hover/row:text-white transition-colors">
                           <span className="text-[#1ED760]/40 mr-2">//</span> {REASON_LABELS[ret.reason] || ret.reason}
                        </div>
                      </td>
                      <td className="px-12 py-10 text-center">
                        <div className="text-[11px] font-mono font-black text-white/20 uppercase tracking-widest italic group-hover/row:text-white/40 transition-colors">
                          {new Date(ret.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-12 py-10 text-center">
                        <div className="flex justify-center">
                            {statusBadge(ret.status)}
                        </div>
                      </td>
                      <td className="px-12 py-10 text-right">
                        {ret.status === 'pending' ? (
                          <div className="flex justify-end gap-5">
                            <button
                              onClick={() => handleUpdate(ret.id, 'approved')}
                              disabled={updatingId === ret.id}
                              className="w-14 h-14 glass-obsidian bg-[#1ED760] text-black rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_10px_30px_rgba(136, 8, 8,0.3)] cursor-pointer group/approve"
                              title="Approuver le retour"
                            >
                              {updatingId === ret.id ? <Loader2 size={24} className="animate-spin" /> : <CheckCircle size={26} strokeWidth={2.5}/>}
                            </button>
                            <button
                              onClick={() => handleUpdate(ret.id, 'rejected')}
                              disabled={updatingId === ret.id}
                              className="w-14 h-14 glass-obsidian bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_10px_30px_rgba(239,68,68,0.3)] cursor-pointer group/reject"
                              title="Rejeter le retour"
                            >
                              {updatingId === ret.id ? <Loader2 size={24} className="animate-spin" /> : <XCircle size={26} strokeWidth={2.5} />}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-3 text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic group-hover/row:text-white/20 transition-colors">
                             <RotateCcw size={14} className="opacity-40" /> ARCHIVÉ
                          </div>
                        )}
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
