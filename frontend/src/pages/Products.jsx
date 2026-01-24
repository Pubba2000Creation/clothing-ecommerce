
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/Products.css';
import Footer from '../components/Footer';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Filter states
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [limit, setLimit] = useState(9);

    const categories = ['Men', 'Women', 'Kids'];

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                search: search || undefined,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
                category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined
            };

            const response = await api.get('/products', { params });

            if (response.data.success) {
                setProducts(response.data.data.items);
                setTotalPages(response.data.data.pagination.totalPages);
                setTotalProducts(response.data.data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, minPrice, maxPrice, selectedCategories]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchProducts]);

    const handleCategoryChange = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
        setPage(1); // Reset to first page on filter change
    };

    const handlePriceChange = () => {
        setPage(1);
    };

    return (
        <div className="products-container">
            <div className="products-page">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Search</h3>
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Find something..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            />
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Categories</h3>
                        <div className="category-list">
                            {categories.map(cat => (
                                <label key={cat} className="category-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Price Range</h3>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => { setMinPrice(e.target.value); handlePriceChange(); }}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(e.target.value); handlePriceChange(); }}
                            />
                        </div>
                    </div>
                </aside>

                {/* Products Section */}
                <main className="products-content">
                    <div className="products-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: '#666' }}>Showing {products.length} of {totalProducts} products</p>
                        <select
                            value={limit}
                            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option value={9}>Show 9</option>
                            <option value={18}>Show 18</option>
                            <option value={36}>Show 36</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="no-products">Loading products...</div>
                    ) : products.length > 0 ? (
                        <>
                            <div className="products-grid">
                                {products.map(product => (
                                    <Link key={product._id} to={`/product/${product._id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="product-image">
                                            <img src={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} alt={product.name} />
                                        </div>
                                        <h3 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--olive)', fontWeight: '700' }}>${product.price ? product.price.toFixed(2) : '0.00'}</p>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination-container">
                                    <button
                                        className="page-btn"
                                        disabled={page === 1}
                                        onClick={() => setPage(prev => prev - 1)}
                                    >
                                        &lsaquo;
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="page-btn"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(prev => prev + 1)}
                                    >
                                        &rsaquo;
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-products">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <p>No products found matching your criteria.</p>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
