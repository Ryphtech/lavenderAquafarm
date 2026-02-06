import React, { useState } from 'react';
import { ShoppingBag, Star, Info, Check } from 'lucide-react';

const ProductCard = ({ product, onBuy }) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${!product.inStock ? 'grayscale' : ''}`}
                />

                {/* Badges */}
                <div className="absolute left-3 top-3 z-20 flex gap-2">
                    {product.quality === 'Top Quality' && (
                        <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20 backdrop-blur-md">
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
                    {product.inStock ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 backdrop-blur-md">
                            In Stock
                        </span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/20 backdrop-blur-md">
                            Out of Stock
                        </span>
                    )}
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[2px] flex items-center justify-center group-hover:backdrop-blur-none transition-all z-10">
                        <span className="rotate-[-12deg] rounded-lg border-2 border-red-500 px-4 py-2 text-lg font-black uppercase tracking-widest text-red-600 bg-white/90 shadow-xl">
                            Sold Out
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{product.name}</h3>
                </div>

                <div className="mb-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        {product.gender === 'Male' && <span className="text-blue-500 font-bold">♂ Male</span>}
                        {product.gender === 'Female' && <span className="text-pink-500 font-bold">♀ Female</span>}
                        {product.gender === 'Pair' && <span className="text-purple-500 font-bold">⚥ Pair</span>}
                    </div>
                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span>{product.grade}</span>
                </div>

                <div className="mt-auto">
                    <div className="mb-3 flex items-baseline gap-1">
                        <p className="text-xl font-bold text-primary dark:text-primary-300">
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </p>
                        <span className="text-xs text-gray-400">/ fish</span>
                    </div>

                    <div className="flex gap-3">
                        {/* Qty Selector */}
                        <div className={`flex h-10 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f1629] ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button
                                onClick={decrement}
                                disabled={!product.inStock}
                                className="flex h-full w-8 items-center justify-center rounded-l-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                            >
                                -
                            </button>
                            <span className="text-sm font-semibold dark:text-white w-4 text-center">{quantity}</span>
                            <button
                                onClick={increment}
                                disabled={!product.inStock}
                                className="flex h-full w-8 items-center justify-center rounded-r-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                            >
                                +
                            </button>
                        </div>

                        {/* Buy Button */}
                        <button
                            onClick={() => onBuy(product, quantity)}
                            disabled={!product.inStock}
                            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#2a1e36] ${!product.inStock ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''}`}
                        >
                            <ShoppingBag size={18} />
                            {product.inStock ? 'Buy Now' : 'Sold Out'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
