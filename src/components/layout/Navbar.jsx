import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
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
                window.location.href = `/#${link.hash}`;
            }
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 pt-4 flex justify-center transition-all duration-300">
            <div className={`w-full max-w-[1280px] mx-4 sm:mx-6 lg:mx-8 rounded-2xl transition-all duration-300 ${scrolled
                ? 'bg-neutral-900/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-lg py-1'
                : 'bg-primary/80 backdrop-blur-sm shadow-2xl shadow-black/20 border border-white/10 py-2'}`}>
                <div className="px-4 sm:px-6">
                    <div className="flex h-14 items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden shadow-lg shadow-black/50 transition-transform group-hover:scale-110">
                                <img src={logo} alt="Lavender Aqua Farm" className="h-full w-full object-cover" />
                            </div>
                            <h1 className="text-lg font-extrabold tracking-tight sm:text-xl drop-shadow-sm transition-colors text-lavender uppercase">Lavender AquaFarm</h1>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.hash ? `#${link.hash}` : link.path}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`text-sm font-bold transition-all px-3 py-1.5 rounded-lg text-white hover:text-lavender`}
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Cart Icon - Hidden on Admin Page */}
                            {location.pathname !== '/admin' && (
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
                                >
                                    <ShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white ring-2 ring-primary shadow-lg animate-bounce-subtle">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex md:hidden items-center gap-4">
                            {/* Mobile Cart - Hidden on Admin Page */}
                            {location.pathname !== '/admin' && (
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all"
                                >
                                    <ShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white ring-2 ring-primary">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            )}

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="focus:outline-none transition-colors text-white hover:opacity-80"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-24 left-4 right-4 z-40 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.hash ? `#${link.hash}` : link.path}
                                onClick={(e) => handleNavClick(e, link)}
                                className="block px-4 py-3 rounded-xl text-base font-medium transition-colors text-white hover:text-lavender hover:bg-white/5"
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
