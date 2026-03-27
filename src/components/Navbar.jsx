import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ cart = [], auth, setAuth }) {
  const cartCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
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

  const isAdminRoute = location.pathname.startsWith('/admin');

  const regularLinks = [
    { name: 'ACCUEIL',     path: '/',          anchor: null },
    { name: 'BOUTIQUE',    path: '/boutique',  anchor: null },
    { name: 'GALERIE',     path: '/#gallery',  anchor: 'gallery' },
    { name: 'TECHNOLOGIE', path: '/#features', anchor: 'features' },
  ];

  const adminLinks = [
    { name: 'DASHBOARD', path: '/admin',          anchor: null },
    { name: 'PRODUCTS',  path: '/admin/products', anchor: null },
    { name: 'ORDERS',    path: '/admin/orders',   anchor: null },
    { name: 'RETURNS',   path: '/admin/returns',  anchor: null },
    { name: 'USERS',     path: '/admin/users',    anchor: null },
  ];

  const navLinks = isAdminRoute ? adminLinks : regularLinks;

  return (
    <nav className={`nav-pill transition-all duration-500 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center gap-6 px-4">
        
        {/* LOGO: Clean & Bold */}
        <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center group mr-8">
          <span className="font-heading font-black text-sm tracking-[0.2em] text-solar-text-primary group-hover:text-solar-accent-sun transition-colors duration-300 uppercase leading-tight">
            SOLARIS<br />LUX
          </span>
        </Link>

        {/* NAV LINKS: Minimal Style */}
        <div className="hidden lg:flex items-center gap-1 md:gap-4 lg:gap-8 border-l border-solar-glass-border ml-4 pl-4">
          {navLinks.map((link) => {
            const isActive = link.anchor 
              ? location.hash === `#${link.anchor}` 
              : location.pathname === link.path && !location.hash;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.anchor) {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      document.getElementById(link.anchor)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`nav-item flex flex-col items-center group relative ${isActive ? 'active text-solar-accent-sun' : ''}`}
              >
                <span className="relative z-10 group-hover:text-solar-accent-sun transition-colors">
                  {link.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-solar-accent-sun/5 blur-md -z-10"
                  />
                )}
                {/* Indicator */}
                <div className={`mt-1 h-[2px] w-0 group-hover:w-full bg-solar-accent-sun transition-all duration-300 ${isActive ? 'w-full' : ''}`} />
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 ml-auto">
          
          <Link
            to="/boutique"
            className="btn-primary !px-5 !py-2 !text-[9px] !gap-3 hidden sm:flex"
          >
            COMMANDER <ArrowRight size={14} />
          </Link>

          {/* User Auth: Design Style */}
          <div className="hidden md:flex items-center gap-6 border-l border-solar-glass-border pl-6">
            <Link to="/cart" className="relative p-2 text-solar-text-primary hover:text-solar-accent-sun transition-all group">
              <ShoppingBag size={24} strokeWidth={1.2} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={cartCount}
                  className="absolute -top-1.5 -right-1.5 bg-[#2D2D2A] text-white text-[10px] font-bold h-[18px] min-w-[18px] flex items-center justify-center rounded-full z-[1001] shadow-lg border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/account" className="font-heading text-[10px] font-black tracking-widest text-solar-text-primary hover:text-solar-accent-sun uppercase">
                ACCOUNT
              </Link>
              {auth.user ? (
                <button 
                  onClick={handleLogout}
                  className="text-solar-text-primary hover:text-solar-accent-sun transition-colors"
                >
                  <LogOut size={18} />
                </button>
              ) : (
                <Link to="/login" className="text-solar-text-primary hover:text-solar-accent-sun transition-colors">
                  <LogOut size={18} className="rotate-180" />
                </Link>
              )}
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-solar-text-primary hover:text-solar-accent-sun p-1 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE HUD OVERLAY */}
      <div className={`fixed top-full mt-4 left-1/2 -translate-x-1/2 w-[95vw] bg-solar-bg-primary border border-solar-glass-border p-8 rounded-none flex flex-col items-start gap-6 transition-all duration-500 origin-top z-50 overflow-hidden
        ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto border-solar-glass-border-hover shadow-xl' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        {/* Background Decorative Grid */}
        
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={(e) => {
              if (link.anchor) {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById(link.anchor)?.scrollIntoView({ behavior: 'smooth' });
                }
              }
              setIsMenuOpen(false);
            }}
            className="group relative font-heading text-5xl text-solar-text-primary hover:text-lando-yellow transition-all duration-300 font-extrabold uppercase italic tracking-tighter"
          >
            <span className="relative z-10">{link.name}</span>
            <div className="absolute left-0 bottom-0 h-2 w-0 group-hover:w-full bg-solar-accent-sun -z-10 transition-all duration-300" />
          </Link>
        ))}
        
        <div className="w-full h-[1px] bg-white/10 my-4" />
        
        <div className="flex gap-10">
          <Link 
            to="/account" 
            onClick={() => setIsMenuOpen(false)}
            className="font-heading text-lg text-solar-text-primary hover:text-lando-yellow font-black uppercase tracking-widest"
          >
            ACCOUNT
          </Link>
          <button 
            onClick={handleLogout}
            className="font-heading text-lg text-solar-accent-sun font-black uppercase tracking-widest border-none bg-transparent cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}
