import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/mockData';

const OrderModal = ({ isOpen, onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [successData, setSuccessData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        phone2: '',
        address: '',
        district: '',
        state: '',
        pincode: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create Order Object
        const newOrder = {
            customer_name: formData.name,
            phone: formData.phone,
            phone2: formData.phone2,
            address: formData.address,
            district: formData.district,
            state: formData.state,
            pincode: formData.pincode,
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total_amount: cartTotal,
            status: 'Waiting for Confirmation'
        };

        try {
            // Save to Supabase
            const savedOrder = await orderService.create(newOrder);

            // Construct multi-item WhatsApp message
            const itemsList = cartItems.map(item =>
                `- ${item.name} (${item.quantity} x ₹${item.price})`
            ).join('\n');

            const message = `*New Order from Lavender Aqua Farm*\n\n` +
                `*Order ID:* ${savedOrder.id}\n` +
                `*Customer Details:*\n` +
                `Name: ${formData.name}\n` +
                `Mobile 1: ${formData.phone}\n` +
                `Mobile 2: ${formData.phone2}\n` +
                `Address: ${formData.address}\n` +
                `District: ${formData.district}\n` +
                `State: ${formData.state}\n` +
                `Pincode: ${formData.pincode}\n\n` +
                `*Order Items:*\n${itemsList}\n\n` +
                `*Total Amount: ₹${cartTotal}*`;

            const whatsappUrl = `https://wa.me/919633206134?text=${encodeURIComponent(message)}`;

            // Show custom success popup
            setSuccessData({ whatsappUrl });
        } catch (error) {
            console.error('Failed to create order:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint
            });
            const errorMessage = error.message || 'Failed to place order. Please try again.';
            alert(`Error: ${errorMessage}\n\nPlease contact support if this persists.`);
        }
    };


    const handleSuccessClose = () => {
        if (successData && successData.whatsappUrl) {
            window.open(successData.whatsappUrl, '_blank');
        }
        clearCart();
        setSuccessData(null);
        onClose();
    };

    if (successData) {
        return (
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                    onClick={handleSuccessClose}
                ></div>

                {/* Success Modal */}
                <div className="relative w-full max-w-sm transform rounded-3xl bg-surface-dark p-6 sm:p-8 text-center shadow-2xl transition-all border border-white/10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-6">
                        <Check size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Order placed!</h3>
                    <p className="text-white/70 mb-8 font-medium">Order will be packed on the upcoming mondays.</p>
                    <button
                        onClick={handleSuccessClose}
                        className="w-full flex justify-center items-center gap-2 rounded-xl bg-accent px-6 py-4 font-bold text-white shadow-xl shadow-accent/20 hover:bg-purple-600 transition-colors focus:outline-none"
                    >
                        <MessageCircle size={20} />
                        Continue to WhatsApp
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg transform rounded-3xl bg-surface-dark p-6 sm:p-8 text-left align-middle shadow-2xl transition-all border border-white/10 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-surface-dark/95 backdrop-blur-sm z-10 py-2 -mt-2">
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
                                        {item.quantity} x ₹{item.price}
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-white">
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-2">
                    <span className="text-white/50 font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-accent">₹{cartTotal}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Mobile No 1</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Mobile No 2</label>
                            <input
                                type="tel"
                                name="phone2"
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.phone2}
                                onChange={handleChange}
                                placeholder="Alternative phone"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Shipping Address</label>
                        <textarea
                            name="address"
                            required
                            rows="2"
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all resize-none"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="House No, Street, City, State"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">District</label>
                            <input
                                type="text"
                                name="district"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.district}
                                onChange={handleChange}
                                placeholder="District"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">State</label>
                            <input
                                type="text"
                                name="state"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2 ml-1">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm placeholder-white/50 transition-all"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="682001"
                            />
                        </div>
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
