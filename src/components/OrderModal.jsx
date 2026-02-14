import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderModal = ({ isOpen, onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct multi-item WhatsApp message
        const itemsList = cartItems.map(item =>
            `- ${item.name} (${item.quantity} x $${item.price.toFixed(2)})`
        ).join('\n');

        const message = `*New Order from Lavender Aqua Farm*\n\n` +
            `*Customer Details:*\n` +
            `Name: ${formData.name}\n` +
            `Phone: ${formData.phone}\n` +
            `Address: ${formData.address}, ${formData.pincode}\n\n` +
            `*Order Items:*\n${itemsList}\n\n` +
            `*Total Amount: $${cartTotal.toFixed(2)}*`;

        const whatsappUrl = `https://wa.me/917736681820?text=${encodeURIComponent(message)}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
        clearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-surface-dark p-8 text-left align-middle shadow-2xl transition-all border border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-black text-white">
                            Checkout
                        </h3>
                        <p className="text-white/50 text-sm mt-1">Complete your order details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Order Summary */}
                <div className="mb-8 rounded-2xl bg-black/40 p-5 border border-white/5 max-h-48 overflow-y-auto custom-scrollbar">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">Order Summary</h4>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img
                                    src={item.image || (item.images && item.images[0])}
                                    alt={item.name}
                                    className="h-12 w-12 rounded-lg object-cover bg-gray-800"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                    <div className="text-xs text-white/50">
                                        {item.quantity} x ${item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-2">
                    <span className="text-white/50 font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-accent">${cartTotal.toFixed(2)}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/10 transition-all"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/10 transition-all"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Shipping Address</label>
                        <textarea
                            name="address"
                            required
                            rows="2"
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/10 transition-all resize-none"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="House No, Street, City, State"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/10 transition-all"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="682001"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-black text-white shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] hover:bg-[#20bd5a] focus:outline-none"
                    >
                        <MessageCircle size={24} />
                        Confirm via WhatsApp
                    </button>
                    <p className="text-center text-[10px] text-white/30 uppercase tracking-widest font-black">Secure multi-item checkout</p>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
