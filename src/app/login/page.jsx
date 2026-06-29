"use client";
import { useApp } from '../../contexts/AppProvider';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight, User } from 'lucide-react';

import { API_BASE_URL } from '../../config';

export default function Login() {
  const { auth, cart, setCart, theme, setTheme, addToCart, removeFromCart, updateQuantity, clearCart } = useApp();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [errorParam, setErrorParam] = useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setErrorParam(params.get('error'));
  }, []);

  const getErrorMessage = () => {
    if (errorParam === 'admin_required') return 'Accès Administrateur Requis. Veuillez vous connecter avec un compte autorisé.';
    if (errorParam === 'session_expired') return 'Votre session a expiré. Veuillez vous reconnecter.';
    if (errorParam === 'CredentialsSignin') return 'Identifiants incorrects. Veuillez réessayer.';
    return error;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.ok) {
        console.log('Login success');
        router.push('/');
        router.refresh();
      } else {
        setError(result.error || 'Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur de connexion au serveur (' + err.message + ')');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent pt-32 pb-24 px-4 selection:bg-[var(--accent-primary)]/30 selection:text-white font-sans uppercase italic">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--accent-primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-obsidian border border-white/10 !pt-24 !pb-16 !px-12 md:!px-16 rounded-[3.5rem] shadow-5xl relative overflow-hidden group">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--accent-primary)] opacity-[0.03] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-1000" />
        
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 glass-obsidian border border-white/10 rounded-full mb-12 shadow-3xl group-hover:border-[var(--accent-primary)]/50 transition-colors duration-700">
            <ShieldCheck className="h-10 w-10 text-[var(--accent-primary)] stroke-[2.5]" />
          </div>
          <h2 className="font-heading text-6xl text-white tracking-tighter mb-6 font-black uppercase italic leading-[0.9]">
            Flux <br/>
            <span className="text-[var(--accent-primary)] opacity-80 decoration-[var(--accent-primary)]/30 underline-offset-8">Accès</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-[1px] w-8 bg-white/10" />
            <p className="text-[10px] font-black text-white/20 tracking-[0.8em] uppercase italic">
              Protocole Sourcing
            </p>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
        </div>
        
        {(error || errorParam) && (
          <div className={`mb-10 p-6 rounded-2xl glass-obsidian border relative z-10 animate-pulse ${errorParam ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5'}`}>
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] text-center italic ${errorParam ? 'text-red-400' : 'text-[var(--accent-primary)]'}`}>
              ERREUR: {getErrorMessage()}
            </p>
          </div>
        )}

        <form className="space-y-8 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div className="relative group/field">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
              <input
                type="email"
                required
                className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic"
                placeholder="EMAIL ARCHIVE"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group/field">
              <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
              <input
                type="password"
                required
                className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic"
                placeholder="PASSCODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 transition-all"
              />
              <span className="ml-4 text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors italic">Maintenir Flux</span>
            </label>
            <Link href="/support" className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20 hover:text-[var(--accent-primary)] transition-colors italic">
              Perdu ?
            </Link>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="group/btn relative w-full flex items-center justify-center gap-4 bg-white text-black font-black uppercase tracking-[0.6em] py-7 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl disabled:opacity-50 italic"
            >
              <div className="absolute inset-0 bg-[var(--accent-primary)]/20 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-2xl" />
              <span className="relative z-10">{isLoading ? 'PROCESSING...' : 'INITIALISER'}</span>
              <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500 stroke-[3]" />
            </button>
          </div>
        </form>
        
        <div className="text-center pt-10 mt-10 border-t border-white/5 relative z-10">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">
            HORS SYSTÈME ?{' '}
            <Link 
              href="/register"
              className="text-white hover:text-[var(--accent-primary)] transition-colors ml-4 border-b border-white/10"
            >
              CRÉER MATRICE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
