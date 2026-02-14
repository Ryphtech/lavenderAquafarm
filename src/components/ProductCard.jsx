import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Info, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, setIsCartOpen } = useCart();
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface-dark shadow-sm ring-1 ring-white/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute left-3 top-3 z-20 flex gap-2">
                    {product.quality === 'Top Quality' && (
                        <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700 ring-1 ring-inset ring-purple-600/20 backdrop-blur-md">
                            <Star size={12} className="mr-1 fill-current" />
                            Top Quality
                        </span>
                    )}
                    {product.quality === 'Medium Quality' && (
                        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/20 backdrop-blur-md">
                            Medium Quality
                        </span>
                    )}
                </div>

                <div className="absolute right-3 top-3 z-20">
                    {(product.inStock ?? product.in_stock) ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 backdrop-blur-md">
                            In Stock
                        </span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/20 backdrop-blur-md">
                            Out of Stock
                        </span>
                    )}
                </div>

                {!(product.inStock ?? product.in_stock) && (
                    <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[2px] flex items-center justify-center group-hover:backdrop-blur-none transition-all z-10">
                        <span className="rotate-[-12deg] rounded-lg border-2 border-red-500 px-4 py-2 text-lg font-black uppercase tracking-widest text-red-600 bg-white/90 shadow-xl">
                            Sold Out
                        </span>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-center justify-between">
                    <Link to={`/product/${product.id}`} className="text-lg font-bold text-white group-hover:text-accent transition-colors hover:underline">
                        {product.name}
                    </Link>
                </div>

                <div className="mb-4 flex items-center gap-3 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                        {product.gender === 'Male' && <span className="text-blue-400 font-bold">♂ Male</span>}
                        {product.gender === 'Female' && <span className="text-pink-400 font-bold">♀ Female</span>}
                        {product.gender === 'Pair' && <span className="text-violet-400 font-bold">⚥ Pair</span>}
                    </div>
                    <span className="h-1 w-1 rounded-full bg-white/20"></span>
                    <span>{product.grade}</span>
                </div>

                <div className="mt-auto">
                    <div className="mb-3 flex items-baseline gap-1">
                        <p className="text-xl font-bold text-white">
                            ₹{product.price ? product.price : '0'}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {/* Qty Selector */}
                        <div className={`flex h-10 items-center justify-between rounded-lg border border-white/10 bg-black/20 ${!(product.inStock ?? product.in_stock) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button
                                onClick={decrement}
                                disabled={!(product.inStock ?? product.in_stock)}
                                className="flex h-full w-10 items-center justify-center rounded-l-lg text-white/50 hover:bg-white/10 hover:text-white focus:outline-none transition-colors"
                            >
                                -
                            </button>
                            <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
                            <button
                                onClick={increment}
                                disabled={!(product.inStock ?? product.in_stock)}
                                className="flex h-full w-10 items-center justify-center rounded-r-lg text-white/50 hover:bg-white/10 hover:text-white focus:outline-none transition-colors"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => {
                                addToCart(product, quantity);
                                setIsCartOpen(true);
                            }}
                            disabled={!(product.inStock ?? product.in_stock)}
                            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-[#1e293b] ${!(product.inStock ?? product.in_stock) ? 'opacity-50 cursor-not-allowed bg-slate-400 hover:bg-slate-400' : ''}`}
                        >
                            <ShoppingCart size={18} />
                            {(product.inStock ?? product.in_stock) ? 'Add to Cart' : 'Sold Out'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
