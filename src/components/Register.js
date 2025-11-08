import React, { useState } from 'react';
import './App.css';

const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'client'
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage(`✅ ${data.message} Welcome, ${data.user.name}!`);
                // Call the onLogin callback with user data
                if (onLogin) {
                    onLogin(data.user);
                }
                // Reset form
                setFormData({ name: '', email: '', type: 'client' });
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage('❌ Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">I am a *</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="client">Client</option>
                        <option value="therapist">Therapist</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'REGISTER'}
                </button>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>

            <div className="register-info">
                <h3>Why Register?</h3>
                <div className="benefits">
                    <div className="benefit">
                        <strong>For Clients:</strong>
                        <ul>
                            <li>✓ Find verified therapists</li>
                            <li>✓ Schedule appointments easily</li>
                            <li>✓ Secure and private sessions</li>
                        </ul>
                    </div>
                    <div className="benefit">
                        <strong>For Therapists:</strong>
                        <ul>
                            <li>✓ Reach more clients</li>
                            <li>✓ Manage your schedule</li>
                            <li>✓ Grow your practice</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;