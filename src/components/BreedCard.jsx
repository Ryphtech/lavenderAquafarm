import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BreedCard = ({ breed }) => {
    const { addToCart, setIsCartOpen } = useCart();

    return (
        <div className="group bg-surface-dark rounded-2xl overflow-hidden border border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={breed.images[0]}
                    alt={breed.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-surface-dark/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-bold text-white shadow-sm border border-white/10">
                    {breed.quality}
                </div>
                {breed.status !== 'available' && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-xl uppercase tracking-wider border-2 border-white px-4 py-2">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white line-clamp-1">{breed.name}</h3>
                    <span className="text-lg font-bold text-accent">₹{breed.price_pair}</span>
                </div>

                <p className="text-white/80 text-sm mb-4 line-clamp-2">{breed.description}</p>

                <div className="flex items-center space-x-3 text-xs text-white/50 mb-6 font-bold">
                    <span className={`px-2 py-1 rounded bg-white/5 ${breed.male_avail ? 'text-green-400' : 'text-red-400 line-through'}`}>Male Available</span>
                    <span className="text-white/20">|</span>
                    <span className={`px-2 py-1 rounded bg-white/5 ${breed.female_avail ? 'text-green-400' : 'text-red-400 line-through'}`}>Female Available</span>
                </div>

                <button
                    onClick={() => {
                        addToCart(breed, 1);
                        setIsCartOpen(true);
                    }}
                    disabled={breed.status !== 'available'}
                    className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default BreedCard;
