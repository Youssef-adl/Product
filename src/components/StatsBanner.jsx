import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

export default function StatsBanner() {
  return (
    <div className="section" style={{ borderTop: '1px solid var(--c-border)', background: '#fff', padding: '30px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           
           {[
             { icon: <ShieldCheck size={28} />, title: 'Trade Assurance', desc: 'Protected orders' },
             { icon: <Truck size={28} />, title: 'On-time delivery', desc: 'Secure shipping' },
             { icon: <CreditCard size={28} />, title: 'Safe payment', desc: 'Multiple methods' },
             { icon: <Headphones size={28} />, title: 'Customer service', desc: '24/7 global support' }
           ].map((item, i) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ color: 'var(--c-primary)' }}>{item.icon}</div>
                <div>
                   <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{item.title}</h4>
                   <p style={{ fontSize: '12px', color: 'var(--c-muted)' }}>{item.desc}</p>
                </div>
             </div>
           ))}

        </div>
      </div>
    </div>
  );
}
