
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-logo">LUMINARY</h2>
                    <p>Elevate your style with our curated collection of premium clothing. Quality meets comfort in every stitch.</p>
                    <div className="socials">
                        <span>FB</span>
                        <span>IG</span>
                        <span>TW</span>
                        <span>PN</span>
                    </div>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Shop</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section help">
                    <h3>Customer Support</h3>
                    <ul>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/shipping">Shipping Policy</a></li>
                        <li><a href="/returns">Returns & Exchanges</a></li>
                        <li><a href="/track">Track Order</a></li>
                    </ul>
                </div>

                <div className="footer-section newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to get special offers and once-in-a-lifetime deals.</p>
                    <form className="subscribe-form">
                        <input type="email" placeholder="Your email address" />
                        <button type="submit">JOIN</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 LUMINARY Clothing. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
