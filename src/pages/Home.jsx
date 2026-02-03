import React from 'react';
import { ArrowRight, Droplets, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-indigo-900 text-white py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524704654690-b56c05c4d93d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Aquatic Companion</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto">
                        Premium exotic fish breeds raised with love and care at Lavender Aquafarm.
                    </p>
                    <Link
                        to="/breeds"
                        className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-white text-indigo-900 hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg"
                    >
                        Farm This Way <ArrowRight className="ml-2 w-6 h-6" />
                    </Link>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: Droplets, title: 'Pure Water Rearing', desc: 'Our fish are raised in pristine, constantly monitored water conditions.' },
                            { icon: Heart, title: 'Ethical Breeding', desc: 'We prioritize the health and genetic quality of our fish above all else.' },
                            { icon: ArrowRight, title: 'Safe Delivery', desc: 'Expert packing ensures your new pets arrive healthy and active.' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
                                <item.icon className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Visit Our Farm</h2>
                    <div className="bg-white p-8 rounded-3xl shadow-sm inline-block max-w-2xl w-full">
                        <div className="aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-500">
                            {/* Mock Map */}
                            <span>Interactive Map Placeholder</span>
                        </div>
                        <h3 className="text-xl font-semibold">Lavender Aquafarm</h3>
                        <p className="text-gray-600 mt-2">123 Aqua Lane, Lake District, Kerala.</p>
                        <p className="text-gray-500 text-sm mt-1">Open Mon-Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
