import React from 'react';
import { Award, TrendingUp, ThumbsUp } from 'lucide-react';

export default function TopRanking() {
  const ranks = [
    { name: 'Solaris MagSafe Pro', sales: '50k+ Orders', trend: '+12%', rank: 1 },
    { name: 'Industrial Core X1', sales: '32k+ Orders', trend: '+8%', rank: 2 },
    { name: 'Turbo Sync 15W', sales: '28k+ Orders', trend: '+15%', rank: 3 }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
         <Award size={40} color="var(--c-primary)"/>
         <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Top-Ranking Tech</h2>
            <p style={{ color: 'var(--c-muted)' }}>The highest volume products in global trade this month.</p>
         </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         {ranks.map((r, i) => (
           <div key={i} className="card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                 <div style={{ fontSize: '32px', fontWeight: 900, color: i === 0 ? 'var(--c-primary)' : '#ddd', width: '40px' }}>0{r.rank}</div>
                 <div style={{ width: '60px', height: '60px', background: '#F2F3F7', borderRadius: '8px' }}></div>
                 <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 700 }}>{r.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--c-muted)' }}>{r.sales}</span>
                 </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ color: 'var(--c-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={16}/> {r.trend}</div>
                 <div style={{ fontSize: '11px', color: 'var(--c-muted)', marginTop: '4px' }}>Market Momentum</div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
