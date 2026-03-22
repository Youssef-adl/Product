import React from 'react';

export default function Policy({ title, content }) {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '40px' }}>{title}</h1>
      <div className="card" style={{ padding: '50px', lineHeight: 1.8, fontSize: '16px', color: '#444' }}>
         {content || (
           <>
             <p style={{ marginBottom: '30px' }}>
               This policy governs the terms of use and logistical agreements for the Solaris.com platform. As a B2B marketplace, we adhere to international commercial standards for shipping, data protection, and contract law.
             </p>
             <h4 style={{ fontWeight: 800, marginTop: '40px', marginBottom: '20px' }}>1. Scope of Agreement</h4>
             <p>All transactions conducted via Solaris are subject to industrial procurement regulations. Lead times and delivery nodes are calculated based on factory capacity.</p>
             
             <h4 style={{ fontWeight: 800, marginTop: '40px', marginBottom: '20px' }}>2. Data & Privacy</h4>
             <p>Member data is protected under high-encryption protocols. We do not sell corporate procurement data to third-party advertisers.</p>
             
             <h4 style={{ fontWeight: 800, marginTop: '40px', marginBottom: '20px' }}>3. Shipping & Logistics</h4>
             <p>Standard lead time for mass production is 14-21 business days. Samples are dispatched within 72 hours via express logistics (DHL/FedEx).</p>
           </>
         )}
      </div>
    </div>
  );
}
