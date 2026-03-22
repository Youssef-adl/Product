import React from 'react';
import { MessageSquare, Calendar, Filter } from 'lucide-react';

export default function Inquiries() {
  const messages = [
    { sender: 'Solaris Manufacturing', subject: 'Re: Inquiry about MagSafe Pro 15W', date: '21 Mar', status: 'Unread' },
    { sender: 'Global Logistics Team', subject: 'Shipping options for North America', date: '20 Mar', status: 'Replied' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
         <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Inquiry Center</h2>
         <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Filter size={16}/> Filter</button>
      </div>

      <div className="card">
         <div style={{ padding: '15px 25px', background: '#F9FAFB', borderBottom: '1px solid var(--c-border)', display: 'flex', gap: '40px', fontSize: '12px', fontWeight: 700, color: 'var(--c-muted)' }}>
            <div style={{ flex: 1 }}>SUPPLIER / SENDER</div>
            <div style={{ flex: 2 }}>SUBJECT</div>
            <div style={{ width: '100px' }}>DATE</div>
         </div>
         
         {messages.map((m, i) => (
           <div key={i} style={{ padding: '20px 25px', borderBottom: i < messages.length - 1 ? '1px solid var(--c-border)' : 'none', display: 'flex', gap: '40px', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.status === 'Unread' ? 'var(--c-primary)' : 'transparent' }}></div>
                 <span style={{ fontWeight: 600 }}>{m.sender}</span>
              </div>
              <div style={{ flex: 2, fontSize: '13px' }}>{m.subject}</div>
              <div style={{ width: '100px', fontSize: '12px', color: 'var(--c-muted)' }}>{m.date}</div>
           </div>
         ))}
      </div>
    </div>
  );
}
