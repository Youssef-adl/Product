import React from 'react';
import { PackageOpen, Clock } from 'lucide-react';

export default function NewArrivals() {
  const items = [
    { name: 'Solaris Air 2', date: '2 hours ago', status: 'Ready to Ship' },
    { name: 'Aluminium Alloy Clip v3', date: '5 hours ago', status: 'Samples Available' },
    { name: 'Industrial Heat Dissipator', date: '1 day ago', status: 'Customizable' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: '40px' }}>
         <h2 style={{ fontSize: '28px', fontWeight: 800 }}>New Arrivals</h2>
         <p style={{ color: 'var(--c-muted)' }}>Fresh hardware just released by our verified manufacturers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
         {items.map((item, i) => (
           <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ width: '100%', height: '200px', background: '#f5f5f5', borderRadius: '4px', marginBottom: '15px', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--c-primary)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px' }}>NEW</div>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>{item.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--c-muted)' }}>
                 <Clock size={12}/> Added {item.date}
              </div>
              <div style={{ marginTop: '15px', padding: '5px 10px', background: '#E6F4EA', color: '#1E4620', fontSize: '11px', fontWeight: 700, borderRadius: '4px', display: 'inline-block' }}>
                 {item.status}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
