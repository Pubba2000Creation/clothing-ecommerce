
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/Cart.css';
import Footer from '../components/Footer';

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            // Store target path and redirect to login
            localStorage.setItem('redirectAfterLogin', '/checkout');
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '10rem' }}>Syncing your cart...</div>;

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-cart">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="btn-checkout" style={{ display: 'inline-block', width: 'auto', marginTop: '2rem', textDecoration: 'none' }}>
                        START SHOPPING
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 className="cart-title">Your Shopping Cart</h1>
            <div className="cart-layout">
                {/* Items List */}
                <div className="cart-items-container">
                    {cart.items.map((item) => (
                        <div key={item._id} className="cart-item">
                            <div className="item-image">
                                <img src={item.product?.imageUrl || 'https://via.placeholder.com/100x130?text=No+Image'} alt={item.product?.name} />
                            </div>
                            <div className="item-details">
                                <Link to={`/product/${item.product?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3>{item.product?.name}</h3>
                                </Link>
                                <div className="item-meta">
                                    <span>Size: <strong>{item.size}</strong></span>
                                    <span>Price: <strong>${item.product?.price?.toFixed(2)}</strong></span>
                                </div>
                                <div className="cart-quantity-controls">
                                    <button className="qty-btn" onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                                    <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="remove-item" onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                            <div className="item-price-total" style={{ textAlign: 'right', fontWeight: '900' }}>
                                ${(item.product?.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Box */}
                <aside className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Items ({cartCount})</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span style={{ color: 'var(--sage)', fontWeight: '700' }}>FREE</span>
                    </div>
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <button className="btn-checkout" onClick={handleCheckout}>
                        PROCEED TO CHECKOUT
                    </button>

                    <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center', marginTop: '1.5rem' }}>
                        Taxes and shipping calculated at checkout
                    </p>
                </aside>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
