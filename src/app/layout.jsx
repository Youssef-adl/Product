import React from 'react';
import { AppProvider } from '../contexts/AppProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import PageTransition from '../components/PageTransition';
import MusicPlayer from '../components/MusicPlayer';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

import './globals.css';

export const metadata = {
  title: 'Solaris Lux',
  description: 'A premium, minimalist, and cinematic user interface.',
};

import { NextAuthProvider } from '../contexts/NextAuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300;1,500&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen selection:bg-[var(--accent-primary)]/30 selection:text-white bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
        <NextAuthProvider>
          <ThemeProvider>
            <AppProvider>
            <MusicPlayer />
            <ThemeToggle />
          <div className="noise-overlay" />
          
          {/* Global Cinematic Background */}
          <div 
            className="fixed inset-0 pointer-events-none z-[-1] transition-colors duration-500"
            style={{
              background: "radial-gradient(circle at 50% 50%, var(--bg-gradient-center) 0%, var(--bg-primary) 100%)",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" 
                 style={{ backgroundImage: 'linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            {/* Sanguine Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--border-light)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full opacity-50 bg-[radial-gradient(circle_at_80%_70%,var(--accent-secondary)_0%,transparent_50%)]" />
          </div>

          <div className="min-h-screen relative">
            <Navbar />
            <main>
              {children}
            </main>
            <Newsletter />
            <Footer />
          </div>
            </AppProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
