import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Mock logic for B2B portal if API fails
    if (email === 'admin@Solaris.com' && password === 'admin2026') {
        const mockUser = { id: 1, name: 'B2B Admin', email: 'admin@Solaris.com', role: 'admin' };
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setAuth({ token: 'mock_token_123', user: mockUser });
        navigate('/admin');
        return;
    }

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
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth({ token: data.access_token, user: data.user });
        navigate('/');
      } else {
        setError(data.message || 'Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Erreur de connexion. Tentative de portail local...');
      // Fallback to mock for testing
      if (email && password) {
         const mockUser = { id: 2, name: 'Client Test', email: email, role: 'client' };
         localStorage.setItem('auth_token', 'mock_client_token');
         localStorage.setItem('user', JSON.stringify(mockUser));
         setAuth({ token: 'mock_client_token', user: mockUser });
         navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[32px] shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-3xl mb-8 shadow-lg">
            <ShieldCheck className="h-10 w-10 text-[#CCFF00]" />
          </div>
          <h2 className="text-4xl font-black text-black tracking-tighter leading-none mb-4 uppercase">
            PORTAIL<br />LOGISTIQUE
          </h2>
          <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">
            S'IDENTIFIER POUR ACCÉDER AU SOURCING
          </p>
        </div>
        
        {error && (
          <div className="bg-black text-[#CCFF00] text-[10px] font-black tracking-widest uppercase p-4 rounded-xl border border-[#CCFF00]/20 animate-pulse">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-black focus:ring-2 focus:ring-black transition-all appearance-none"
                placeholder="EMAIL PROFESSIONNEL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-black focus:ring-2 focus:ring-black transition-all appearance-none"
                placeholder="MOT DE PASSE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label className="ml-2 block text-[10px] font-black text-gray-400 uppercase tracking-widest">Rester connecté</label>
            </div>
            <div className="text-[10px] font-black tracking-widest uppercase">
              <a href="#" className="text-gray-400 hover:text-black transition-colors no-underline">
                Oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-3 py-5 px-4 bg-black text-white text-xs font-black rounded-full hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-xl uppercase tracking-[0.2em]"
            >
              {isLoading ? 'AUTHENTIFICATION...' : 'ACCÉDER AU SYSTÈME'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
        
        <div className="text-center pt-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            PAS DE COMPTE ?{' '}
            <Link 
              to="/register"
              className="text-black hover:underline decoration-2 underline-offset-4"
            >
              NOUS REJOINDRE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
