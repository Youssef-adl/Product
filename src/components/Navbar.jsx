import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

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

  const isHome = location.pathname === '/';

  // Smooth scroll helper for anchor links on homepage
  const handleAnchor = (e, id) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'ACCUEIL',    path: '/',          anchor: null },
    { name: 'BOUTIQUE',   path: '/boutique',  anchor: null },
    { name: 'GALERIE',    path: '/#gallery',  anchor: 'gallery' },
    { name: 'TECHNIQUE',  path: '/#features', anchor: 'features' },
    { name: 'FAQ',        path: '/#faq',      anchor: 'faq' },
  ];

  return (
    <nav className={`nav-pill transition-all duration-500 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center gap-6 px-4">
        {/* LOGO */}
        <Link to="/" className="font-serif text-xl tracking-tight text-text-primary hover:text-coral transition-colors mr-2">
          SOLARIS
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.anchor 
              ? location.hash === `#${link.anchor}` 
              : location.pathname === link.path && !location.hash;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={link.anchor ? (e) => handleAnchor(e, link.anchor) : undefined}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
                <span className="nav-active-dot" />
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 ml-2">
          {/* PRÉ-COMMANDER CTA */}
          <a
            href="#cta"
            onClick={(e) => handleAnchor(e, 'cta')}
            className="hidden md:flex btn-sun !px-5 !py-2 !text-[10px] whitespace-nowrap"
          >
            PRÉ-COMMANDER
          </a>

          <Link to="/cart" className="hidden sm:flex btn-sun !px-5 !py-2.5 !text-[11px] shadow-sm relative group/cart">
            <ShoppingBag size={15} />
            <span className="ml-1.5 mt-0.5 uppercase tracking-widest">PANIER</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D14D3F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-text-muted hover:text-accent-sun p-2 transition-colors">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed top-full mt-4 left-1/2 -translate-x-1/2 w-[90vw] bg-glass-bg backdrop-blur-3xl border border-glass-border p-8 rounded-3xl flex flex-col items-center gap-6 transition-all duration-500 origin-top z-50
        ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={link.anchor ? (e) => handleAnchor(e, link.anchor) : () => setIsMenuOpen(false)}
            className="font-serif text-3xl text-text-primary hover:text-accent-sun transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <a
          href="#cta"
          onClick={(e) => handleAnchor(e, 'cta')}
          className="btn-sun w-full justify-center"
        >
          PRÉ-COMMANDER <ArrowRight size={18} />
        </a>
      </div>
    </nav>
  );
}
