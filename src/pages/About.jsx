import React from 'react';
import { ShieldCheck, Globe, Zap, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Founded', value: '2018', icon: <Zap size={24}/> },
    { label: 'Team', value: '500+', icon: <Users size={24}/> },
    { label: 'Global Offices', value: '12', icon: <Globe size={24}/> },
    { label: 'Certifications', value: 'ISO 9001', icon: <ShieldCheck size={24}/> }
  ];

  return (
    <div style={{ padding: '60px 0' }}>
      
      {/* HERO SECTION */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '80px' }}>
         <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '25px', letterSpacing: '-1px' }}>Global Commerce, <br/> <span style={{ color: 'var(--c-primary)' }}>Reinvented.</span></h1>
         <p style={{ color: 'var(--c-muted)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Solaris is a premier B2B sourcing platform specialized in high-precision electronic components and premium MagSafe accessories. We bridge the gap between global demand and elite manufacturing.
         </p>
      </div>

      {/* STATS */}
      <div style={{ background: '#F7F8FA', padding: '60px 0', marginBottom: '80px' }}>
         <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {stats.map((s, i) => (
               <div key={i} className="card" style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--c-primary)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                  <div style={{ fontSize: '24px', fontWeight: 900 }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: 'var(--c-muted)', marginTop: '5px' }}>{s.label}</div>
               </div>
            ))}
         </div>
      </div>

      {/* MISSION */}
      <div className="container">
         <div className="marketplace-grid" style={{ alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 6' }}>
               <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Our Mission: Reliability at Scale</h2>
               <p style={{ color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
                  We believe that global trade should be as seamless as local commerce. Our technology platform provides the transparency, safety, and efficiency required for modern industrial procurement.
               </p>
               <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', fontWeight: 700 }}>
                  <li style={{ display: 'flex', gap: '10px' }}><ShieldCheck size={20} color="var(--c-green)"/> Verified Manufacturers Only</li>
                  <li style={{ display: 'flex', gap: '10px' }}><ShieldCheck size={20} color="var(--c-green)"/> Trade Assurance Guaranteed</li>
                  <li style={{ display: 'flex', gap: '10px' }}><ShieldCheck size={20} color="var(--c-green)"/> Precision Logistical Tracking</li>
               </ul>
            </div>
            <div style={{ gridColumn: 'span 6' }}>
               <div style={{ width: '100%', height: '400px', background: '#eee', borderRadius: '12px' }}></div>
            </div>
         </div>
      </div>

    </div>
  );
}
