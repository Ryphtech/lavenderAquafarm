import React from 'react';
import { Droplets, ShoppingBag } from 'lucide-react';

const BreedCard = ({ breed, onOrder }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={breed.images[0]}
                    alt={breed.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-900 shadow-sm">
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
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{breed.name}</h3>
                    <span className="text-lg font-bold text-indigo-600">₹{breed.price_pair}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{breed.description}</p>

                <div className="flex items-center space-x-3 text-xs text-gray-500 mb-6">
                    <span className={`px-2 py-1 rounded bg-gray-100 ${breed.male_avail ? 'text-green-600' : 'text-red-500 line-through'}`}>Male</span>
                    <span className="text-gray-300">|</span>
                    <span className={`px-2 py-1 rounded bg-gray-100 ${breed.female_avail ? 'text-green-600' : 'text-red-500 line-through'}`}>Female</span>
                </div>

                <button
                    onClick={() => onOrder(breed)}
                    disabled={breed.status !== 'available'}
                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
                >
                    <ShoppingBag size={18} />
                    <span>Place Order</span>
                </button>
            </div>
        </div>
    );
};

export default BreedCard;
