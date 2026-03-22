import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

export default function Orders() {
  const orders = [
    { id: 'ORD-882910', item: 'Solaris MagSafe Pro (1000 Units)', total: '$15,000.00', status: 'Processing' },
    { id: 'ORD-771234', item: 'Industrial Core Unit (500 Units)', total: '$7,500.00', status: 'Shipped' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '30px' }}>All Orders</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
         {orders.map((o, i) => (
           <div key={i} className="card" style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--c-border)', paddingBottom: '15px', marginBottom: '15px' }}>
                 <div>
                    <span style={{ fontSize: '12px', color: 'var(--c-muted)' }}>Order ID: </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{o.id}</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: o.status === 'Shipped' ? 'var(--c-green)' : 'var(--c-primary)', fontWeight: 700, fontSize: '12px' }}>
                    {o.status === 'Shipped' ? <CheckCircle size={14}/> : <Truck size={14}/>}
                    {o.status.toUpperCase()}
                 </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#F2F3F7', borderRadius: '4px' }}></div>
                    <div>
                       <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{o.item}</h4>
                       <p style={{ fontSize: '13px', color: 'var(--c-muted)' }}>Supplier: Solaris Manufacturing</p>
                    </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>{o.total}</div>
                    <button style={{ background: 'none', color: 'var(--c-blue)', fontSize: '12px', marginTop: '8px' }}>View Detail</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
