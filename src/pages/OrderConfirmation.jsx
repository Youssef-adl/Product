import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer, Calendar, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { order } = location.state || {};

  // If no order data, show a friendly fallback or redirect
  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-widest mb-4">No Active Procurement</h1>
          <Link to="/store" className="bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest no-underline">
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
${order.items?.map(item => `- ${item.product?.name || 'Product'} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

---------------------------------
TOTAL AMOUNT: $${order.total_amount}

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
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <div className="flex flex-col items-center text-center mb-12">
           <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 animate-bounce-subtle">
              <CheckCircle size={48} strokeWidth={2.5} />
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase tracking-[0.2em] mb-4">
              Procurement Confirmed
           </h1>
           <p className="text-gray-500 font-bold text-sm uppercase tracking-widest max-w-md leading-relaxed">
              Order <span className="text-black">#{order.order_number || 'LS-2026-CONF'}</span> is now in the fulfillment queue. 
              Our logistics partners are synchronizing your delivery.
           </p>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 shadow-sm mb-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-gray-200">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Calendar size={20} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Delivery</div>
                    <div className="text-sm font-black text-gray-900">March 28 - April 02, 2026</div>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Truck size={20} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Carrier Assignment</div>
                    <div className="text-sm font-black text-gray-900">DHL Global Forwarding</div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/boutique" className="flex-1 bg-black text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-3 no-underline">
                 Continue Sourcing <ArrowRight size={16}/>
              </Link>
              <button 
                onClick={handleDownloadInvoice}
                className="flex-1 bg-white text-gray-900 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-gray-200 hover:border-black transition-all flex items-center justify-center gap-3"
              >
                 <Printer size={16}/> Download Invoice
              </button>
           </div>
        </div>

        <div className="text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
              A detailed confirmation and procurement manifest have been sent to your registered corporate email. 
              For bulk adjustments, contact your dedicated account manager.
           </p>
        </div>

      </div>
    </div>
  );
}
