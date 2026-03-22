import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Building, UserPlus, CheckCircle } from 'lucide-react';
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
        setError(data.message || 'Registration failed. Check your data.');
      }
    } catch (err) {
      setError('Connection error. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full space-y-8 bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join the world's leading B2B marketplace.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Sourcing solutions for global trade.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Connect with verified suppliers.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Secure payment and order protection.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 italic">By clicking "Join Free Now", you agree to our Terms of Use and Privacy Policy.</p>
          </div>
        </div>

        <div className="flex-1">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3">
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Full Name"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Business Email"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="company"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Company Name"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="phone"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Password (min 8 characters)"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  name="password_confirmation"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <UserPlus className="h-5 w-5" />
              {isLoading ? 'Creating Account...' : 'Join Free Now'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-orange-600 font-bold hover:underline no-underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
