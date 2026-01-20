
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Footer from '../components/Footer';

const Home = () => {
    const [activeTab, setActiveTab] = useState('best-seller');

    const products = [
        { id: "69622711395786e4c6f06fa2", name: "Minimalist Linen Shirt", price: "$49.00", badge: "NEW", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80" },
        { id: "69622711395786e4c6f06fa3", name: "Casual Cotton Chinos", price: "$59.00", badge: "TRENDING", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80" },
        { id: "69622711395786e4c6f06fa4", name: "Summer Silk Dress", price: "$89.00", badge: "NEW", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
        { id: "69622711395786e4c6f06fa5", name: "Modern Wool Blazer", price: "$129.00", badge: "TOP SALE", img: "https://images.unsplash.com/photo-1591366754631-98744c062860?auto=format&fit=crop&w=500&q=80" },
    ];

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
                <div className="arrivals-grid">
                    {products.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image">
                                <span className="badge">{product.badge}</span>
                                <img src={product.img} alt={product.name} />
                            </div>
                            <h3>{product.name}</h3>
                            <p style={{ color: 'var(--olive)', fontWeight: 'bold' }}>{product.price}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* TRENDING NOW (Tabs) */}
            <section className="trending-now" style={{ backgroundColor: '#fdfdfd' }}>
                <h2 className="section-title">Trending Now</h2>
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'best-seller' ? 'active' : ''}`}
                        onClick={() => setActiveTab('best-seller')}
                    >
                        Best Seller
                    </button>
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
                <div className="trending-grid arrivals-grid">
                    {products.slice(0, 3).map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image">
                                <img src={product.img} alt={product.name} />
                            </div>
                            <h3>{product.name}</h3>
                            <p style={{ color: 'var(--olive)', fontWeight: 'bold' }}>{product.price}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* COLLECTION SECTION */}
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
