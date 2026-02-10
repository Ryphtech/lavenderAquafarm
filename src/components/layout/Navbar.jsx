import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Shop', path: '/', hash: 'shop' },
        { name: 'About Us', path: '/', hash: 'about' },
        { name: 'Contact', path: '/', hash: 'contact' },
    ];

    const handleNavClick = (e, link) => {
        if (link.hash) {
            e.preventDefault();
            const element = document.getElementById(link.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (location.pathname !== '/') {
                // If not on home page, navigate to home then scroll
                window.location.href = `/${link.hash}`;
            }
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 pt-4 flex justify-center transition-all duration-300">
            <div className={`w-full max-w-[1280px] mx-4 sm:mx-6 lg:mx-8 rounded-2xl transition-all duration-300 ${scrolled
                ? 'bg-[#faf8fc]/80 dark:bg-[#191022]/80 backdrop-blur-md border border-[#ede7f3] dark:border-[#382b47] shadow-lg py-1'
                : 'bg-primary shadow-2xl shadow-primary/20 border border-white/10 py-2'}`}>
                <div className="px-4 sm:px-6">
                    <div className="flex h-14 items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors shadow-glow ${scrolled
                                ? 'bg-primary/10 text-primary dark:bg-primary dark:text-white group-hover:bg-primary group-hover:text-white'
                                : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                                <Droplets size={18} fill="currentColor" />
                            </div>
                            <h1 className={`text-lg font-extrabold tracking-tight sm:text-xl drop-shadow-sm transition-colors ${scrolled
                                ? 'text-primary dark:text-white'
                                : 'text-white'}`}>Lavender Aqua Farm</h1>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.hash ? `#${link.hash}` : link.path}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`text-sm font-bold transition-all px-3 py-1.5 rounded-lg ${scrolled
                                        ? 'text-gray-600 hover:text-primary hover:bg-primary/5 dark:text-gray-300 dark:hover:text-white'
                                        : 'text-purple-100 hover:text-white hover:bg-white/10'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`focus:outline-none transition-colors ${scrolled
                                    ? 'text-gray-600 dark:text-gray-300 hover:text-primary'
                                    : 'text-purple-100 hover:text-white'}`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-24 left-4 right-4 z-40 bg-white/95 dark:bg-[#191022]/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.hash ? `#${link.hash}` : link.path}
                                onClick={(e) => handleNavClick(e, link)}
                                className="block px-4 py-3 rounded-xl text-base font-medium transition-colors text-gray-600 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
