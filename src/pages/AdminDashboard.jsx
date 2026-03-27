import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, BarChart3, Plus, Edit, Trash2, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function AdminDashboard({ auth }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    activeUsers: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      console.log('Fetching dashboard stats with token:', auth.token ? 'Present' : 'Missing');
      try {
        const response = await fetch('http://localhost:8000/api/dashboard-stats', {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Accept': 'application/json'
          }
        });
        
        if (response.status === 401 || response.status === 403) {
           localStorage.removeItem('auth_token');
           localStorage.removeItem('user');
           window.location.href = '/login?error=' + (response.status === 403 ? 'admin_required' : 'session_expired');
           return;
        }

        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };
    
    if (auth.token) {
      fetchStats();
    }
  }, [auth.token]);

  return (
    <div className="bg-transparent min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-8 pt-32">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, {auth.user?.name}. Manage your B2B marketplace operations.</p>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Package className="text-solar-accent-sun"/>} label="Total Products" value={stats.totalProducts} trend="+4 active today" />
          <StatCard icon={<ShoppingBag className="text-solar-accent-sun"/>} label="Total Revenue" value={`${stats.totalSales.toLocaleString()} DH`} trend="+12.5% vs last month" />
          <StatCard icon={<Users className="text-solar-accent-sun"/>} label="Active Clients" value={stats.activeUsers} trend="+8 new signups" />
          <StatCard icon={<BarChart3 className="text-solar-accent-sun"/>} label="Conversion" value="3.2%" trend="+0.4% from ads" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RECENT ORDERS */}
          <div className="lg:col-span-2 glass-solar !p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Recent Procurement Orders</h2>
              <button className="text-orange-600 text-sm font-medium hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.client}</td>
                      <td className="px-6 py-4 text-gray-900">{order.total} DH</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="glass-solar p-6">
            <h2 className="font-semibold text-gray-900 mb-6">Managerial Actions</h2>
            <div className="space-y-4">
              <ActionButton icon={<Plus size={18}/>} label="Add New Product" onClick={() => navigate('/admin/products')} />
              <ActionButton icon={<Edit size={18}/>} label="Modify Inventory" onClick={() => navigate('/admin/products')} />
              <ActionButton icon={<Users size={18}/>} label="Review Client Registrations" onClick={() => navigate('/admin/users')} />
              <ActionButton icon={<ArrowUpRight size={18}/>} label="Export Sales Report (PDF)" onClick={() => window.print()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <div className="glass-solar p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className="text-xs text-green-600 font-medium">{trend}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-solar-text-primary border border-solar-glass-border rounded-lg hover:border-solar-accent-sun hover:text-solar-accent-sun transition-all font-medium bg-white/40">
      {icon}
      <span>{label}</span>
    </button>
  );
}
