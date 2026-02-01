import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactSection.css';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
            };

            const response = await emailjs.send(
                'service_j46p5a2', // Replace with your EmailJS service ID
                'template_llkv8j2', // Replace with your EmailJS template ID
                templateParams,
                'C69v2ZSVmyQIJLEzO' // Replace with your EmailJS public key
            );

            if (response.status === 200) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact-section">
            <div className="section-title">
                <h2>Contact</h2>
            </div>
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Left side - Contact Info */}
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <a href="mailto:kp6615856@gmail.com">kp6615856@gmail.com</a>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <a href="https://your-website.com" target="_blank" rel="noopener noreferrer">
                                your-website.com
                            </a>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fab fa-facebook"></i>
                            </div>
                            <a href="https://facebook.com/your-profile" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </div>
                    </div>

                    {/* Right side - Contact Form */}
                    <div className="contact-form">
                        <h3>How Can I <span>Help You?!</span></h3>
                        
                        {status === 'success' && (
                            <div className="success-message">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="error-message">
                                Failed to send message. Please try again or contact directly via email.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Full Name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email Address" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="subject"
                                    placeholder="Subject" 
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="message"
                                    placeholder="Message" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className={`send-message ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;