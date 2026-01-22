
import React, { useState } from 'react';
import '../styles/Contact.css';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        // In real app, call API here
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1>GET IN TOUCH</h1>
            </section>

            <div className="contact-container">
                <aside className="contact-info">
                    <div className="info-card">
                        <h3>Our Flagship Store</h3>
                        <p>123 Fashion Avenue, Suite 456<br />Luminary Heights, NY 10001</p>
                    </div>
                    <div className="info-card">
                        <h3>Customer Support</h3>
                        <p>Emails: support@luminary.com<br />Phone: +1 (555) 123-4567</p>
                    </div>
                    <div className="info-card">
                        <h3>Follow Us</h3>
                        <p>Join our community on Instagram, Pinterest, and TikTok for daily inspiration.</p>
                    </div>
                </aside>

                <main className="contact-form-container">
                    {submitted ? (
                        <div className="success-message" style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                            <h2>Message Sent!</h2>
                            <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                            <button
                                className="submit-btn"
                                style={{ marginTop: '2rem', width: 'auto' }}
                                onClick={() => setSubmitted(false)}
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2>Send us a message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Inquiry about..."
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn shadow-vibrant">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </>
                    )}
                </main>
            </div>

            <div className="map-container">
                {/* Embed an actual Google Map iframe here for a real production app */}
                <p>INTERACTIVE MAP VIEW</p>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
