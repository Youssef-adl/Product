"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSmoothScroll } from '../utils/useSmoothScroll';
import { useSession } from 'next-auth/react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  useSmoothScroll(true);
  const { data: session, status } = useSession();
  
  const [isClient, setIsClient] = useState(false);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');
  const [localAuth, setLocalAuth] = useState({ user: null, token: null });

  // Computed auth object for compatibility with existing components
  // Prioritize session from next-auth, fallback to localAuth for legacy components
  const auth = useMemo(() => ({
    user: session?.user || localAuth.user,
    token: status === 'authenticated' ? session?.user?.access_token : localAuth.token,
    status
  }), [session, localAuth, status]);

  const setAuth = (data) => {
    console.log('AppProvider: manual setAuth call', data);
    setLocalAuth(data);
  };

  useEffect(() => {
    setIsClient(true);
    
    try {
      const cartStr = localStorage.getItem('cart');
      if (cartStr) setCart(JSON.parse(cartStr));

      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) setTheme(savedTheme);
    } catch (e) {
      console.error('Error loading state from LocalStorage:', e);
    }
  }, []);

  // Sync to LocalStorage on updates
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  useEffect(() => {
    if (isClient) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isClient]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      auth, setAuth,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      theme, setTheme,
      isClient
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
