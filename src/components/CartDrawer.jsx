import React from 'react';
import { X, ShoppingBag, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ onCheckout }) => {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartTotal,
        removeFromCart,
        updateQuantity,
        cartError,
        setCartError
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => {
                    setIsCartOpen(false);
                    setCartError(null);
                }}
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                    <div className="flex h-full flex-col bg-surface-dark shadow-2xl border-l border-white/10">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-black text-white flex items-center gap-2">
                                <ShoppingBag className="text-accent" />
                                Your Cart
                            </h2>
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    setCartError(null);
                                }}
                                className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Error Notification */}
                        {cartError && (
                            <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-fade-in">
                                <AlertCircle size={18} />
                                <p className="font-medium">{cartError}</p>
                            </div>
                        )}

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {cartItems.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                                    <div className="rounded-full bg-white/5 p-6">
                                        <ShoppingBag size={48} className="text-white/20" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
                                    <p className="text-white/50 text-sm">Add some beautiful guppies to your collection!</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 hover:scale-105 transition-all"
                                    >
                                        Explore Breeds
                                    </button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-white/5">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                                                <img
                                                    src={item.image || (item.images && item.images[0])}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-bold text-white">
                                                        <h3 className="line-clamp-1">{item.name}</h3>
                                                        <p className="ml-4 text-accent">₹{item.price * item.quantity}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-white/50">{item.gender} • {item.grade}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center space-x-3 border border-white/10 rounded-xl bg-black/20 px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1.5 text-white/50 hover:text-white transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1.5 text-white/50 hover:text-white transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="flex items-center gap-1.5 font-bold text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-white/10 bg-white/5 p-6 backdrop-blur-md">
                                <div className="flex justify-between text-base font-bold text-white mb-4">
                                    <p>Subtotal</p>
                                    <p className="text-xl text-accent font-black">₹{cartTotal}</p>
                                </div>
                                <p className="mb-6 text-xs text-white/50">Shipping and taxes calculated at checkout.</p>
                                <button
                                    onClick={onCheckout}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] hover:bg-purple-700"
                                >
                                    Proceed to Checkout
                                    <ChevronRight size={20} />
                                </button>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 flex w-full items-center justify-center text-sm font-bold text-white/50 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
