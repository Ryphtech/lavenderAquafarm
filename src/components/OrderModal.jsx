import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, product, quantity }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: ''
    });

    if (!isOpen || !product) return null;

    const totalAmount = product.price * quantity;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct WhatsApp message
        const message = `I placed order for ${product.name} from website.
Shipping Address: ${formData.address}, Pincode: ${formData.pincode}
Phone: ${formData.phone}
Quantity: ${quantity}
Total Price: $${totalAmount.toFixed(2)}`;

        const whatsappUrl = `https://wa.me/917736681820?text=${encodeURIComponent(message)}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-6">
                        Complete Your Order
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Order Summary */}
                <div className="mb-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-lg object-cover bg-white dark:bg-gray-800"
                        />
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{product.name}</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {quantity} x ${product.price.toFixed(2)}
                            </div>
                        </div>
                        <div className="ml-auto text-xl font-bold text-primary">
                            ${totalAmount.toFixed(2)}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-[#191022] dark:border-gray-600 dark:text-white sm:text-sm"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-[#191022] dark:border-gray-600 dark:text-white sm:text-sm"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Address</label>
                        <textarea
                            name="address"
                            required
                            rows="2"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-[#191022] dark:border-gray-600 dark:text-white sm:text-sm"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="House No, Street, City"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-[#191022] dark:border-gray-600 dark:text-white sm:text-sm"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="682001"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                    >
                        <MessageCircle size={20} />
                        Confirm via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
