import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCw } from 'lucide-react';

export default function TradeAssurance() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
         <ShieldCheck size={64} color="var(--c-blue)"/>
         <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--c-blue)', marginTop: '20px' }}>Trade Assurance</h2>
         <p style={{ fontSize: '18px', color: 'var(--c-muted)', maxWidth: '700px', margin: '15px auto' }}>
            Shop with confidence. Get protection from payment to delivery with Solaris's secure trading system.
         </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
         {[
           { icon: <Lock />, title: 'Safe Payment', desc: 'Secure payment through Alibaba.com with T/T, Visa, and Mastercard support.' },
           { icon: <Truck />, title: 'On-time Shipping', desc: 'Full refund if your order isn\'t shipped by the date agreed with your supplier.' },
           { icon: <RefreshCw />, title: 'Product Quality', desc: 'Full refund if the product quality doesn\'t match the terms of your contract.' }
         ].map((p, i) => (
           <div key={i} className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ color: 'var(--c-blue)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{p.icon}</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>{p.title}</h4>
              <p style={{ fontSize: '14px', color: 'var(--c-muted)', lineHeight: 1.6 }}>{p.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
