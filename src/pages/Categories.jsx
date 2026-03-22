import React from 'react';
import { LayoutGrid, Smartphone, Laptop, Watch, Cpu, Zap } from 'lucide-react';

export default function Categories() {
  const cats = [
    { name: 'Mobile Accessories', icon: <Smartphone />, count: '12,400+ Products' },
    { name: 'Computing Hardware', icon: <Laptop />, count: '8,200+ Products' },
    { name: 'Wearable Tech', icon: <Watch />, count: '3,100+ Products' },
    { name: 'Industrial Components', icon: <Cpu />, count: '5,000+ Products' },
    { name: 'Power & Energy', icon: <Zap />, count: '2,800+ Products' },
    { name: 'Smart Home', icon: <LayoutGrid />, count: '4,500+ Products' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '30px' }}>Global Sourcing Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {cats.map((c, i) => (
          <div key={i} className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
             <div style={{ padding: '15px', background: 'rgba(255,102,0,0.1)', color: 'var(--c-primary)', borderRadius: '12px' }}>{c.icon}</div>
             <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{c.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--c-muted)' }}>{c.count}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
