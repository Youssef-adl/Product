import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminNavbar() {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 pt-16">
      <div className="max-w-7xl mx-auto px-8 flex gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => 
              `py-4 text-sm font-bold border-b-2 transition-colors no-underline ${
                isActive 
                  ? 'border-orange-600 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
