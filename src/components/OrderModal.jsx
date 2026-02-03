import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { orderService } from '../services/mockData';

const OrderModal = ({ breed, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        quantity: 1
    });

    if (!isOpen || !breed) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirm = (e) => {
        e.preventDefault();

        // Create Order
        const orderItems = [
            {
                breedId: breed.id,
                breedName: breed.name,
                price: breed.price_pair,
                quantity: parseInt(formData.quantity)
            }
        ];

        const totalAmount = breed.price_pair * parseInt(formData.quantity);

        const newOrder = orderService.create({
            customerName: formData.name,
            phone: formData.phone,
            address: formData.address,
            items: orderItems,
            totalAmount: totalAmount
        });

        // WhatsApp Redirection
        const message = `Halo Lavender Aquafarm! 👋\n\nI confirmed the order #${newOrder.id} through the website.\n\n*Order Details:*\nBreed: ${breed.name}\nQuantity: ${formData.quantity} Pair(s)\nTotal Price: ₹${totalAmount}\n\n*My Details:*\nName: ${formData.name}\nAddress: ${formData.address}`;

        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        onClose();
        // Ideally clear form here
        setFormData({ name: '', phone: '', address: '', quantity: 1 });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
                    <h3 className="text-xl font-bold text-indigo-900">Place Order</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex items-start space-x-4 bg-blue-50 p-4 rounded-xl">
                        <img
                            src={breed.images[0]}
                            alt={breed.name}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                            <h4 className="font-bold text-gray-900">{breed.name}</h4>
                            <p className="text-sm text-gray-600">{breed.quality} Quality</p>
                            <p className="text-indigo-600 font-bold mt-1">₹{breed.price_pair}/pair</p>
                        </div>
                    </div>

                    <form onSubmit={handleConfirm} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="+91..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Pairs)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                            <textarea
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                placeholder="Full address with pincode..."
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Confirm Order</span>
                                <CheckCircle size={20} />
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-3">
                                On clicking confirm order, you will be redirected to WhatsApp for payment.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
