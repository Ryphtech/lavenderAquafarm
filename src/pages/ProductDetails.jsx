import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { breedService } from '../services/mockData';
import { ShoppingCart, Star, ArrowLeft, Check, AlertCircle } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // In a real app, you might need a specific getById or just find it from the list if state was passed
                const data = await breedService.getById(id);
                if (data) {
                    setProduct(data);
                    // Use the first image from the array if available, otherwise the single image field
                    const initialImage = (data.images && data.images.length > 0) ? data.images[0] : data.image;
                    setSelectedImage(initialImage);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setIsCartOpen(true);
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center pt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-background-dark pt-32 px-4 text-center">
                <div className="max-w-md mx-auto bg-surface-dark p-8 rounded-2xl border border-white/10">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">{error || 'Product Not Found'}</h2>
                    <p className="text-white/60 mb-6">The product you are looking for might have been removed or does not exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-accent text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    // Prepare images array for gallery
    const images = (product.images && product.images.length > 0)
        ? product.images
        : (product.image ? [product.image] : []);

    const inStock = product.inStock ?? product.in_stock;

    return (
        <div className="min-h-screen bg-background-dark pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Listings
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                            {!inStock && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                                    <span className="rotate-[-12deg] rounded-lg border-2 border-red-500 px-6 py-3 text-2xl font-black uppercase tracking-widest text-red-500 bg-black/80 shadow-2xl">
                                        Sold Out
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img
                                                ? 'border-accent ring-2 ring-accent/30 scale-105'
                                                : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">{product.name}</h1>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {product.quality === 'Top Quality' && (
                                    <span className="inline-flex items-center rounded-lg bg-yellow-500/10 px-3 py-1 text-sm font-bold text-yellow-500 border border-yellow-500/20">
                                        <Star size={14} className="mr-1.5 fill-current" />
                                        Top Quality
                                    </span>
                                )}
                                {product.grade && (
                                    <span className="inline-flex items-center rounded-lg bg-white/5 px-3 py-1 text-sm font-bold text-white/80 border border-white/10">
                                        {product.grade}
                                    </span>
                                )}
                                <span className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-bold border ${product.gender === 'Male' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        product.gender === 'Female' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                                            'bg-violet-500/10 text-violet-400 border-violet-500/20'
                                    }`}>
                                    {product.gender}
                                </span>
                            </div>

                            <div className="text-3xl font-bold text-accent mb-8">
                                ₹{product.price}
                            </div>

                            <p className="text-white/70 leading-relaxed text-lg mb-8">
                                {product.description || "This beautiful guppy features vibrant coloration and excellent health. Bred in optimal conditions at Lavender Aqua Farm, ensuring strong genetics and vitality."}
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="bg-green-500/20 p-1.5 rounded-full">
                                        <Check size={16} className="text-green-500" />
                                    </div>
                                    <span>Healthy & Active</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="bg-green-500/20 p-1.5 rounded-full">
                                        <Check size={16} className="text-green-500" />
                                    </div>
                                    <span>Farm Raised</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="bg-green-500/20 p-1.5 rounded-full">
                                        <Check size={16} className="text-green-500" />
                                    </div>
                                    <span>Live Arrival Guarantee</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/10">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Quantity Selector */}
                                <div className={`flex items-center justify-between rounded-xl border border-white/10 bg-black/20 h-14 sm:w-40 ${!inStock ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <button
                                        onClick={decrement}
                                        className="h-full w-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-l-xl transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-bold text-white">{quantity}</span>
                                    <button
                                        onClick={increment}
                                        className="h-full w-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-r-xl transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!inStock}
                                    className={`flex-1 flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold text-white shadow-xl transition-all ${inStock
                                            ? 'bg-accent hover:bg-purple-700 hover:scale-[1.02] shadow-accent/20'
                                            : 'bg-slate-600 cursor-not-allowed opacity-70'
                                        }`}
                                >
                                    <ShoppingCart size={24} />
                                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
