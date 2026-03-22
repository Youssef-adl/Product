import React from 'react';
import useReveal from '../hooks/useReveal';
import { Settings, PenTool, Globe } from 'lucide-react';

export default function HowItWorks() {
  const [ref, isVisible] = useReveal(0.1);

  return (
    <section ref={ref} className="section" style={{ padding: '40px 0' }}>
      <div className="card" style={{ padding: '40px' }}>
         <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '30px' }}>Customization Services</h2>
         
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
            {[
              { icon: <PenTool size={32}/>, title: 'Customized Logo', desc: 'Min. Order: 50 Pieces. Laser engraving or high-quality silk print.' },
              { icon: <Settings size={32}/>, title: 'Customized Packaging', desc: 'Min. Order: 500 Pieces. Full color gift box with custom inserts.' },
              { icon: <Globe size={32}/>, title: 'Regional Standards', desc: 'Custom plug types and local certifications (KC, BIS, etc.) available.' }
            ].map((service, i) => (
              <div key={i} style={{ padding: '20px', background: '#FDFDFD', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                 <div style={{ color: 'var(--c-primary)', marginBottom: '20px' }}>{service.icon}</div>
                 <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{service.title}</h4>
                 <p style={{ fontSize: '13px', color: 'var(--c-muted)', lineHeight: 1.6 }}>{service.desc}</p>
              </div>
            ))}
         </div>

         <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 102, 0, 0.05)', borderRadius: '8px', border: '1px solid rgba(255,102,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 600, color: 'var(--c-primary)' }}>Need a custom prototype for your project?</div>
            <button className="btn-secondary">Request a Sample</button>
         </div>
      </div>
    </section>
  );
}
