import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';
import { Trophy, Users, Heart, Sprout, MapPin, Phone, Mail, Check, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import heroImg1 from '../assets/hero-carousal1.jpeg';
import heroImg2 from '../assets/hero-carousal2.jpeg';
import heroImg3 from '../assets/hero-carousal3.jpeg';
import heroImg4 from '../assets/hero-carousal4.jpeg';
import heroImg5 from '../assets/hero-carousal5.jpeg';
import mobileHeroImg1 from '../assets/hero-mobileCarousal1.jpeg';
import mobileHeroImg2 from '../assets/hero-mobileCarousal2.jpeg';
import mobileHeroImg3 from '../assets/hero-mobileCarousal3.jpeg';
import mobileHeroImg4 from '../assets/hero-mobileCarousal4.jpeg';
import mobileHeroImg5 from '../assets/hero-mobileCarousal5.jpeg';
import selectiveBreedingImg from '../assets/selectiveBreeding.jpg';
import qualityCheckImg from '../assets/qualityCheck.webp';
import optimalGrowthImg from '../assets/optimalGrowth.png';
import CircularGallery from '../components/CircularGallery';
import logo from '../assets/logo.jpg';
import { breedService } from '../services/mockData';
import BlurText from '../components/BlurText';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentBg, setCurrentBg] = useState(0);

    const bgImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];
    const mobileBgImages = [mobileHeroImg1, mobileHeroImg2, mobileHeroImg3, mobileHeroImg4, mobileHeroImg5];

    const galleryItems = useMemo(() => {
        return products
            .filter(p => p.quality === 'Top Quality')
            .map(p => ({ image: p.image, text: p.name }));
    }, [products]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await breedService.getAll();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();

        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 1500);
        return () => clearInterval(timer);
    }, [bgImages.length]);

    const categories = ['All', 'In Stock', 'Top Quality', 'Pairs', 'Females Only'];

    const { setIsCartOpen } = useCart();

    const handleCheckout = () => {
        setShowModal(true);
        setIsCartOpen(false);
    };

    const filteredProducts = products.filter(product => {
        const matchesFilter =
            filter === 'All' ||
            (filter === 'In Stock' && product.in_stock) ||
            (filter === 'Top Quality' && product.quality === 'Top Quality') ||
            (filter === 'Pairs' && product.gender === 'Pair') ||
            (filter === 'Females Only' && product.gender === 'Female');

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.variety && product.variety.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.grade && product.grade.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesFilter && matchesSearch;
    });


    return (
        <div className="pb-12">
            {/* Hero Section Wrapper */}
            <div className="md:max-w-[1280px] md:mx-auto md:px-4 md:pt-32 pt-28">
                <div className="relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] md:rounded-[2.5rem] bg-gray-900 shadow-2xl ring-1 ring-white/10">
                    {/* Background Slider */}
                    <div className="absolute inset-0">
                        {/* Desktop Images */}
                        <div className="hidden md:block absolute inset-0">
                            {bgImages.map((img, index) => (
                                <div
                                    key={`desktop-${index}`}
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out brightness-[0.6] ${currentBg === index ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ backgroundImage: `url('${img}')` }}
                                ></div>
                            ))}
                        </div>
                        {/* Mobile Images */}
                        <div className="block md:hidden absolute inset-0">
                            {mobileBgImages.map((img, index) => (
                                <div
                                    key={`mobile-${index}`}
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out brightness-[0.6] ${currentBg === index ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ backgroundImage: `url('${img}')` }}
                                ></div>
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    </div>

                    <div className="relative px-6 py-24 text-center max-w-5xl mx-auto z-10">


                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6 animate-fade-in-up">
                            🌿 Premium Guppy Breeding Farm
                        </span>

                        <div className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl mb-8 drop-shadow-2xl">
                            <BlurText
                                text="Experience the"
                                className="justify-center text-white mb-2"
                                delay={150}
                                animateBy="words"
                                direction="top"
                            />
                            <BlurText
                                text="Vibrant Life"
                                className="justify-center text-lavender font-extrabold"
                                delay={150}
                                animateBy="words"
                                direction="top"
                            />
                        </div>
                        <p className="mx-auto max-w-2xl text-xl text-white mb-12 font-medium leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
                            We breed the finest quality guppies with improved genetics, vibrant colors, and healthy lineages. Elevate your aquarium today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                            <a href="#shop" className="inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-accent/30 transition-all hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black">
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
                <div className="bg-surface-dark/80 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center border border-white/5">
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center text-accent mb-1"><Users size={24} /></div>
                        <h4 className="text-2xl font-black text-white">1000+</h4>
                        <p className="text-xs font-bold text-white/90">Happy Customers</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center text-accent mb-1"><Heart size={24} /></div>
                        <h4 className="text-2xl font-black text-white">50+</h4>
                        <p className="text-xs font-bold text-white/90">Unique Breeds</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center text-accent mb-1"><Trophy size={24} /></div>
                        <h4 className="text-2xl font-black text-white">15+</h4>
                        <p className="text-xs font-bold text-white/90">Awards Won</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center text-accent mb-1"><Sprout size={24} /></div>
                        <h4 className="text-2xl font-black text-white">5+</h4>
                        <p className="text-xs font-bold text-white/90">Years Experience</p>
                    </div>
                </div>
            </div>

            {/* Farm Story Section */}
            <div id="story" className="py-24 bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-bold text-accent tracking-wide uppercase">Our Journey</h2>
                        <h3 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                            The Path of Perfection
                        </h3>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block"></div>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-[45%] relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] group/card">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                                        style={{ backgroundImage: `url(${selectiveBreedingImg})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                                    <div className="relative p-8 min-h-[220px] flex flex-col justify-end">
                                        <h4 className="text-xl font-bold text-white mb-2">Selective Breeding</h4>
                                        <p className="text-white text-sm leading-relaxed">We carefully select parent fish with the best traits—color, fin shape, and vitality—to ensure the next generation is even better.</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent border-4 border-slate-900 hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                                <div className="md:w-[45%] relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] group/card">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                                        style={{ backgroundImage: `url(${optimalGrowthImg})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                                    <div className="relative p-8 min-h-[220px] flex flex-col justify-end text-right">
                                        <h4 className="text-xl font-bold text-white mb-2">Optimal Growth Environment</h4>
                                        <p className="text-white text-sm leading-relaxed">Our fry are raised in spacious tanks with live plants and high-quality nutrition to promote rapid and healthy growth.</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-500 border-4 border-slate-900 hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-[45%] relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] group/card">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                                        style={{ backgroundImage: `url(${qualityCheckImg})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                                    <div className="relative p-8 min-h-[220px] flex flex-col justify-end">
                                        <h4 className="text-xl font-bold text-white mb-2">Quality Check</h4>
                                        <p className="text-white text-sm leading-relaxed">Before listing, every fish undergoes a rigorous health and quality inspection. Only the best make it to our shop.</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 border-4 border-slate-900 hidden md:block z-10"></div>
                                <div className="md:w-[45%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Circular Gallery Section */}
            <div className="h-[400px] md:h-[600px] w-full bg-background-light relative overflow-hidden">
                <div className="absolute top-8 left-0 right-0 z-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-white sm:text-4xl mb-2">Premium Collection</h2>
                    <p className="text-white/70 text-sm md:text-base">Swipe to explore our finest breeds</p>
                </div>
                <CircularGallery
                    items={galleryItems}
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    font="bold 30px Manrope"
                />
            </div>

            {/* Shop Section */}
            <div id="shop" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
                        Explore Varieties
                    </h2>
                    <p className="text-lg text-white">Explore our latest collection of exotic guppies.</p>
                </div>

                {/* Filters & Sort */}
                <div id="shop" className="sticky top-[4.5rem] z-40 -mx-4 mb-8 bg-background-dark/95 backdrop-blur-sm px-4 py-3 sm:mx-0 sm:rounded-xl sm:px-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${filter === cat
                                        ? 'bg-accent text-white shadow-lg'
                                        : 'bg-surface-dark text-white hover:bg-surface-dark/80 border border-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="text"
                                placeholder="Search for your favorite guppy varieties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full rounded-2xl border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-accent focus:ring-accent sm:text-sm"
                            />
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
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white text-lg">No products found matching your filter.</p>
                        <button
                            onClick={() => setFilter('All')}
                            className="mt-4 text-accent font-bold hover:underline"
                        >
                            View All Breeds
                        </button>
                    </div>
                )}
            </div>

            {/* Need Help / About Section */}
            <div id="about" className="bg-background-dark py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-white mb-6">About Lavender Aqua Farm</h2>
                            <p className="text-lg text-white mb-6 leading-relaxed opacity-90">
                                Founded in 2020, Lavender Aqua Farm started as a passion project and grew into a premier destination for guppy enthusiasts. Located in the serene landscapes of Kerala, our farm focuses on sustainable breeding practices and genetic excellence.
                            </p>
                            <p className="text-lg text-white mb-8 leading-relaxed opacity-90">
                                Our mission is to bring the most colorful, healthy, and rare guppy strains to your doorstep, ensuring every hobbyist gets to experience the joy of a vibrant aquarium.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-accent font-bold">
                                    <Check className="w-5 h-5 bg-green-500/20 text-green-500 rounded-full p-1" />
                                    <span>Sustainable Breeding</span>
                                </div>
                                <div className="flex items-center gap-2 text-accent font-bold">
                                    <Check className="w-5 h-5 bg-green-500/20 text-green-500 rounded-full p-1" />
                                    <span>Pan-India Shipping</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 rounded-full rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
                            <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-full shadow-2xl shadow-black/50 rotate-[-2deg] hover:rotate-0 transition-all duration-500">
                                <img
                                    src={logo}
                                    alt="Lavender Aqua Farm Logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="bg-background-dark py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl font-black text-white mb-12 text-center">Get in Touch</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-surface-dark/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:bg-surface-dark/60 transition-all cursor-pointer group text-center sm:col-span-2 lg:col-span-1">
                                <div className="mb-4 flex justify-center text-accent group-hover:scale-110 transition-transform"><Phone size={32} /></div>
                                <h3 className="text-xl font-bold mb-2 text-white">WhatsApp Support</h3>
                                <p className="text-white">+91 77366 81820</p>
                            </div>
                            <div className="bg-surface-dark/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:bg-surface-dark/60 transition-all cursor-pointer group text-center sm:col-span-1 lg:col-span-1">
                                <div className="mb-4 flex justify-center text-accent group-hover:scale-110 transition-transform"><Mail size={32} /></div>
                                <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
                                <p className="text-white">contact@lavenderaqua.com</p>
                            </div>
                            <a
                                href="https://wa.me/917736681820?text=Hi%2C%20I%20would%20like%20to%20request%20a%20visit%20to%20Lavender%20Aqua%20Farm."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-surface-dark/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:bg-surface-dark/60 transition-all cursor-pointer group text-center sm:col-span-1 lg:col-span-2 block"
                            >
                                <div className="mb-4 flex justify-center text-accent group-hover:scale-110 transition-transform"><MapPin size={32} /></div>
                                <h3 className="text-xl font-bold mb-2 text-white">Request Farm Visit</h3>
                                <div className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent/20 px-4 py-2 text-sm font-bold text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                    Book Appointment
                                </div>
                            </a>
                        </div>

                        {/* Map */}
                        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252543.61714730656!2d76.75946589270501!3d8.499960440586324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb805bbcd47%3A0x15439fab5c5c81cb!2sThiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1771055409406!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />

            <CartDrawer onCheckout={handleCheckout} />
        </div >
    );
};

export default Home;
