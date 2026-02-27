import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';
import logo from '../../assets/logo.jpg';

const Footer = () => {
    return (
        <footer className="bg-background-dark text-white pt-16 pb-8 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg shadow-black/20">
                                <img src={logo} alt="Lavender Aqua Farm" className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold uppercase">Lavender Aqua</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                            Premium quality exotic fish breeding farm. Bringing nature's colors to your aquarium.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-start text-white/70">
                                <MapPin size={18} className="mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm">123 Aqua Lane, Lake District, Trivandrum, Kerala, India</span>
                            </div>
                            <div className="flex items-center text-white/70">
                                <Phone size={18} className="mr-2 shrink-0" />
                                <span className="text-sm">+91 9633206134</span>
                            </div>
                            <div className="flex items-center text-white/70">
                                <Mail size={18} className="mr-2 shrink-0" />
                                <a href="mailto:lavenderaquafarm@gmail.com" className="text-sm hover:text-accent transition-colors">lavenderaquafarm@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><a href="/#shop" className="hover:text-accent transition-colors">Home</a></li>
                            <li><a href="/#shop" className="hover:text-accent transition-colors">Fish Breeds</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/40">
                    &copy; {new Date().getFullYear()} <Link to="/admin" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Lavender Aquafarm</Link>. All rights reserved.
                </div>
            </div>
        </footer >
    );
};

export default Footer;
