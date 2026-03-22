import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Circle, ArrowRight } from 'lucide-react';

export default function Navbar({ cart = [] }) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'BOUTIQUE', path: '/boutique' },
    { name: 'TECHNIQUE', path: '/technique' },
  ];

  return (
    <nav className={`nav-pill transition-all duration-500 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center gap-8 px-4">
        {/* LOGO */}
        <Link to="/" className="font-serif text-xl tracking-tight text-slate-800 hover:text-[#E85D4E] transition-colors mr-4">
          SOLARIS
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
                {/* Active dot indicator — inspired by Lando Norris nav */}
                <span className="nav-active-dot" />
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="hidden sm:flex btn-sun !px-6 !py-2.5 !text-[11px] shadow-sm relative group/cart">
             <ShoppingBag size={16} /> 
             <span className="ml-2 mt-0.5 uppercase tracking-widest">PANIER</span>
             {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-coral-deep text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-fade-in group-hover/cart:scale-110 transition-transform">
                 {cartCount}
               </span>
             )}
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-slate-500 hover:text-coral-deep p-2 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed top-full mt-4 left-1/2 -translate-x-1/2 w-[90vw] glass-solar p-8 flex flex-col items-center gap-6 transition-all duration-500 origin-top
        ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
         {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-3xl text-slate-800 hover:text-coral-deep transition-colors"
            >
              {link.name}
            </Link>
         ))}
         <Link to="/boutique" onClick={() => setIsMenuOpen(false)} className="btn-sun w-full justify-center">
            BOUTIQUE <ArrowRight size={18} />
          </Link>
      </div>
    </nav>
  );
}
