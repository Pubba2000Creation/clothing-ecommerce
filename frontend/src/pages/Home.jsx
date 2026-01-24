import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/Home.css';
import Footer from '../components/Footer';

const Home = () => {
    const [activeTab, setActiveTab] = useState('top-rate');
    const [newArrivals, setNewArrivals] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [topSellers, setTopSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                const [newRes, ratedRes, sellersRes] = await Promise.all([
                    api.get('/products/new-arrivals'),
                    api.get('/products/top-rated'),
                    api.get('/products/top-sellers')
                ]);

                if (newRes.data.success) setNewArrivals(newRes.data.data);
                if (ratedRes.data.success) setTopRated(ratedRes.data.data);
                if (sellersRes.data.success) setTopSellers(sellersRes.data.data);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const getTrendingProducts = () => {
        if (activeTab === 'top-rate') return topRated;
        if (activeTab === 'top-sale') return topSellers;
        return [];
    };

    return (
        <div className="home-container">
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-subtitle">NEW ARRIVAL</p>
                    <h1 className="hero-title">Experience the Art of Premium Living</h1>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#555' }}>Explore our exclusive Spring collection designed for the modern individual.</p>
                    <Link to="/products" className="hero-btn">SHOP THE COLLECTION</Link>
                </div>
            </section>

            {/* NEW ARRIVALS */}
            <section className="new-arrivals">
                <h2 className="section-title">New Arrivals</h2>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="arrivals-grid">
                        {newArrivals.length > 0 ? (
                            newArrivals.map(product => (
                                <Link key={product._id} to={`/product/${product._id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="product-image">
                                        <span className="badge">NEW</span>
                                        <img src={product.imageUrl} alt={product.name} />
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p style={{ color: 'var(--olive)', fontWeight: 'bold' }}>Rs. {product.price}</p>
                                </Link>
                            ))
                        ) : (
                            <p>No new arrivals found.</p>
                        )}
                    </div>
                )}
            </section>

            {/* TRENDING NOW (Tabs) */}
            <section className="trending-now" style={{ backgroundColor: '#fdfdfd' }}>
                <h2 className="section-title">Trending Now</h2>
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'top-rate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('top-rate')}
                    >
                        Top Rate
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'top-sale' ? 'active' : ''}`}
                        onClick={() => setActiveTab('top-sale')}
                    >
                        Top Sale
                    </button>
                </div>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="trending-grid arrivals-grid">
                        {getTrendingProducts().length > 0 ? (
                            getTrendingProducts().map(product => (
                                <Link key={product._id} to={`/product/${product._id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="product-image">
                                        <img src={product.imageUrl} alt={product.name} />
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p style={{ color: 'var(--olive)', fontWeight: 'bold' }}>Rs. {product.price}</p>
                                </Link>
                            ))
                        ) : (
                            <p>No products found in this category.</p>
                        )}
                    </div>
                )}
            </section>

            {/* COLLECTION SECTION */}
            {/* ... keeping the static collections as they are ... */}
            <section className="collections">
                <h2 className="section-title">Collections</h2>
                <div className="collection-banners">
                    <div className="banner-item">
                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" alt="Fashion" />
                        <div className="banner-content">
                            <h3>FASHION CLOTHING</h3>
                            <a href="/products?cat=fashion" style={{ color: 'var(--olive)', textDecoration: 'none', fontWeight: 'bold' }}>SHOP NOW &rarr;</a>
                        </div>
                    </div>
                    <div className="banner-item">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80" alt="Accessories" />
                        <div className="banner-content">
                            <h3>PREMIUM ACCESSORIES</h3>
                            <a href="/products?cat=accessories" style={{ color: 'var(--olive)', textDecoration: 'none', fontWeight: 'bold' }}>SHOP NOW &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* COLLABORATE BRANDINGS */}
            <section className="brandings" style={{ backgroundColor: '#fff' }}>
                <div className="brands-row">
                    <div className="brand-icon">ZARA</div>
                    <div className="brand-icon">GUCCI</div>
                    <div className="brand-icon">PRADA</div>
                    <div className="brand-icon">VOGUE</div>
                    <div className="brand-icon">CALVIN KLEIN</div>
                </div>
            </section>

            {/* DETAILS SECTION */}
            <section className="details-section">
                <div className="detail-item">
                    <h3>FREE SHIPPING</h3>
                    <p>On all orders over $99. No hidden charges.</p>
                </div>
                <div className="detail-item">
                    <h3>24/7 SUPPORT</h3>
                    <p>Get in touch with our expert team anytime you need.</p>
                </div>
                <div className="detail-item">
                    <h3>SECURE PAYMENT</h3>
                    <p>100% secure payment methods and data protection.</p>
                </div>
                <div className="detail-item">
                    <h3>EASY RETURNS</h3>
                    <p>30-day money-back guarantee on all products.</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
