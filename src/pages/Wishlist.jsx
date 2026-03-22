import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function Wishlist({ setCurrentPage, addToCart }) {
  // Mock wishlist data
  const favorites = [
    { name: 'Solaris Pro Max 15W', price: '$15.00' },
    { name: 'Solaris Air Mini', price: '$8.50' }
  ];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '30px' }}>My Wishlist</h2>
      
      <div className="marketplace-grid">
         {favorites.map((item, i) => (
           <div key={i} className="card" style={{ gridColumn: 'span 3', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '100%', height: '150px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '15px' }}></div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>{item.name}</h4>
              <div style={{ color: 'var(--c-primary)', fontWeight: 800, marginBottom: '15px' }}>{item.price}</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                 <button className="btn-primary" onClick={() => addToCart(item)} style={{ flex: 1, padding: '10px', fontSize: '12px' }}>
                    Add to Cart
                 </button>
                 <button style={{ padding: '10px', background: 'none', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer' }}>
                    <Trash2 size={16} color="var(--c-red)"/>
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
