import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';
import Landing from './pages/Landing';
import Store from './pages/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';
import Technique from './pages/Technique';
import FAQ from './components/FAQ';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import Account from './pages/Account';
import Orders from './pages/Orders';

function App() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('user'))
  });
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
      setIsHovering(!!isClickable);
    };
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
    <Router>
      <PageTransition />
      <ScrollProgress />
      <div className="min-h-screen selection:bg-coral selection:text-white">
        <Navbar cart={cart} auth={auth} setAuth={setAuth} />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/boutique" element={<Store addToCart={addToCart} />} />
          <Route path="/technique" element={<Technique />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout auth={auth} cart={cart} clearCart={clearCart} />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/account" element={<Account auth={auth} />} />
          <Route path="/orders" element={<Orders auth={auth} />} />
          <Route path="/admin" element={<AdminDashboard auth={auth} />} />
          <Route path="/admin/products" element={<AdminProducts auth={auth} />} />
          <Route path="/admin/orders" element={<AdminOrders auth={auth} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
