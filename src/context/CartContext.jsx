import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('lavenderCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartError, setCartError] = useState(null);

    useEffect(() => {
        localStorage.setItem('lavenderCart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (cartError) {
            const timer = setTimeout(() => setCartError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [cartError]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                // Add new item if under limit
                if (prevItems.length >= 5) {
                    setCartError('Cart is full! Proceed to checkout and order again for more.');
                    return prevItems;
                }
                setCartError(null);
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartError,
            setCartError,
            clearError: () => setCartError(null)
        }}>
            {children}
        </CartContext.Provider>
    );
};
