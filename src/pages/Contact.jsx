import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div className="marketplace-grid">
         
         <div style={{ gridColumn: 'span 5' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>Contact Support</h1>
            <p style={{ color: 'var(--c-muted)', marginBottom: '40px', fontSize: '16px' }}>
               Our global commerce experts are available 24/7 to assist with your sourcing needs.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(255,102,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-primary)' }}><Mail/></div>
                  <div><div style={{ fontWeight: 800 }}>Email</div><div style={{ color: 'var(--c-muted)' }}>support@Solaris.com</div></div>
               </div>
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(0,102,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-blue)' }}><Phone/></div>
                  <div><div style={{ fontWeight: 800 }}>Phone</div><div style={{ color: 'var(--c-muted)' }}>+1 (888) Solaris</div></div>
               </div>
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text)' }}><MapPin/></div>
                  <div><div style={{ fontWeight: 800 }}>HQ</div><div style={{ color: 'var(--c-muted)' }}>Tech Park, CA, USA</div></div>
               </div>
            </div>
         </div>

         <div style={{ gridColumn: 'span 7' }}>
            <div className="card" style={{ padding: '40px' }}>
               <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '30px' }}>Message Us</h4>
               <form style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '13px', fontWeight: 700 }}>Full Name</label>
                     <input type="text" placeholder="John Doe" style={{ padding: '12px', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '13px', fontWeight: 700 }}>Email Address</label>
                     <input type="email" placeholder="john@company.com" style={{ padding: '12px', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '13px', fontWeight: 700 }}>Message</label>
                     <textarea rows="5" placeholder="How can we help?" style={{ padding: '12px', border: '1px solid var(--c-border)', borderRadius: '4px', resize: 'none' }}></textarea>
                  </div>
                  <button className="btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center', padding: '15px' }}>
                     Send Inquiry <Send size={18} style={{ marginLeft: '10px' }}/>
                  </button>
               </form>
            </div>
         </div>

      </div>
    </div>
  );
}
