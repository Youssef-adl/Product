import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, Filter, AlertCircle, X } from 'lucide-react';

export default function AdminProducts({ auth }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `http://localhost:8000/api/products/${currentProduct.id}` 
      : 'http://localhost:8000/api/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(currentProduct)
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
        closeModal();
      } else {
        alert(JSON.stringify(data.errors));
      }
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct({ name: '', sku: '', category: 'UNITÉ PRINCIPALE', price: '', stock: '', description: '', spec: '', image_url: '' });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Accept': 'application/json'
        }
      });
      fetchProducts();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Solaris Product Range</h1>
            <p className="text-gray-500">Manage Solaris Lux ecosystem products and stock levels.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-600 text-solar-text-primary px-6 py-2.5 rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-sm"
          >
            <Plus size={18}/>
            Add Solaris Product
          </button>
        </div>

        {/* LOADING & ERRORS */}
        {loading && <div className="text-center py-20 text-gray-500">Loading catalog...</div>}
        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-red-700 mb-6">
            <AlertCircle size={20}/>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-4">Product Info</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="h-10 w-10 object-contain bg-gray-50 rounded p-1" />
                          ) : (
                            <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-solar-text-secondary">
                              <Package size={20}/>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                            <div className="text-xs text-gray-500">ID: #{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{p.sku}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{parseFloat(p.price).toFixed(2)} DH</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${p.stock < 100 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <span className="text-sm text-gray-600">{p.stock} units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openModal(p)}
                            className="p-2 text-solar-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Edit size={18}/>
                          </button>
                          <button 
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-solar-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                            title="Delete"
                          >
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

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Solaris Product' : 'Add New Product'}</h3>
                <button onClick={closeModal} className="text-solar-text-secondary hover:text-gray-600"><X size={20}/></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                    <input 
                      type="text" 
                      required
                      value={currentProduct.name}
                      onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SKU</label>
                    <input 
                      type="text" 
                      required
                      value={currentProduct.sku}
                      onChange={e => setCurrentProduct({...currentProduct, sku: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                    <select 
                      value={currentProduct.category}
                      onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    >
                      <option>UNITÉ PRINCIPALE</option>
                      <option>ACCESSOIRE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (DH)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={currentProduct.price}
                      onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">In Stock</label>
                    <input 
                      type="number" 
                      required
                      value={currentProduct.stock}
                      onChange={e => setCurrentProduct({...currentProduct, stock: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={currentProduct.image_url || ''}
                      onChange={e => setCurrentProduct({...currentProduct, image_url: e.target.value})}
                      placeholder="/product-v1.png"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Specification (Spec)</label>
                    <input 
                      type="text" 
                      value={currentProduct.spec || ''}
                      onChange={e => setCurrentProduct({...currentProduct, spec: e.target.value})}
                      placeholder="e.g. TITANE G5 USINÉ"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea 
                      rows={2}
                      value={currentProduct.description || ''}
                      onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 outline-none resize-none"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-orange-600 text-solar-text-primary rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                  {isEditing ? 'Save Changes' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
