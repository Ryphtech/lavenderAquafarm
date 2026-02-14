import React, { useState } from 'react';
import { initialOrders, initialBreeds } from '../data/mockData';
import { Search, Package, Check, Trash2, Edit2, Plus, X } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('orders');

    // Order State
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Breed State
    const [breeds, setBreeds] = useState(initialBreeds);
    const [showBreedModal, setShowBreedModal] = useState(false);
    const [currentBreed, setCurrentBreed] = useState(null);

    // Order Handlers
    const toggleOrderStatus = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                const newStatus = order.status === 'Confirmed' ? 'Packed' : 'Confirmed';
                return { ...order, status: newStatus };
            }
            return order;
        }));
    };

    const filteredOrders = orders.filter(order =>
        order.phone.includes(searchTerm) || order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Breed Handlers
    const handleDeleteBreed = (id) => {
        if (window.confirm("Are you sure you want to delete this breed?")) {
            setBreeds(breeds.filter(b => b.id !== id));
        }
    };

    const handleSaveBreed = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const breedData = {
            id: currentBreed ? currentBreed.id : Date.now(),
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            quality: formData.get('quality'),
            gender: formData.get('gender'),
            grade: formData.get('grade'),
            image: formData.get('image'),
            inStock: formData.get('inStock') === 'on'
        };

        if (currentBreed) {
            setBreeds(breeds.map(b => b.id === currentBreed.id ? breedData : b));
        } else {
            setBreeds([...breeds, breedData]);
        }
        setShowBreedModal(false);
        setCurrentBreed(null);
    };

    const openEditModal = (breed) => {
        setCurrentBreed(breed);
        setShowBreedModal(true);
    };

    const openAddModal = () => {
        setCurrentBreed(null);
        setShowBreedModal(true);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pt-28 pb-12 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                    <div className="flex bg-surface-dark p-1 rounded-xl shadow-sm border border-white/10">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('breeds')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'breeds' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Manage Breeds
                        </button>
                    </div>
                </div>

                {activeTab === 'orders' ? (
                    <div className="bg-surface-dark rounded-2xl shadow-sm border border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by Phone or Order ID..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-600"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-xs uppercase text-slate-500 font-semibold">
                                        <th className="p-4">Order ID</th>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Items</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono text-sm text-white">{order.id}</td>
                                            <td className="p-4">
                                                <div className="font-bold text-white">{order.customerName}</div>
                                                <div className="text-xs text-white/50">{order.phone}</div>
                                            </td>
                                            <td className="p-4 text-sm text-white/70">
                                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                            </td>
                                            <td className="p-4 font-bold text-accent">${order.totalAmount.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Confirmed' || order.status === 'Packed'
                                                    ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-xs font-bold text-accent hover:underline"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => toggleOrderStatus(order.id)}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${order.status === 'Packed'
                                                            ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                                            : 'bg-white/10 text-white hover:bg-green-600 hover:text-white'
                                                            }`}
                                                    >
                                                        {order.status === 'Packed' ? <Check size={14} /> : <Package size={14} />}
                                                        {order.status === 'Packed' ? 'Packed' : 'Mark Packed'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-surface-dark rounded-2xl shadow-sm border border-white/5 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Breed Inventory</h2>
                            <button
                                onClick={openAddModal}
                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20"
                            >
                                <Plus size={18} /> Add Breed
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {breeds.map(breed => (
                                <div key={breed.id} className="group flex gap-4 p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:shadow-md transition-all bg-white/5">
                                    <img src={breed.image} alt={breed.name} className="w-20 h-20 rounded-lg object-cover bg-gray-800" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-white truncate">{breed.name}</h3>
                                            <div className="flex gap-1">
                                                <button onClick={() => openEditModal(breed)} className="p-1.5 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteBreed(breed.id)} className="p-1.5 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-xs text-white/50 mb-2">{breed.quality} • {breed.gender}</div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-accent">${breed.price}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${breed.inStock ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                                {breed.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Order ID</h4>
                                    <p className="font-mono text-sm text-gray-900 dark:text-white">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Status</h4>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedOrder.status === 'Confirmed' || selectedOrder.status === 'Packed'
                                        ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Customer Information</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                                    <p className="font-bold text-gray-900 dark:text-white mb-1">{selectedOrder.customerName}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {selectedOrder.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Shipping Address</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{selectedOrder.address}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Pincode: {selectedOrder.pincode}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Order Items</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl space-y-2">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-900 dark:text-white">
                                                <span className="font-bold">{item.quantity}x</span> {item.productName}
                                            </span>
                                            <span className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-200 dark:border-white/10 pt-2 mt-2 flex justify-between items-center font-bold">
                                        <span className="text-gray-900 dark:text-white">Total Amount</span>
                                        <span className="text-xl text-primary">${selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Breed Modal */}
            {showBreedModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowBreedModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentBreed ? 'Edit Breed' : 'Add New Breed'}</h3>
                            <button onClick={() => setShowBreedModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveBreed} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        name="name"
                                        defaultValue={currentBreed?.name}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Price</label>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        defaultValue={currentBreed?.price}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quality</label>
                                    <select
                                        name="quality"
                                        defaultValue={currentBreed?.quality || 'Top Quality'}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>Top Quality</option>
                                        <option>Medium Quality</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Gender</label>
                                    <select
                                        name="gender"
                                        defaultValue={currentBreed?.gender || 'Male'}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Pair</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Grade</label>
                                <input
                                    name="grade"
                                    defaultValue={currentBreed?.grade}
                                    placeholder="e.g. Grade A"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image URL</label>
                                <input
                                    name="image"
                                    defaultValue={currentBreed?.image}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    name="inStock"
                                    type="checkbox"
                                    defaultChecked={currentBreed?.inStock ?? true}
                                    className="rounded text-primary focus:ring-primary"
                                />
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock</label>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                Save Breed
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
