"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, ArrowRight, Printer, Calendar, Truck, Loader2 } from 'lucide-react';

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Attempt to get order from navigation state (if redirected from checkout)
    // In Next.js with app router, we usually don't have location.state unless using custom wrapper.
    // So we'll prioritize fetching from the API using the orderId.
    
    if (orderId) {
        fetchOrder();
    } else {
        setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || "Failed to retrieve order archive.");
      }
    } catch (err) {
      console.error("Fetch Order Confirmation Error:", err);
      setError("Synchronisation error. Please check your account dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!order) return;
    
    const invoiceContent = `
SOLARIS LUX - PROCURMENT INVOICE
---------------------------------
Order Number: ${order.order_number}
Date: ${new Date(order.created_at).toLocaleDateString()}
Status: ${order.status.toUpperCase()}

SHIPPING DETAILS:
Address: ${order.shipping_address}
Phone: ${order.phone || 'N/A'}

ORDER SUMMARY:
${order.items?.map(item => `- ${item.product?.name || 'Product'} x${item.quantity}: ${(item.price * item.quantity).toFixed(2)} DH`).join('\n')}

---------------------------------
TOTAL AMOUNT: ${order.total_amount} DH

Thank you for choosing Solaris Lux.
High-Performance Engineering for Eternity.
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Solaris_Invoice_${order.order_number}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 font-sans">
        <Loader2 size={48} className="text-[var(--accent-primary)] animate-spin mb-6" />
        <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] italic">Accessing Secure Archive...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-black text-[var(--text-primary)] uppercase tracking-[0.2em] mb-4 italic">
            {error || "No Active Procurement Detected"}
          </h1>
          <Link href="/boutique" className="px-8 py-4 bg-[var(--accent-primary)] text-white font-black rounded-full uppercase tracking-widest hover:scale-105 transition-all no-underline inline-block mt-6">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pt-12 pb-12 font-sans selection:bg-[var(--accent-primary)]/30 selection:text-white uppercase italic">
      <style jsx global>{`
        #next-static-indicator,
        .nextjs-static-indicator-container {
          display: none !important;
        }
      `}</style>

      {/* Background Accents */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16 relative">
           <div className="w-28 h-28 glass-obsidian rounded-full flex items-center justify-center text-[var(--accent-primary)] mb-10 border border-[var(--glass-border)] shadow-5xl group relative">
              <div className="absolute inset-0 bg-[var(--accent-primary)]/20 blur-2xl animate-pulse rounded-full" />
              <CheckCircle size={54} strokeWidth={2.5} className="relative z-10" />
           </div>
           
           <h1 className="text-6xl font-heading font-black tracking-tighter text-[var(--text-primary)] uppercase mb-6 italic leading-none">
              Protocole <br/>
              <span className="text-[var(--accent-primary)] opacity-80">Confirmé</span>
           </h1>
           
           <div className="flex items-center gap-6 mb-8">
              <div className="h-[1px] w-12 bg-[var(--border-light)]" />
              <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] italic leading-relaxed">
                 ARCHIVE ID: <span className="text-[var(--text-primary)] opacity-80">#{order.order_number || 'SOL-2028-X'}</span>
              </p>
              <div className="h-[1px] w-12 bg-[var(--border-light)]" />
           </div>
           
           <p className="text-[var(--text-muted)] font-black text-[10px] uppercase tracking-[0.4em] max-w-lg leading-loose italic">
              VOTRE COMMANDE A ÉTÉ INDEXÉE AVEC SUCCÈS DANS LE FLUX DE PRODUCTION. 
              SYNCHRONISATION LOGISTIQUE EN COURS.
           </p>
        </div>

        <div className="glass-obsidian rounded-[4rem] p-16 border border-[var(--glass-border)] shadow-5xl mb-16 relative overflow-hidden group">
           {/* Scanning Effect */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent-primary)]/20 shadow-[0_0_20px_rgba(136, 8, 8,0.5)] animate-[scan_5s_linear_infinite] pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-[var(--border-light)]">
              <div className="flex items-start gap-8 group/item">
                 <div className="w-14 h-14 glass-obsidian rounded-2xl flex items-center justify-center text-[var(--accent-primary)] shadow-3xl border border-[var(--glass-border)] group-hover/item:border-[var(--accent-primary)]/50 transition-all duration-700">
                    <Calendar size={24} className="stroke-[2]" />
                 </div>
                 <div>
                    <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-3 italic">Fenêtre de Livraison</div>
                    <div className="text-lg font-black text-[var(--text-primary)] italic tracking-tighter uppercase">PROCHAINS 7 JOURS</div>
                 </div>
              </div>
              <div className="flex items-start gap-8 group/item">
                 <div className="w-14 h-14 glass-obsidian rounded-2xl flex items-center justify-center text-[var(--accent-primary)] shadow-3xl border border-[var(--glass-border)] group-hover/item:border-[var(--accent-primary)]/50 transition-all duration-700">
                    <Truck size={24} className="stroke-[2]" />
                 </div>
                 <div>
                    <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-3 italic">Agent Logistique</div>
                    <div className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tighter italic border-b border-[var(--border-light)] pb-1 group-hover/item:border-[var(--accent-primary)]/50 transition-colors">DHL QUANTUM FORWARD</div>
                 </div>
              </div>
           </div>
 
           <div className="flex flex-col sm:flex-row gap-8">
              <Link href="/boutique" className="group/btn relative flex-1 bg-[var(--text-primary)] text-[var(--bg-primary)] py-7 rounded-full font-black text-[10px] uppercase tracking-[0.6em] hover:scale-[1.05] active:scale-[0.98] transition-all duration-700 items-center justify-center gap-4 no-underline flex italic">
                 <div className="absolute inset-0 bg-[var(--accent-primary)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-2xl" />
                 <span className="relative z-10">RETOUR ARCHIVE</span> 
                 <ArrowRight size={18} className="relative z-10 group-hover:translate-x-3 transition-transform stroke-[3]"/>
              </Link>
              <button 
                onClick={handleDownloadInvoice}
                className="flex-1 glass-obsidian text-[var(--text-primary)] px-10 py-7 rounded-full font-black text-[10px] uppercase tracking-[0.6em] border border-[var(--glass-border)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/5 transition-all duration-700 flex items-center justify-center gap-4 shadow-3xl italic"
              >
                 <Printer size={20} className="text-[var(--accent-primary)] opacity-50"/> MANIFESTE PDF
              </button>
           </div>
        </div>

        <div className="text-center">
           <div className="inline-flex items-center gap-4 text-[var(--text-muted)] mb-6">
              <div className="h-[1px] w-6 bg-[var(--border-light)]" />
              <span className="text-[8px] font-black tracking-[0.4em] uppercase italic">Solaris Security Protocol</span>
              <div className="h-[1px] w-6 bg-[var(--border-light)]" />
           </div>
           <p className="text-[9px] font-black text-[var(--text-muted)] opacity-50 uppercase tracking-[0.3em] leading-loose italic max-w-2xl mx-auto">
              UN MANIFESTE DE PROCUREMENT DÉTAILLÉ A ÉTÉ ENVOYÉ À VOTRE TERMINAL D'ACCRÉDITATION. 
              POUR TOUTE MODIFICATION DE FLUX, CONTACTEZ VOTRE GESTIONNAIRE DE COMPTE DÉDIÉ.
           </p>
        </div>

      </div>
    </div>
  );
}
