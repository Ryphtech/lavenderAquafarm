import React, { useState } from 'react';
import BreedManager from '../components/admin/BreedManager';
import OrderDashboard from '../components/admin/OrderDashboard';
import { LayoutDashboard, Fish } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('orders');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password (Try admin123)');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded mb-4"
                            autoFocus
                        />
                        <button className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-xs text-gray-400">Hint: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
                        <h2 className="text-lg font-bold mb-4 px-2">Dashboard</h2>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <LayoutDashboard size={20} />
                                <span>Orders</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('breeds')}
                                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'breeds' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Fish size={20} />
                                <span>Manage Breeds</span>
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {activeTab === 'orders' ? <OrderDashboard /> : <BreedManager />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
