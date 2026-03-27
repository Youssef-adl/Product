import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer, Calendar, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { order } = location.state || {};

  // If no order data, show a friendly fallback or redirect
  if (!order) {
    return (
      <div className="min-h-screen bg-solar-bg-primary flex items-center justify-center p-6 font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-black text-solar-text-primary uppercase tracking-[0.2em] mb-4 italic">No Active Procurement</h1>
          <Link to="/boutique" className="btn-primary no-underline">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    const invoiceContent = `
SOLARIS LUX - PROCURMENT INVOICE
---------------------------------
Order Number: ${order.order_number}
Date: ${new Date().toLocaleDateString()}
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

  return (
    <div className="bg-solar-bg-primary min-h-screen pt-32 pb-20 font-sans selection:bg-solar-accent-sun selection:text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <div className="flex flex-col items-center text-center mb-12">
           <div className="w-24 h-24 bg-solar-accent-sun/5 rounded-full flex items-center justify-center text-solar-accent-sun mb-8 border border-solar-accent-sun/20">
              <CheckCircle size={48} strokeWidth={2.5} />
           </div>
           <h1 className="text-4xl font-heading font-black tracking-tighter text-solar-text-primary uppercase tracking-[0.2em] mb-4 italic">
              Procurement Confirmed
           </h1>
           <p className="text-solar-text-muted font-bold text-sm uppercase tracking-widest max-w-md leading-relaxed">
              Order <span className="text-solar-accent-sun font-black">#{order.order_number || 'LS-2026-CONF'}</span> is now in the fulfillment queue. 
              Our logistics partners are synchronizing your delivery.
           </p>
        </div>

        <div className="bg-solar-bg-secondary rounded-[2.5rem] p-10 border border-solar-glass-border shadow-sm mb-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-solar-accent-sun/5 blur-3xl pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-solar-glass-border">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-solar-bg-primary rounded-xl flex items-center justify-center text-solar-accent-sun shadow-sm border border-solar-glass-border">
                    <Calendar size={20} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-solar-text-muted uppercase tracking-widest mb-1 italic">Estimated Delivery</div>
                    <div className="text-sm font-black text-solar-text-primary">March 28 - April 02, 2026</div>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-solar-bg-primary rounded-xl flex items-center justify-center text-solar-accent-sun shadow-sm border border-solar-glass-border">
                    <Truck size={20} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-solar-text-muted uppercase tracking-widest mb-1 italic">Carrier Assignment</div>
                    <div className="text-sm font-black text-solar-text-primary uppercase tracking-wider">DHL Global Forwarding</div>
                 </div>
              </div>
           </div>
 
           <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/boutique" className="btn-primary flex-1 justify-center no-underline">
                 Continue Sourcing <ArrowRight size={16}/>
              </Link>
              <button 
                onClick={handleDownloadInvoice}
                className="flex-1 bg-white text-solar-text-primary px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest border border-solar-glass-border hover:border-solar-accent-sun transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                 <Printer size={18} className="text-solar-accent-sun"/> Download Invoice
              </button>
           </div>
        </div>

        <div className="text-center">
           <p className="text-[10px] font-bold text-solar-text-muted uppercase tracking-[0.2em] leading-relaxed italic opacity-70">
              A detailed confirmation and procurement manifest have been sent to your registered corporate email. 
              For bulk adjustments, contact your dedicated account manager.
           </p>
        </div>

      </div>
    </div>
  );
}
