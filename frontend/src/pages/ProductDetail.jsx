
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/ProductDetail.css';
import Footer from '../components/Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products/${id}`);
                if (response.data.success) {
                    setProduct(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.response?.data?.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        // console.log('Adding to cart:', { productId: product._id, size: selectedSize, quantity });
        // In real app, call cart API here
    };

    if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '10rem' }}>Loading product details...</div>;

    if (error) return (
        <div className="error-container" style={{ textAlign: 'center', padding: '10rem' }}>
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/products')} className="btn-primary" style={{ marginTop: '2rem' }}>Back to Shop</button>
        </div>
    );

    if (!product) return null;

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* Left Side: Images */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.imageUrl || 'https://via.placeholder.com/600x800?text=No+Image'} alt={product.name} />
                    </div>
                </div>

                {/* Right Side: Info */}
                <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-description">
                        {product.description || "Indulge in the perfect blend of style and comfort. This premium piece is meticulously crafted from high-quality fabrics, designed to offer a timeless silhouette for any occasion."}
                    </p>

                    {/* Size Selection */}
                    <div className="size-selection">
                        <h3>Select Size</h3>
                        <div className="size-options">
                            {product.sizes && product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="add-to-cart-container">
                        <div className="quantity-selector">
                            <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span className="quantity-value">{quantity}</span>
                            <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button className="add-btn" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                    </div>

                    <div className="product-features">
                        <div className="feature-item">
                            <span style={{ fontSize: '1.2rem' }}>🚚</span>
                            <span>Free shipping on orders over $99</span>
                        </div>
                        <div className="feature-item">
                            <span style={{ fontSize: '1.2rem' }}>🔄</span>
                            <span>30-day easy returns policy</span>
                        </div>
                        <div className="feature-item">
                            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                            <span>Secure checkout & durable quality</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
