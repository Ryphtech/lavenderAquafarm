import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/mockData';
import { MessageCircle, ChevronDown, ChevronUp, CheckSquare, Square, MapPin, Calendar, Check } from 'lucide-react';

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const refreshOrders = () => {
        setOrders(orderService.getAll());
    };

    useEffect(() => {
        refreshOrders();
        const interval = setInterval(refreshOrders, 5000); // Check every 5s for demo purposes
        return () => clearInterval(interval);
    }, []);

    const openWhatsApp = (e, order) => {
        e.stopPropagation();
        // Open chat with customer
        const url = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`;
        window.open(url, '_blank');
    };

    const toggleExpansion = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const toggleShipped = (e, order) => {
        e.stopPropagation();
        orderService.update(order.id, { shipped: !order.shipped });
        refreshOrders();
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No orders yet.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr
                                        onClick={() => toggleExpansion(order.id)}
                                        className={`cursor-pointer transition-colors ${expandedOrderId === order.id ? 'bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                                            {expandedOrderId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{order.customerName}</div>
                                            <div className="text-xs">{order.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.items.map((item, idx) => (
                                                <div key={idx}>{item.breedName} x{item.quantity}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.shipped ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.shipped ? 'Shipped' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{order.totalAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={(e) => openWhatsApp(e, order)}
                                                className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                                            >
                                                <MessageCircle size={18} /> <span>Chat</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Expanded Detail Row */}
                                    {expandedOrderId === order.id && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-0 border-b border-gray-200 bg-gray-50">
                                                <div className="py-6 flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {/* Address Section */}
                                                    <div className="flex-1">
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                                                            <MapPin size={14} className="mr-1" /> Shipping Address
                                                        </h4>
                                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{order.address}</p>
                                                        </div>
                                                        <div className="mt-3 text-xs text-gray-500 flex items-center">
                                                            <Calendar size={14} className="mr-1" />
                                                            Ordered on: {order.date ? new Date(order.date).toLocaleString() : 'N/A'}
                                                        </div>
                                                    </div>

                                                    {/* Checklist Section */}
                                                    <div className="flex-1 md:border-l md:border-gray-200 md:pl-8">
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                                                            <CheckSquare size={14} className="mr-1" /> Fulfillment Checklist
                                                        </h4>
                                                        <div
                                                            onClick={(e) => toggleShipped(e, order)}
                                                            className={`
                                                                flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all group
                                                                ${order.shipped
                                                                    ? 'border-green-500 bg-green-50'
                                                                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
                                                                }
                                                            `}
                                                        >
                                                            <div className={`
                                                                p-2 rounded-full transition-colors
                                                                ${order.shipped ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}
                                                            `}>
                                                                {order.shipped ? <Check size={24} strokeWidth={3} /> : <Square size={24} />}
                                                            </div>
                                                            <div>
                                                                <p className={`font-bold transition-colors ${order.shipped ? 'text-green-800' : 'text-gray-700'}`}>
                                                                    {order.shipped ? 'Order Shipped' : 'Mark as Shipped'}
                                                                </p>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {order.shipped
                                                                        ? 'Shipment marked as complete.'
                                                                        : 'Confirm that items have been packed and sent.'
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDashboard;
