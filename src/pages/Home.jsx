import React, { useState } from 'react';
import { initialBreeds } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';
import { ChevronDown, Trophy, Users, Heart, Sprout, MapPin, Phone, Mail, Check } from 'lucide-react';

const Home = () => {
    const [products] = useState(initialBreeds);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderQuantity, setOrderQuantity] = useState(1);

    const categories = ['All', 'In Stock', 'Top Quality', 'Pairs', 'Females Only'];

    const handleBuy = (product, quantity) => {
        setSelectedProduct(product);
        setOrderQuantity(quantity);
        setShowModal(true);
    };

    const filteredProducts = products.filter(product => {
        if (filter === 'All') return true;
        if (filter === 'In Stock') return product.inStock;
        if (filter === 'Top Quality') return product.quality === 'Top Quality';
        if (filter === 'Pairs') return product.gender === 'Pair';
        if (filter === 'Females Only') return product.gender === 'Female';
        return true;
    });

    return (
        <div className="pb-12">
            {/* Hero Section Wrapper */}
            <div className="md:max-w-[1280px] md:mx-auto md:px-4 md:pt-24">
                <div className="relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] md:rounded-[2.5rem] bg-gray-900 shadow-2xl ring-1 ring-white/10">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <div className="h-full w-full bg-cover md:bg-contain bg-center md:bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://splashyfishstore.com/cdn/shop/articles/Low_Light_Freshwater_Plants_for_Aquarium_6262a715-dc3d-4b38-99e7-d6eb4bdfc327.jpg?v=1757836664')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-purple-900/40 to-black/80"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    </div>

                    <div className="relative px-6 py-24 text-center max-w-5xl mx-auto z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6 animate-fade-in-up">
                            🌿 Premium Guppy Breeding Farm
                        </span>
                        <h2 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl mb-8 drop-shadow-2xl animate-fade-in-up delay-100">
                            Experience the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">Vibrant Life</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-purple-100 mb-12 font-medium leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
                            We breed the finest quality guppies with improved genetics, vibrant colors, and healthy lineages. Elevate your aquarium today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                            <a href="#shop" className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black">
                                Shop Collection
                            </a>
                            <a href="#story" className="inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-white/20 focus:outline-none">
                                Our Story
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative -mt-12 z-20 max-w-4xl mx-auto px-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center border border-gray-100 dark:border-gray-800">
                    <div className="space-y-1">
                        <div className="flex justify-center text-primary mb-1"><Users size={24} /></div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white">1000+</h4>
                        <p className="text-xs font-bold text-gray-500">Happy Customers</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-center text-pink-500 mb-1"><Heart size={24} /></div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white">50+</h4>
                        <p className="text-xs font-bold text-gray-500">Unique Breeds</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-center text-green-500 mb-1"><Trophy size={24} /></div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white">15+</h4>
                        <p className="text-xs font-bold text-gray-500">Awards Won</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-center text-blue-500 mb-1"><Sprout size={24} /></div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white">5+</h4>
                        <p className="text-xs font-bold text-gray-500">Years Experience</p>
                    </div>
                </div>
            </div>

            {/* Farm Story Section */}
            <div id="story" className="py-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-bold text-primary tracking-wide uppercase">Our Journey</h2>
                        <h3 className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            The Path of Perfection
                        </h3>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block"></div>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-[45%] bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-md border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all">
                                    <span className="text-4xl mb-4 block">🧬</span>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Selective Breeding</h4>
                                    <p className="text-gray-600 dark:text-gray-400">We carefully select parent fish with the best traits—color, fin shape, and vitality—to ensure the next generation is even better.</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white dark:border-[#191022] hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                                <div className="md:w-[45%] bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-md border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all">
                                    <span className="text-4xl mb-4 block">🌱</span>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Optimal Growth Environment</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Our fry are raised in spacious tanks with live plants and high-quality nutrition to promote rapid and healthy growth.</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-pink-500 border-4 border-white dark:border-[#191022] hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-[45%] bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-md border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all">
                                    <span className="text-4xl mb-4 block">🔍</span>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Check</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Before listing, every fish undergoes a rigorous health and quality inspection. Only the best make it to our shop.</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-4 border-white dark:border-[#191022] hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop Section */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                        New Arrivals
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Explore our latest collection of exotic guppies.</p>
                </div>

                {/* Filters & Sort */}
                <div id="shop" className="sticky top-[4.5rem] z-40 -mx-4 mb-8 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 sm:mx-0 sm:rounded-xl sm:px-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${filter === cat
                                        ? 'bg-primary text-white shadow-glow'
                                        : 'bg-secondary dark:bg-surface-dark text-text-dark dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort (Placeholder) */}
                        <div className="flex items-center gap-2 border-l pl-4 border-gray-200 dark:border-gray-700 hidden sm:flex">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sort by:</span>
                            <div className="flex items-center gap-1 cursor-pointer text-sm font-bold text-primary">
                                <span>Newest</span>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onBuy={handleBuy}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No products found matching your filter.</p>
                        <button
                            onClick={() => setFilter('All')}
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            View All Breeds
                        </button>
                    </div>
                )}
            </div>

            {/* Need Help / About Section */}
            <div className="bg-white dark:bg-surface-dark py-24 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">About Lavender Aqua Farm</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Founded in 2020, Lavender Aqua Farm started as a passion project and grew into a premier destination for guppy enthusiasts. Located in the serene landscapes of Kerala, our farm focuses on sustainable breeding practices and genetic excellence.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Our mission is to bring the most colorful, healthy, and rare guppy strains to your doorstep, ensuring every hobbyist gets to experience the joy of a vibrant aquarium.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Check className="w-5 h-5 bg-green-100 text-green-600 rounded-full p-1" />
                                    <span>Sustainable Breeding</span>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Check className="w-5 h-5 bg-green-100 text-green-600 rounded-full p-1" />
                                    <span>Pan-India Shipping</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=2070&auto=format&fit=crop"
                                alt="Farm owner checking tanks"
                                className="relative rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-primary py-24 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-black mb-8">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                            <div className="mb-4 flex justify-center"><Phone size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
                            <p className="text-purple-100">+91 77366 81820</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                            <div className="mb-4 flex justify-center"><Mail size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">Email Us</h3>
                            <p className="text-purple-100">contact@lavenderaqua.com</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                            <div className="mb-4 flex justify-center"><MapPin size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">Visit Farm</h3>
                            <p className="text-purple-100">Kochi, Kerala, India</p>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                product={selectedProduct}
                quantity={orderQuantity}
            />
        </div>
    );
};

export default Home;
