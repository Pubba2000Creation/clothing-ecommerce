
import React from 'react';
import '../styles/About.css';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>OUR STORY</h1>
            </section>

            <section className="story-section">
                <div className="story-image">
                    <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" alt="Our Workshop" />
                </div>
                <div className="story-content">
                    <h2>Crafting Quality Since 2010</h2>
                    <p>
                        LUMINARY began with a simple idea: that premium quality shouldn't come with an inaccessible price tag.
                        Founded in the heart of the city, we started as a small workshop dedicated to artisanal techniques
                        and sustainable materials.
                    </p>
                    <p>
                        Today, we continue that legacy by blending traditional craftsmanship with modern design.
                        Every piece in our collection is a testament to our commitment to durability, comfort, and
                        timeless style. We believe that what you wear is an extension of who you are.
                    </p>
                </div>
            </section>

            <section className="values-section">
                <h2 className="section-title">Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <span className="value-icon">🌿</span>
                        <h3>Sustainability</h3>
                        <p>We use eco-friendly materials and ethical production processes to minimize our footprint.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">🧵</span>
                        <h3>Craftsmanship</h3>
                        <p>Attention to detail in every stitch, ensuring longevity and premium feel in every garment.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">🤝</span>
                        <h3>Community</h3>
                        <p>We work closely with local artisans and support the communities that help us grow.</p>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2 className="section-title">Meet the Visionaries</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" alt="Founder" />
                        <h3>Elena Rossi</h3>
                        <p>Creative Director</p>
                    </div>
                    <div className="team-member">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" alt="Lead Designer" />
                        <h3>Marcus Chen</h3>
                        <p>Lead Designer</p>
                    </div>
                    <div className="team-member">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" alt="Sustainability" />
                        <h3>Sarah Jenkins</h3>
                        <p>Sustainability Expert</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
