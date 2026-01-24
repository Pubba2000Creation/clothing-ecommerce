
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/Orders.css';
import Footer from '../components/Footer';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (err) {
                console.error('Fetch orders error:', err);
                setError('Failed to load your orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '10rem' }}>Retrieving your order history...</div>;

    return (
        <div className="orders-page">
            <h1 className="orders-title">My Order History</h1>

            {error && <div className="auth-error" style={{ marginBottom: '2rem' }}>{error}</div>}

            {!orders || orders.length === 0 ? (
                <div className="empty-orders">
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📦</div>
                    <h2>No orders yet</h2>
                    <p>When you place an order, it will appear here.</p>
                    <Link to="/products" className="btn-place-order" style={{ display: 'inline-block', width: 'auto', marginTop: '2rem', textDecoration: 'none' }}>
                        GO TO SHOP
                    </Link>
                </div>
            ) : (
                <div className="orders-container">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-card-header">
                                <div className="order-id-group">
                                    <h3>Order Number</h3>
                                    <p>#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="order-meta-group">
                                    <span className="status-badge">Processing</span>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Placed on {new Date(order.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            <div className="order-card-items">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="order-item-row">
                                        <div className="order-item-info">
                                            {/* Note: items in order response don't have populated product usually, 
                                                but depending on backend implementation, we might need to handle this.
                                                Based on provided JSON, it's just ID. 
                                                If backend doesn't populate, we show placeholders or just details we have.
                                            */}
                                            <div className="order-item-img">
                                                <img src={item.product?.imageUrl || 'https://via.placeholder.com/70x90?text=Item'} alt={item.product?.name} />
                                            </div>
                                            <div className="order-item-text">
                                                <h4>{item.product?.name || `Product #${(item.product?._id || item.product)?.toString().slice(-5)}`}</h4>
                                                <p>Size: {item.size} | Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="order-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-card-footer">
                                <span className="order-total-label">Order Total</span>
                                <span className="order-total-amount">${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Orders;
