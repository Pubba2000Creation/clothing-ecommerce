
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import api from '../api/axios';
import '../styles/Checkout.css';
import Footer from '../components/Footer';

const Checkout = () => {
    const { cart, cartTotal, cartCount, refreshCart } = useCart();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!cart.loading && (!cart.items || cart.items.length === 0) && !orderSuccess) {
            navigate('/cart');
        }
    }, [cart, navigate, orderSuccess]);

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        setError('');

        try {
            const response = await api.post('/orders/checkout');
            if (response.data.success) {
                setOrderSuccess(response.data.data);
                // Refresh cart to reflect it's now empty
                refreshCart();
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="checkout-page">
                <div className="checkout-success">
                    <div className="success-icon">✓</div>
                    <h2>Thank You for Your Order!</h2>
                    <p>Your order <strong>#{orderSuccess._id.slice(-8).toUpperCase()}</strong> has been placed successfully. A confirmation email has been sent to your inbox.</p>
                    <div className="success-actions">
                        <Link to="/orders" className="btn-place-order" style={{ width: 'auto', padding: '1rem 2rem', textDecoration: 'none' }}>
                            VIEW MY ORDERS
                        </Link>
                        <Link to="/products" className="btn-secondary">
                            CONTINUE SHOPPING
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="checkout-title">Complete Your Order</h1>

            <div className="checkout-layout">
                {/* Left Side: Order Review */}
                <div className="checkout-main">
                    <div className="checkout-section">
                        <h2><span>1</span> Review Your Items</h2>
                        <div className="order-items-mini">
                            {cart.items.map((item) => (
                                <div key={item._id} className="mini-item">
                                    <div className="mini-image">
                                        <img src={item.product?.imageUrl} alt={item.product?.name} />
                                    </div>
                                    <div className="mini-details">
                                        <h4>{item.product?.name}</h4>
                                        <p>Size: {item.size} | Qty: {item.quantity}</p>
                                        <p style={{ fontWeight: '700', color: 'var(--olive)' }}>${(item.product?.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h2><span>2</span> Delivery & Payment</h2>
                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Currently, we exclusively offer **Cash on Delivery** for all orders.
                            Our courier will contact you upon arrival to collect the payment.
                        </p>
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--cream)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--olive)', fontWeight: '600' }}>
                            🚚 Fast delivery: 3-5 Business Days
                        </div>
                    </div>
                </div>

                {/* Right Side: Total Summary */}
                <aside className="order-summary-card">
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summary</h3>

                    <div className="checkout-totals">
                        <div className="total-row">
                            <span>Subtotal ({cartCount} items)</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping</span>
                            <span style={{ color: 'var(--sage)', fontWeight: '700' }}>FREE</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Grand Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: '#ff4d4f', fontSize: '0.9rem', margin: '1rem 0', textAlign: 'center' }}>{error}</p>
                    )}

                    <button
                        className="btn-place-order"
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder || cartCount === 0}
                    >
                        {isPlacingOrder ? 'PLACING ORDER...' : 'PLACE ORDER NOW'}
                    </button>

                    <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center', marginTop: '1.5rem', lineHeight: '1.4' }}>
                        By placing your order, you agree to Luminary's Terms of Service and Privacy Policy.
                    </p>
                </aside>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
