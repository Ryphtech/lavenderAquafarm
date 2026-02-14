import React, { useState, useEffect } from 'react';
import { breedService, orderService } from '../services/mockData';
import { Search, Package, Check, Trash2, Edit2, Plus, X, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Admin = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [loading, setLoading] = useState(true);

    // Order State
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [breeds, setBreeds] = useState([]);
    const [showBreedModal, setShowBreedModal] = useState(false);
    const [currentBreed, setCurrentBreed] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploading, setUploading] = useState(false);


    // Initial Fetch
    useEffect(() => {
        window.scrollTo(0, 0);
        refreshData();
    }, []);

    const refreshData = async () => {
        setLoading(true);
        try {
            const [ordersData, breedsData] = await Promise.all([
                orderService.getAll(),
                breedService.getAll()
            ]);
            setOrders(ordersData);
            setBreeds(breedsData);
        } catch (error) {
            console.error('Failed to refresh data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Order Handlers
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await orderService.update(orderId, { status: newStatus });
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Error updating status');
        }
    };

    const filteredOrders = orders.filter(order =>
        (order.phone?.includes(searchTerm)) ||
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Breed Handlers
    const handleDeleteBreed = async (id) => {
        if (window.confirm("Are you sure you want to delete this breed?")) {
            try {
                await breedService.delete(id);
                setBreeds(prev => prev.filter(b => b.id !== id));
            } catch (error) {
                console.error('Failed to delete breed:', error);
                alert('Error deleting breed');
            }
        }
    };

    const handleSaveBreed = async (e) => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData(e.target);
        let imageUrl = formData.get('image');

        try {
            // Upload Image if selected
            if (selectedFile) {
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('breeds')
                    .upload(filePath, selectedFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('breeds')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const breedData = {
                name: formData.get('name'),
                price: parseFloat(formData.get('price')),
                quality: formData.get('quality'),
                gender: formData.get('gender'),
                grade: formData.get('grade'),
                image: imageUrl,
                in_stock: formData.get('inStock') === 'on'
            };

            if (currentBreed) {
                await breedService.update(currentBreed.id, breedData);
                setBreeds(prev => prev.map(b => b.id === currentBreed.id ? { ...b, ...breedData } : b));
            } else {
                const newBreed = await breedService.add(breedData);
                setBreeds(prev => [...prev, newBreed]);
            }
            setShowBreedModal(false);
            setCurrentBreed(null);
            setSelectedFile(null);
            setPreviewImage(null);
        } catch (error) {
            console.error('Failed to save breed:', error);
            alert('Error saving breed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const openEditModal = (breed) => {
        setCurrentBreed(breed);
        setPreviewImage(null);
        setSelectedFile(null);
        setShowBreedModal(true);
    };

    const openAddModal = () => {
        setCurrentBreed(null);
        setPreviewImage(null);
        setSelectedFile(null);
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
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'orders' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('breeds')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'breeds' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            Manage Breeds
                        </button>
                        <button
                            onClick={onLogout}
                            className="ml-2 px-3 py-2 rounded-lg text-sm font-bold text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors flex items-center gap-2"
                            title="Sign Out"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
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
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-white/50"
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
                                                <div className="font-bold text-white">{order.customer_name || order.customerName}</div>
                                                <div className="text-xs text-white/50">{order.phone}</div>
                                            </td>
                                            <td className="p-4 text-sm text-white/70">
                                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                            </td>
                                            <td className="p-4 font-bold text-accent">₹{order.total_amount || order.totalAmount}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Packed' ? 'bg-green-500/20 text-green-300' :
                                                    order.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-300' :
                                                        'bg-purple-500/20 text-purple-300'
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
                                                    {order.status === 'Waiting for Confirmation' && (
                                                        <button
                                                            onClick={() => updateOrderStatus(order.id, 'Confirmed')}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                                                        >
                                                            <Check size={14} /> Confirm
                                                        </button>
                                                    )}

                                                    {order.status === 'Confirmed' && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'Packed')}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-500/20 transition-all"
                                                            >
                                                                <Package size={14} /> Mark Packed
                                                            </button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'Waiting for Confirmation')}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all"
                                                            >
                                                                Undo
                                                            </button>
                                                        </div>
                                                    )}

                                                    {order.status === 'Packed' && (
                                                        <div className="flex gap-2">
                                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 cursor-default">
                                                                <Check size={14} /> Packed
                                                            </span>
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'Confirmed')}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all"
                                                            >
                                                                Undo
                                                            </button>
                                                        </div>
                                                    )}
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
                                className="flex items-center gap-2 bg-accent hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-accent/20"
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
                                            <span className="font-bold text-accent">₹{breed.price}</span>
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
                                        ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Customer Information</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                                    <p className="font-bold text-gray-900 dark:text-white mb-1">{selectedOrder.customer_name || selectedOrder.customerName}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {selectedOrder.phone}</p>
                                    {selectedOrder.phone2 && <p className="text-sm text-gray-600 dark:text-gray-400">Phone 2: {selectedOrder.phone2}</p>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Shipping Address</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{selectedOrder.address}</p>
                                    {selectedOrder.district && <p className="text-sm text-gray-600 dark:text-gray-400">District: {selectedOrder.district}</p>}
                                    {selectedOrder.state && <p className="text-sm text-gray-600 dark:text-gray-400">State: {selectedOrder.state}</p>}
                                    {selectedOrder.pincode && <p className="text-sm text-gray-600 dark:text-gray-400">Pincode: {selectedOrder.pincode}</p>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Order Items</h4>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl space-y-2">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm border-b border-white/5 last:border-0 pb-3 last:pb-0">
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                    {item.quantity}x {item.name}
                                                    {item.gender && (
                                                        <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${item.gender === 'Male' ? 'bg-blue-500/20 text-blue-400' :
                                                            item.gender === 'Female' ? 'bg-pink-500/20 text-pink-400' :
                                                                'bg-violet-500/20 text-violet-400'
                                                            }`}>
                                                            {item.gender}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {item.quality && (
                                                        <span className="text-xs text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                                                            {item.quality}
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-500">
                                                        @ ₹{item.price}/ea
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right font-mono font-bold text-gray-900 dark:text-white ml-4">
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-200 dark:border-white/10 pt-2 mt-2 flex justify-between items-center font-bold">
                                        <span className="text-gray-900 dark:text-white">Total Amount</span>
                                        <span className="text-xl text-accent font-black">₹{selectedOrder.total_amount || selectedOrder.totalAmount}</span>
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
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-white/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image</label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPreviewImage(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                                setSelectedFile(file);
                                            }
                                        }}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-lavender hover:file:bg-accent/20"
                                    />
                                    {(previewImage || currentBreed?.image) && (
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                                            <img src={previewImage || currentBreed?.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <input
                                        name="image"
                                        type="hidden"
                                        defaultValue={currentBreed?.image}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    name="inStock"
                                    type="checkbox"
                                    defaultChecked={currentBreed?.in_stock ?? true}
                                    className="rounded text-primary focus:ring-primary"
                                />
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock</label>
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-accent/20 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Save Breed'}
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
