import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    LUMINARY
                </Link>
            </div>

            <button
                className="mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
            >
                ☰
            </button>

            <div className="navbar-center">
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Shop</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </div>
            </div>

            <div className="navbar-actions">
                <Link to="/cart" className="cart-icon" aria-label="Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {/* <span className="cart-badge">0</span> */}
                </Link>

                {isAuthenticated ? (
                    <div className="user-menu">
                        <span className="user-name" style={{ marginRight: '1rem', fontWeight: 500 }}>
                            {user?.name || 'User'}
                        </span>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="btn-secondary">Login</Link>
                        <Link to="/register" className="btn-primary">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
