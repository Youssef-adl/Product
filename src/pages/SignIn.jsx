import React from 'react';

export default function SignIn() {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '400px' }}>
      <div className="card" style={{ padding: '40px' }}>
         <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Sign In</h2>
         <p style={{ fontSize: '12px', color: 'var(--c-muted)', marginBottom: '30px' }}>Access your professional sourcing account.</p>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
               <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Account Name or Email:</label>
               <input type="text" placeholder="Email / Member ID" style={{ width: '100%', padding: '12px', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
            </div>
            <div>
               <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Password:</label>
               <input type="password" placeholder="Password" style={{ width: '100%', padding: '12px', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>Sign In</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--c-blue)' }}>
               <a href="#">Forgot password?</a>
               <a href="#">Join Free</a>
            </div>
         </div>
      </div>
    </div>
  );
}
