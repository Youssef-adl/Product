"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Building, UserPlus, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useApp } from '../../contexts/AppProvider';

export default function Register() {
  const { auth } = useApp();
  const router = useRouter();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (auth?.user) {
      router.replace('/');
    }
  }, [auth?.user, router]);

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

    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Automatically sign in after registration
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password
        });

        if (result.ok) {
          router.push('/');
          router.refresh();
        } else {
          router.push('/login');
        }
      } else {
        setError(data.error || 'Échec de l\'inscription.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent pt-40 pb-24 px-4 selection:bg-[var(--accent-primary)]/30 selection:text-white font-sans uppercase italic">
      {/* Background Accents */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 glass-obsidian border border-white/10 !p-0 overflow-hidden rounded-[4rem] shadow-5xl relative group">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--accent-primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000" />

        {/* LEFT SIDE: PROTOCOL INFO */}
        <div className="glass-obsidian p-12 lg:p-20 flex flex-col justify-center border-r border-white/5 relative z-10 bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
          
          <div className="mb-12 relative z-10">
            <h2 className="font-heading text-4xl lg:text-6xl text-white mb-6 leading-[0.9] font-black uppercase italic tracking-tighter">
              Initialiser <br/>
              <span className="text-[var(--accent-primary)] opacity-80 underline underline-offset-[10px] decoration-[var(--accent-primary)]/20">Matrice</span>
            </h2>
            <p className="text-white/40 text-[10px] font-medium leading-relaxed font-sans italic tracking-[0.1em] border-l border-white/10 pl-8 mt-10 uppercase">
              Accédez à l'archive exclusive SmartCharge et activez les protocoles de sourcing.
            </p>
          </div>

          <div className="space-y-8 relative z-10">
            {[
              { icon: CheckCircle, text: "Accès Flux Prioritaire", sub: "Technologies Solaire V1" },
              { icon: ShieldCheck, text: "Chiffrement AES-256", sub: "Protection B2B Archive" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 group/item">
                <div className="w-12 h-12 rounded-full glass-obsidian flex items-center justify-center border border-white/5 group-hover/item:border-[var(--accent-primary)]/40 transition-all duration-700">
                  <item.icon className="h-5 w-5 text-[var(--accent-primary)]" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">{item.text}</p>
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.1em] italic mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: ACCREDITATION FORM */}
        <div className="p-12 lg:p-20 relative z-10 flex flex-col justify-center bg-black/20">
          <div className="mb-12">
             <div className="flex items-center gap-4 text-[var(--accent-primary)] mb-4">
                <div className="w-6 h-[1px] bg-[var(--accent-primary)]/40" />
                <span className="text-[8px] font-black tracking-[0.5em] uppercase italic opacity-60">Formulaire d'Accréditation</span>
             </div>
             <h3 className="font-heading text-3xl text-white font-black uppercase italic tracking-tighter">Initialiser Flux</h3>
          </div>

          {error && (
            <div className="mb-10 glass-obsidian border-red-500/30 bg-red-500/5 p-6 rounded-2xl animate-pulse">
              <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.4em] text-center italic">ALERTE: {error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group/field">
                <User className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                <input
                  name="name"
                   type="text"
                   required
                   className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic"
                   placeholder="IDENTITÉ RÉELLE"
                   onChange={handleChange}
                 />
              </div>
              <div className="relative group/field">
                <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                <input
                  name="email"
                   type="email"
                   required
                   className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic"
                   placeholder="EMAIL ARCHIVE"
                   onChange={handleChange}
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group/field">
                   <Building className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                   <input
                     name="company"
                      type="text"
                      className="w-full pl-20 pr-6 py-6 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.1em] italic"
                      placeholder="ENTITÉ"
                      onChange={handleChange}
                    />
                </div>
                <div className="relative group/field">
                   <Phone className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                   <input
                     name="phone"
                      type="text"
                      className="w-full pl-20 pr-6 py-6 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.1em] italic"
                      placeholder="TERMINAL"
                      onChange={handleChange}
                    />
                </div>
              </div>
              <div className="relative group/field">
                <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                <input
                  name="password"
                   type="password"
                   required
                   className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic"
                   placeholder="NOUVEAU PASSCODE"
                   onChange={handleChange}
                 />
              </div>
              {/* Password Confirmation */}
              <div className="relative group/field">
                <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/field:text-[var(--accent-primary)] transition-colors duration-500" />
                <input
                  name="password_confirmation"
                  type="password"
                  required
                  className="w-full pl-20 pr-8 py-6 bg-white/5 border border-white/10 rounded-full text-sm font-black text-white focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-[var(--accent-primary)]/10 outline-none transition-all duration-700 placeholder:text-white/30 uppercase tracking-[0.2em] italic [&:-webkit-autofill]:[box-shadow:0_0_0_30px_rgba(30,30,30,0.9)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  placeholder="CONFIRMER PASSCODE"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className="group/btn relative w-full flex items-center justify-center gap-4 bg-white text-black font-black uppercase tracking-[0.5em] py-6 mt-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl disabled:opacity-50 italic"
            >
               <div className="absolute inset-0 bg-[var(--accent-primary)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-2xl" />
               <span className="relative z-10">{isLoading ? 'PROCESSING...' : 'INITIALISER'}</span>
               <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500 stroke-[3]" />
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">
              DÉJÀ DANS LA MATRICE ?{' '}
              <Link 
                href="/login"
                className="text-white hover:text-[var(--accent-primary)] transition-colors ml-3 border-b border-white/10 pb-0.5"
              >
                AUTO-IDENTIFICATION
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
