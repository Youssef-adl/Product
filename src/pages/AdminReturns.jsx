import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, CheckCircle, XCircle, Loader2, Clock, Package, AlertCircle } from 'lucide-react';

const REASON_LABELS = {
  not_liked: 'Ne correspond pas aux attentes',
  defective: 'Produit défectueux / endommagé',
  wrong_item: 'Erreur dans la livraison',
  other: 'Autre motif',
};

export default function AdminReturns({ auth }) {
  const navigate = useNavigate();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [debugInfo, setDebugInfo] = useState('Fetching...');

  useEffect(() => {
    if (auth.token) {
      fetchReturns();
    }
  }, [auth.token]);

  const fetchReturns = async () => {
    console.log('Fetching returns with token:', auth.token ? 'Present' : 'Missing');
    try {
      const res = await fetch('http://localhost:8000/api/return-requests?t=' + new Date().getTime(), {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (res.status === 401 || res.status === 403) {
         localStorage.removeItem('auth_token');
         localStorage.removeItem('user');
         window.location.href = '/login?error=' + (res.status === 403 ? 'admin_required' : 'session_expired');
         return;
      }

      const text = await res.text();
      const data = JSON.parse(text);
      if (data.success) {
        setReturns(data.returns || []);
        setDebugInfo(null);
      }
    } catch (err) {
      console.error('Failed to load returns', err);
      setDebugInfo('Error connection: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/return-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchReturns();
      }
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            <CheckCircle size={12} /> Accepté
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            <XCircle size={12} /> Refusé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
            <Clock size={12} /> En attente
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Demandes de Retour</h1>
            <p className="text-gray-500">Gérer les demandes de retour des clients.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <RefreshCcw size={16} />
            <span>{returns.length} demande{returns.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {debugInfo && (
          <div className="bg-orange-50 text-orange-800 p-2 text-xs mb-4 rounded border border-orange-200 font-mono flex items-center gap-2">
             <AlertCircle size={14} />
             <span>{debugInfo}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <Loader2 size={24} className="animate-spin mx-auto mb-3" />
            Chargement des demandes...
          </div>
        ) : (debugInfo && debugInfo.includes('Status: 403')) ? (
          <div className="text-center py-20 bg-red-50 rounded-xl border border-red-200 shadow-sm px-6">
            <XCircle size={40} className="mx-auto mb-4 text-red-500" />
            <h3 className="text-red-900 font-bold text-lg mb-2">Accès Refusé</h3>
            <p className="text-red-700 text-sm max-w-md mx-auto">
              Votre compte actuel n'a pas les droits d'administrateur. 
              Veuillez vous déconnecter et vous reconnecter avec le compte administrateur <strong>admin@lodestone.com</strong>.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
            >
              Aller à la page de connexion
            </button>
          </div>
        ) : returns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Package size={40} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">Aucune demande de retour</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Commande</th>
                    <th className="px-6 py-4">Motif</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {returns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{ret.user?.name || 'Client'}</div>
                        <div className="text-xs text-gray-500">{ret.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{ret.order?.order_number}</div>
                        <div className="text-xs text-gray-500">{parseFloat(ret.order?.total_amount || 0).toFixed(2)} DH</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{REASON_LABELS[ret.reason] || ret.reason}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(ret.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        {statusBadge(ret.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {ret.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(ret.id, 'approved')}
                              disabled={updatingId === ret.id}
                              className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                              {updatingId === ret.id ? '...' : 'Accepter'}
                            </button>
                            <button
                              onClick={() => handleUpdate(ret.id, 'rejected')}
                              disabled={updatingId === ret.id}
                              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                              {updatingId === ret.id ? '...' : 'Refuser'}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Traité</span>
                        )}
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
