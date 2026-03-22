import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Truck, CheckCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminOrders({ auth }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Update status failed', err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* ADMIN TOP NAV */}
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 pt-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Procurement Oversight</h1>
            <p className="text-gray-500">Track and manage B2B sales cycles and fulfillment.</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            <input 
              type="text" 
              placeholder="Filter by Order ID or Client Name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={18}/>
              Status
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Retrieving secure order data...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">Order Details</th>
                    <th className="px-6 py-4">Procurement Client</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Fulfillment Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded flex items-center justify-center">
                            <ShoppingBag size={20}/>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">ORD-{order.id.toString().padStart(4, '0')}</div>
                            <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()} • {order.items?.length || 0} items</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Anonymous Client'}</div>
                        <div className="text-xs text-gray-500">Corporate Account</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">${parseFloat(order.total_amount).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'pending' || order.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {(order.status === 'Delivered') && <CheckCircle size={12}/>}
                          {(order.status === 'Shipped') && <Truck size={12}/>}
                          {(order.status === 'pending' || order.status === 'Processing') && <Clock size={12}/>}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all" title="View Details">
                            <Eye size={18}/>
                          </button>
                          <select 
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none focus:border-orange-500"
                          >
                            <option value="">Update Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
