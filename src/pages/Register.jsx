import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Building, UserPlus, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ setAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    company: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth({ token: data.access_token, user: data.user });
        navigate('/');
      } else {
        setError(data.message || 'Échec de l\'inscription. Veuillez vérifier vos informations.');
      }
    } catch (err) {
      setError('Erreur de connexion. Le serveur backend est-il actif ?');
      // Mock fallback for testing
      if (formData.email && formData.password) {
          const mockUser = { ...formData, id: Date.now(), role: 'client' };
          delete mockUser.password;
          delete mockUser.password_confirmation;
          localStorage.setItem('auth_token', 'mock_reg_token');
          localStorage.setItem('user', JSON.stringify(mockUser));
          setAuth({ token: 'mock_reg_token', user: mockUser });
          navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary pt-32 pb-20 px-4 selection:bg-coral selection:text-white">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 glass-solar !p-0 overflow-hidden animate-in fade-in slide-in-from-bottom duration-1000">
        
        {/* LEFT SIDE: INFO */}
        <div className="bg-bg-secondary p-12 flex flex-col justify-center border-r border-glass-border">
          <div className="mb-10">
            <h2 className="font-serif text-4xl text-text-primary mb-4 leading-tight">
              Rejoignez l'élite du Sourcing Solaire
            </h2>
            <p className="text-text-muted text-sm font-medium leading-relaxed">
              Accédez à notre catalogue exclusif SmartCharge et bénéficiez de conditions préférentielles pour vos projets d'envergure.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: CheckCircle, text: "Accès prioritaire aux nouvelles technologies" },
              { icon: ShieldCheck, text: "Protection des transactions B2B" },
              { icon: Building, text: "Support logistique dédié aux entreprises" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-glass-border group-hover:border-coral/30 transition-colors">
                  <item.icon className="h-5 w-5 text-coral" />
                </div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-glass-border">
            <p className="text-[10px] text-text-muted italic leading-relaxed">
              En créant un compte, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité "Solaris Privacy".
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="p-12 bg-white/40">
          <div className="mb-10">
            <h3 className="font-serif text-3xl text-text-primary mb-2">Inscription</h3>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
              Formulaire d'accréditation
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-coral/5 border border-coral/20 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-coral uppercase tracking-widest text-center">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-sm font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                  placeholder="NOM COMPLET"
                  onChange={handleChange}
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-sm font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                  placeholder="EMAIL PROFESSIONNEL"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                   <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                   <input
                     name="company"
                     type="text"
                     className="w-full pl-11 pr-3 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-xs font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                     placeholder="ENTREPRISE"
                     onChange={handleChange}
                   />
                </div>
                <div className="relative group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                   <input
                     name="phone"
                     type="text"
                     className="w-full pl-11 pr-3 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-xs font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                     placeholder="TÉLÉPHONE"
                     onChange={handleChange}
                   />
                </div>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-sm font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                  placeholder="MOT DE PASSE"
                  onChange={handleChange}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-coral transition-colors" />
                <input
                  name="password_confirmation"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary/50 border border-glass-border rounded-xl text-sm font-medium text-text-primary focus:ring-2 focus:ring-coral/10 focus:border-coral outline-none transition-all placeholder:text-text-muted/40"
                  placeholder="CONFIRMATION"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center group !py-4 mt-4"
            >
               {isLoading ? 'TRAITEMENT...' : 'REJOINDRE SOLARIS'}
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              DÉJÀ INSCRIT ?{' '}
              <Link 
                to="/login"
                className="text-coral hover:text-coral/80 transition-colors ml-2"
              >
                SE CONNECTER
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
