import React, { useState, useEffect } from 'react';
import { User, Shield, ShieldAlert, Trash2, Mail, Calendar, Search, Filter } from 'lucide-react';

export default function AdminUsers({ auth, setCurrentPage, currentPage }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      // For now we keep mock data but simulate an auth check if we had a real endpoint
      if (!auth.token) {
         window.location.href = '/login?error=session_expired';
         return;
      }
      
      // Simulated delay
      setTimeout(() => {
        setUsers([
          { id: 1, name: 'Admin Lodestone', email: 'admin@lodestone.com', role: 'admin', joined: '10 Jan 2026', status: 'Active' },
          { id: 2, name: 'Industrial Partner A', email: 'partner@factory.ma', role: 'client', joined: '15 Feb 2026', status: 'Active' },
          { id: 3, name: 'Logistic Corp', email: 'contact@logistic.net', role: 'client', joined: '01 Mar 2026', status: 'Blocked' },
          { id: 4, name: 'Sourcing Expert', email: 'expert@sourcing.com', role: 'client', joined: '20 Mar 2026', status: 'Active' }
        ]);
        setLoading(false);
      }, 800);
    };

    fetchUsers();
  }, [auth.token]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Governance</h1>
            <p className="text-gray-500">Manage administrative privileges and partner access control.</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solar-text-secondary" size={18}/>
            <input 
              type="text" 
              placeholder="Search by name, email or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={18}/>
              Role
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Decrypting user records...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Role / Permissions</th>
                    <th className="px-6 py-4">Join Date</th>
                    <th className="px-6 py-4">Account Status</th>
                    <th className="px-6 py-4 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                            <User size={20}/>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail size={12}/> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          <Shield size={12}/>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-solar-text-secondary"/>
                          {user.joined}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => toggleStatus(user.id)}
                            className={`p-2 rounded-lg transition-all ${user.status === 'Active' ? 'text-solar-text-secondary hover:text-red-600 hover:bg-red-50' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}
                            title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                          >
                            <ShieldAlert size={18}/>
                          </button>
                          <button className="p-2 text-solar-text-secondary hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">
                            <Trash2 size={18}/>
                          </button>
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
