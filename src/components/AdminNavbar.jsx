"use client";
import Link from 'next/link';

import React from 'react';


export default function AdminNavbar() {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Returns', path: '/admin/returns' },
    { name: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="bg-[#121212]/95 backdrop-blur-xl border-b border-white/5 fixed top-[80px] left-0 right-0 z-30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-8 flex gap-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            href={item.path}
            end
            className={({ isActive }) => 
              `py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-b-2 no-underline ${
                isActive 
                  ? 'border-[var(--accent-primary)] text-white' 
                  : 'border-transparent text-white/40 hover:text-white'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
