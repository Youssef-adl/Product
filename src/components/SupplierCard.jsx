import React from 'react';
import { Star, MapPin, Award, CheckCircle } from 'lucide-react';

export default function SupplierCard() {
  return (
    <div className="card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
      <div style={{ borderBottom: '1px solid var(--c-border)', paddingBottom: '20px', marginBottom: '20px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '50px', height: '50px', background: '#F2F3F7', borderRadius: '8px', border: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--c-primary)' }}>L</div>
            <div>
               <h4 style={{ fontSize: '16px', fontWeight: 800 }}>Solaris Manufacturing Co., Ltd.</h4>
               <div className="badge-verified"><CheckCircle size={10}/> Verified Supplier</div>
            </div>
         </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--c-muted)' }}>Supplier index:</span>
            <div style={{ display: 'flex', color: '#FFB800' }}>
               <Star size={14} fill="#FFB800"/><Star size={14} fill="#FFB800"/><Star size={14} fill="#FFB800"/><Star size={14} fill="#FFB800"/><Star size={14} fill="none"/>
            </div>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--c-muted)' }}>Main products:</span>
            <span style={{ fontWeight: 600 }}>MagSafe Chargers</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--c-muted)' }}>Country/Region:</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}><MapPin size={12}/> CN</span>
         </div>
      </div>

      <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
         <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Inquiry</button>
         <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Chat Now</button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--c-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
         <Award size={12}/> Trade Assurance keeps your order safe
      </div>
    </div>
  );
}
