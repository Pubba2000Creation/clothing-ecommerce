import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useCart } from '../context/useCart';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar-wrapper">
            {/* Top Promotion Bar */}
            <div className="top-bar">
                <p>FREE SHIPPING ON ALL ORDERS OVER $99*</p>
            </div>

            <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-logo">
                            LUMINARY
                        </Link>
                    </div>

                    <div className="navbar-center">
                        <div className="navbar-links">
                            <Link to="/" className="nav-link">HOME</Link>
                            <Link to="/products" className="nav-link">SHOP</Link>
                            <Link to="/about" className="nav-link">ABOUT US</Link>
                            <Link to="/contact" className="nav-link">CONTACT</Link>
                        </div>
                    </div>

                    <div className="navbar-actions">
                        {/* Search Icon */}
                        <button className="action-icon" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>

                        {/* Wishlist Icon */}
                        <button className="action-icon" aria-label="Wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>

                        {/* Cart Icon */}
                        <Link to="/cart" className="action-icon cart-icon" aria-label="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        {isAuthenticated ? (
                            <div className="user-profile">
                                <span className="user-initials">{user?.name ? user.name[0].toUpperCase() : 'U'}</span>
                                <button onClick={handleLogout} className="logout-simple">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="action-icon" aria-label="User Account">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </Link>
                        )}

                        <button
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
