
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './useAuth';
import CartContext from './CartContextDecl';

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);

    // Fetch cart from backend if logged in, otherwise from localStorage
    const fetchCart = useCallback(async () => {
        // We initialize loading as true, so we don't need to synchronously set it here
        // on the initial mount. For subsequent refreshes, we can handle it.
        try {
            if (user) {
                const response = await api.get('/cart');
                if (response.data.success) {
                    setCart(response.data.data);
                }
            } else {
                const guestCart = JSON.parse(localStorage.getItem('guestCart')) || { items: [] };
                setCart(guestCart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            // If user changes, we might want to show loading again
            if (!loading) setLoading(true);
            await fetchCart();
        };

        load();

        return () => { isMounted = false; };
    }, [user]); // Only run when user changes, fetchCart is already dependent on user

    // Handle merging guest cart upon login
    useEffect(() => {
        if (!user) return;

        const mergeCarts = async () => {
            const guestCart = JSON.parse(localStorage.getItem('guestCart'));
            if (guestCart && guestCart.items && guestCart.items.length > 0) {
                try {
                    // Backend expects items array with product, size, quantity
                    const itemsToMerge = guestCart.items.map(item => ({
                        product: item.product?._id || item.product,
                        size: item.size,
                        quantity: item.quantity
                    }));

                    const response = await api.post('/cart/merge', { items: itemsToMerge });
                    if (response.data.success) {
                        localStorage.removeItem('guestCart');
                        setCart(response.data.data);
                    }
                } catch (error) {
                    console.error('Error merging carts:', error);
                }
            }
        };

        mergeCarts();
    }, [user]);

    const addToCart = async (product, size, quantity) => {
        if (user) {
            try {
                const response = await api.post('/cart', {
                    productId: product._id,
                    size,
                    quantity
                });
                if (response.data.success) {
                    // Refetch to get full populated data
                    fetchCart();
                }
            } catch (error) {
                console.error('Add to cart error:', error);
                alert(error.response?.data?.message || 'Error adding to cart');
            }
        } else {
            // Guest logic
            const currentCart = { ...cart };
            const existingIndex = currentCart.items.findIndex(
                item => (item.product._id === product._id || item.product === product._id) && item.size === size
            );

            if (existingIndex > -1) {
                currentCart.items[existingIndex].quantity += quantity;
            } else {
                currentCart.items.push({
                    product, // Store full product object for guest view
                    size,
                    quantity,
                    _id: Math.random().toString(36).substr(2, 9) // Temp ID
                });
            }

            setCart(currentCart);
            localStorage.setItem('guestCart', JSON.stringify(currentCart));
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (user) {
            try {
                const response = await api.put(`/cart/${itemId}`, { quantity });
                if (response.data.success) {
                    fetchCart();
                }
            } catch (error) {
                console.error('Update quantity error:', error);
            }
        } else {
            const currentCart = { ...cart };
            const item = currentCart.items.find(i => i._id === itemId);
            if (item) {
                item.quantity = quantity;
                setCart(currentCart);
                localStorage.setItem('guestCart', JSON.stringify(currentCart));
            }
        }
    };

    const removeFromCart = async (itemId) => {
        if (user) {
            try {
                const response = await api.delete(`/cart/${itemId}`);
                if (response.data.success) {
                    fetchCart();
                }
            } catch (error) {
                console.error('Remove from cart error:', error);
            }
        } else {
            const currentCart = { ...cart };
            currentCart.items = currentCart.items.filter(i => i._id !== itemId);
            setCart(currentCart);
            localStorage.setItem('guestCart', JSON.stringify(currentCart));
        }
    };

    const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.items.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            cartCount,
            cartTotal,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
