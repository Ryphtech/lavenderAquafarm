import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Lavender Aquafarm</h3>
                        <p className="text-gray-400 text-sm">
                            Premium quality exotic fish breeding farm. Bringing nature's colors to your aquarium.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-400">
                                <MapPin size={18} className="mr-2" />
                                <span className="text-sm">123 Aqua Lane, Lake District</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Phone size={18} className="mr-2" />
                                <span className="text-sm">+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/breeds" className="hover:text-primary transition-colors">Fish Breeds</Link></li>
                            <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Access</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} <Link to="/admin" className="hover:text-gray-400 transition-colors">Lavender Aquafarm</Link>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
