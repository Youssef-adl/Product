import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight, User, LogOut } from 'lucide-react';

export default function Navbar({ cart = [], auth, setAuth }) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setAuth({ token: null, user: null });
      setIsMenuOpen(false);
      navigate('/');
    }
  };

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
          {/* PRÉ-COMMANDER CTA (Only if on Home or Not Logged In) */}
          <a
            href="#cta"
            onClick={(e) => handleAnchor(e, 'cta')}
            className="hidden md:flex btn-sun !px-5 !py-2 !text-[10px] whitespace-nowrap"
          >
            S'ABONNER
          </a>

          <Link to="/cart" className="hidden sm:flex btn-sun !px-5 !py-2.5 !text-[11px] shadow-sm relative group/cart !overflow-visible">
            <ShoppingBag size={15} />
            <span className="ml-1.5 mt-0.5 uppercase tracking-widest">PANIER</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D14D3F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH SECTION */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {auth.user ? (
              <>
                <Link to="/account" className="btn-sun !px-4 !py-2.5 !text-[10px] flex items-center gap-2">
                  <User size={14} />
                  <span className="uppercase tracking-widest">COMPTE</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="nav-item !p-2 !rounded-full hover:bg-coral/10 hover:text-coral"
                  title="Déconnexion"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-item !px-4 !py-2 !text-[11px] uppercase tracking-widest font-bold border border-glass-border">
                CONNEXION
              </Link>
            )}
          </div>

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
        <div className="w-full h-[1px] bg-glass-border my-2" />
        {auth.user ? (
          <>
            <Link 
              to="/account" 
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-3xl text-text-primary hover:text-accent-sun"
            >
              MON COMPTE
            </Link>
            <button 
              onClick={handleLogout}
              className="font-serif text-3xl text-coral"
            >
              DÉCONNEXION
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif text-3xl text-text-primary hover:text-accent-sun font-bold"
          >
            CONNEXION
          </Link>
        )}
      </div>
    </nav>
  );
}
