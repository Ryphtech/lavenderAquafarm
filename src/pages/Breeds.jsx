import React, { useEffect, useState } from 'react';
import { breedService } from '../services/mockData';
import BreedCard from '../components/BreedCard';
import OrderModal from '../components/OrderModal';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

const Breeds = () => {
    const [breeds, setBreeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { setIsCartOpen } = useCart();

    useEffect(() => {
        setBreeds(breedService.getAll());
    }, []);

    const handleCheckout = () => {
        setIsModalOpen(true);
        setIsCartOpen(false);
    };

    const filteredBreeds = breeds.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Our Collection</h1>
                        <p className="text-white/70">Explore our premium selection of exotic fish.</p>
                    </div>

                    <div className="mt-6 md:mt-0 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search varieties / breeds..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 rounded-full border border-white/10 bg-surface-dark text-white w-full md:w-80 focus:ring-2 focus:ring-accent focus:outline-none shadow-sm placeholder-white/20"
                        />
                    </div>
                </div>

                {filteredBreeds.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/50 text-lg">No breeds found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBreeds.map((breed) => (
                            <BreedCard key={breed.id} breed={breed} />
                        ))}
                    </div>
                )}

                <OrderModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                <CartDrawer onCheckout={handleCheckout} />
            </div>
        </div>
    );
};

export default Breeds;
