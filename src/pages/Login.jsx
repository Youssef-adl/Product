import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const errorParam = queryParams.get('error');

  const getErrorMessage = () => {
    if (errorParam === 'admin_required') return 'Accès Administrateur Requis. Veuillez vous connecter avec un compte autorisé.';
    if (errorParam === 'session_expired') return 'Votre session a expiré. Veuillez vous reconnecter.';
    return error;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login success, user role:', data.user.role);
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth({ token: data.access_token, user: data.user });
        
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Login API error:', err);
      setError('Erreur de connexion au serveur (' + err.message + ')');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-solar-bg-primary pt-24 pb-12 px-4 selection:bg-solar-accent-sun selection:text-white">
      <div className="max-w-md w-full glass-solar !p-12 rounded-[2.5rem] shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-solar-accent-sun rounded-full mb-8 shadow-2xl ">
            <ShieldCheck className="h-10 w-10 text-solar-text-primary" />
          </div>
          <h2 className="font-heading text-5xl text-solar-text-primary tracking-tight mb-4 font-black uppercase italic">
            Connexion
          </h2>
          <p className="text-[10px] font-bold text-solar-text-muted tracking-[0.2em] uppercase">
            Accréditation Sourcing Professionnel
          </p>
        </div>
        
        {(error || errorParam) && (
          <div className={`mb-8 p-4 rounded-3xl border ${errorParam ? 'bg-orange-50 border-orange-200' : 'bg-solar-accent-sun/5 border-solar-accent-sun/20'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-center ${errorParam ? 'text-orange-700' : 'text-solar-accent-sun'}`}>
              {getErrorMessage()}
            </p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-solar-text-muted group-focus-within:text-solar-accent-sun transition-colors" />
              <input
                type="email"
                required
                className="w-full pl-16 pr-6 py-5 bg-solar-bg-secondary border border-solar-glass-border rounded-full text-sm font-medium text-solar-text-primary focus:ring-2 focus:ring-solar-accent-sun/10 focus:border-solar-accent-sun outline-none transition-all placeholder:text-solar-text-muted/50 uppercase tracking-widest"
                placeholder="EMAIL PROFESSIONNEL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-solar-text-muted group-focus-within:text-solar-accent-sun transition-colors" />
              <input
                type="password"
                required
                className="w-full pl-16 pr-6 py-5 bg-solar-bg-secondary border border-solar-glass-border rounded-full text-sm font-medium text-solar-text-primary focus:ring-2 focus:ring-solar-accent-sun/10 focus:border-solar-accent-sun outline-none transition-all placeholder:text-solar-text-muted/50 uppercase tracking-widest"
                placeholder="MOT DE PASSE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 bg-solar-bg-secondary border-solar-glass-border rounded text-solar-accent-sun focus:ring-solar-accent-sun/20"
              />
              <span className="ml-3 text-[10px] font-bold text-solar-text-muted uppercase tracking-widest group-hover:text-solar-text-secondary transition-colors">Rester connecté</span>
            </label>
            <a href="#" className="text-[10px] font-bold tracking-widest uppercase text-solar-text-muted hover:text-solar-accent-sun transition-colors">
              Oublié ?
            </a>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center group !py-5"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  AUTHENTIFICATION...
                </span>
              ) : (
                <>
                  ACCÉDER AU SYSTÈME
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center pt-8 mt-4 border-t border-solar-glass-border">
          <p className="text-[10px] font-bold text-solar-text-muted uppercase tracking-widest">
            PAS ENCORE MEMBRE ?{' '}
            <Link 
              to="/register"
              className="text-solar-accent-sun hover:text-solar-accent-sun/80 transition-colors ml-2"
            >
              CRÉER UN COMPTE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
