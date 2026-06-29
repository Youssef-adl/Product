"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Menu, X, ArrowRight, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useApp } from '../contexts/AppProvider';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function Navbar() {
  const { cart, auth } = useApp();
  const { playSound } = useSoundEffects();
  const cartCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  const isAuthPage = isLoginPage || isRegisterPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
      setIsMenuOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isAdminRoute = pathname.startsWith('/admin');

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
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'bg-[var(--glass-bg)] backdrop-blur-[40px] border-b border-[var(--glass-border)] py-4' : 'bg-transparent py-8'} px-6 lg:px-12`}>
      <div className="flex items-center justify-between max-w-[1600px] mx-auto h-12">
        
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => {
            playSound('click');
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}
          className="flex items-center group"
        >
          <div className="flex items-center bg-[var(--glass-bg)] backdrop-blur-xl px-5 py-2 rounded-full border border-[var(--glass-border)] group-hover:border-accent-secondary/50 transition-all duration-500">
            <span className="font-serif font-bold text-[var(--text-primary)] text-base tracking-[0.1em] uppercase">
              SOLARIS <span className="text-accent-secondary">LUX</span>
            </span>
          </div>
        </Link>

        {/* NAV LINKS (CENTER) */}
        <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = link.anchor 
              ? false 
              : pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onMouseEnter={() => playSound('hover')}
                onClick={(e) => {
                  playSound('click');
                  if (link.anchor) {
                    if (pathname === '/') {
                      e.preventDefault();
                      document.getElementById(link.anchor)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`relative font-sans text-[13px] font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 ${isActive ? 'text-accent-primary' : 'text-[var(--text-subtle)] hover:text-accent-primary'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-primary rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Cart & Auth */}
          <div className="flex items-center gap-4">
            {auth.user?.role !== 'admin' && (
              <Link href="/cart" className="relative p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:scale-110 transition-all bg-[var(--bg-secondary)] rounded-full">
                <ShoppingBag size={18} strokeWidth={2} />
                <AnimatePresence mode="wait">
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute -top-1 -right-1 bg-accent-primary text-white text-[10px] font-black h-4 min-w-[16px] flex items-center justify-center rounded-full shadow-sm px-1"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )}

            {auth.user && auth.user?.role !== 'admin' && (
              <Link href="/account" className="hidden md:flex p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:scale-110 transition-all bg-[var(--bg-secondary)] rounded-full">
                <span className="font-sans text-[11px] font-bold tracking-widest uppercase">Compte</span>
              </Link>
            )}

            <div className="hidden md:flex items-center gap-3">
              {auth.user && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full">
                  <div className={`w-1.5 h-1.5 rounded-full ${auth.user.role === 'admin' ? 'bg-accent-primary animate-pulse' : 'bg-red-400'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] opacity-90">
                    {auth.user.role === 'admin' ? 'ADMIN' : auth.user.name.split(' ')[0]}
                  </span>
                </div>
              )}

              {!isAuthPage && (
                auth.user ? (
                  <button
                    onClick={handleLogout}
                    className="p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:scale-110 transition-all bg-[var(--bg-secondary)] rounded-full"
                  >
                    <LogOut size={16} />
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/login" 
                      className="text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-[0.2em] transition-all"
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/register" 
                      className="px-8 py-2.5 bg-[var(--accent-secondary)] text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all shadow-xl"
                    >
                      Inscription
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[var(--text-primary)] hover:text-accent-primary p-2 transition-colors ml-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[var(--bg-primary)] z-[2000] flex flex-col justify-between p-6 overflow-hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div>
              <div className="flex justify-between items-center mb-10">
                <span className="font-sans font-black text-[var(--text-primary)] text-2xl tracking-tighter uppercase">
                  SOLARIS LUX
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[var(--text-primary)] hover:text-accent-primary p-2 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-sans text-3xl font-bold text-[var(--text-primary)] hover:text-accent-primary transition-colors uppercase tracking-tight"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mb-4">
              {auth.user && auth.user?.role !== 'admin' && (
                <Link 
                  href="/account" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans text-sm text-[var(--text-subtle)] hover:text-[var(--text-primary)] font-bold uppercase tracking-widest transition-colors"
                >
                  Mon Compte
                </Link>
              )}
              
              {!isAuthPage && (
                auth.user ? (
                  <button 
                    onClick={handleLogout}
                    className="font-sans text-left text-sm text-accent-primary font-bold uppercase tracking-widest transition-opacity hover:opacity-70 mt-4"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 mt-6">
                    <Link 
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[var(--text-muted)] font-black text-xs uppercase tracking-[0.4em] italic hover:text-[var(--text-primary)] transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-center font-black text-xs uppercase tracking-[0.4em] italic rounded-2xl"
                    >
                      Inscription
                    </Link>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
