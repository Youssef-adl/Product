import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, BarChart3, Plus, Edit, Trash2, ArrowUpRight } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminDashboard({ auth }) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    activeUsers: 0,
    recentOrders: []
  });

  useEffect(() => {
    // Logic to fetch dashboard stats from API (Simplified for now)
    setStats({
      totalProducts: 42,
      totalSales: 15420.50,
      activeUsers: 128,
      recentOrders: [
        { id: 'ORD-8821', client: 'TechSource Ltd', total: 450.00, status: 'Processing' },
        { id: 'ORD-8822', client: 'Global Connect', total: 1200.00, status: 'Shipped' },
        { id: 'ORD-8823', client: 'Nexus Corp', total: 89.99, status: 'Pending' }
      ]
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* ADMIN TOP NAV */}
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 pt-40">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, {auth.user?.name}. Manage your B2B marketplace operations.</p>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Package className="text-orange-600"/>} label="Total Products" value={stats.totalProducts} trend="+4 active today" />
          <StatCard icon={<ShoppingBag className="text-blue-600"/>} label="Total Revenue" value={`$${stats.totalSales.toLocaleString()}`} trend="+12.5% vs last month" />
          <StatCard icon={<Users className="text-green-600"/>} label="Active Clients" value={stats.activeUsers} trend="+8 new signups" />
          <StatCard icon={<BarChart3 className="text-purple-600"/>} label="Conversion" value="3.2%" trend="+0.4% from ads" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RECENT ORDERS */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                      <td className="px-6 py-4 text-gray-900">${order.total}</td>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-6">Managerial Actions</h2>
            <div className="space-y-4">
              <ActionButton icon={<Plus size={18}/>} label="Add New Product" />
              <ActionButton icon={<Edit size={18}/>} label="Modify Inventory" />
              <ActionButton icon={<Users size={18}/>} label="Review Client Registrations" />
              <ActionButton icon={<ArrowUpRight size={18}/>} label="Export Sales Report (PDF)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className="text-xs text-green-600 font-medium">{trend}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all font-medium">
      {icon}
      <span>{label}</span>
    </button>
  );
}
