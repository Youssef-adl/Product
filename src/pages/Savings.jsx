import React from 'react';
import { Tag, Percent } from 'lucide-react';

export default function Savings() {
  const deals = [
     { name: 'Clearance: Solaris Gen 1', off: '40% OFF', price: '$8.00' },
     { name: 'Bulk Promo: 500+ units', off: '$200 Discount', price: 'Varies' },
     { name: 'Sample Bundle: All Models', off: 'Free Shipping', price: '$45.00' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #FF6600 0%, #FF3300 100%)', padding: '40px', color: '#fff', marginBottom: '40px', border: 'none', borderRadius: '12px' }}>
         <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Savings Spotlight</h2>
         <p style={{ fontSize: '18px', opacity: 0.9 }}>Exclusive deals for verified global buyers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
         {deals.map((d, i) => (
           <div key={i} className="card" style={{ padding: '25px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,51,0,0.1)', color: '#FF3300', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                 <Percent size={28}/>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{d.name}</h4>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#FF3300' }}>{d.off}</div>
              <div style={{ fontSize: '12px', color: 'var(--c-muted)', marginTop: '5px' }}>Price from: {d.price}</div>
              <button className="btn-primary" style={{ marginTop: '20px', width: '100%', background: '#FF3300', justifyContent: 'center' }}>Claim Deal</button>
           </div>
         ))}
      </div>
    </div>
  );
}
