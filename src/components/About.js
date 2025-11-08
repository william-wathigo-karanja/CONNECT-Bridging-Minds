import React from 'react';
import './App.css';

const About = () => {
    const teamMembers = [
        {
            name: 'Dr. Sarah Mitchell',
            role: 'Clinical Director',
            bio: 'Licensed psychologist with 15+ years of experience in mental health technology and teletherapy.',
            specialty: 'Digital Mental Health'
        },
        {
            name: 'Michael Chen',
            role: 'Technical Lead',
            bio: 'Software engineer passionate about creating accessible mental health solutions through technology.',
            specialty: 'Health Tech Innovation'
        },
        {
            name: 'Dr. Maria Rodriguez',
            role: 'Therapist Relations',
            bio: 'Former clinician dedicated to connecting therapists with clients in the digital space.',
            specialty: 'Clinical Partnerships'
        },
        {
            name: 'Emily Johnson',
            role: 'User Experience',
            bio: 'UX designer focused on creating compassionate and intuitive mental health platforms.',
            specialty: 'User-Centered Design'
        }
    ];

    const statistics = [
        { number: '10,000+', label: 'Users Helped' },
        { number: '500+', label: 'Verified Therapists' },
        { number: '50+', label: 'Specialties Covered' },
        { number: '98%', label: 'User Satisfaction' }
    ];

    const values = [
        {
            icon: '🔒',
            title: 'Privacy First',
            description: 'Your conversations and data are encrypted and protected with enterprise-level security measures.'
        },
        {
            icon: '🤝',
            title: 'Trust & Transparency',
            description: 'All therapists are verified, licensed professionals with proven credentials and experience.'
        },
        {
            icon: '🌍',
            title: 'Accessibility',
            description: 'Making quality mental health care available to everyone, regardless of location or background.'
        },
        {
            icon: '❤️',
            title: 'Compassionate Care',
            description: 'We believe in treating every individual with empathy, respect, and understanding.'
        }
    ];

    const faqs = [
        {
            question: 'How do I know if a therapist is right for me?',
            answer: 'You can browse therapist profiles, read about their specialties and approach, and even schedule a brief introductory call with many of our providers.'
        },
        {
            question: 'Is online therapy effective?',
            answer: 'Yes! Numerous studies show that online therapy can be just as effective as in-person sessions for many mental health concerns.'
        },
        {
            question: 'What if I need to cancel or reschedule?',
            answer: 'You can cancel or reschedule appointments up to 24 hours in advance through your dashboard with no penalty.'
        },
        {
            question: 'Is my information kept confidential?',
            answer: 'Absolutely. We use end-to-end encryption and comply with all healthcare privacy regulations (HIPAA) to protect your information.'
        }
    ];

    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1>About CONNECT: Bridging Minds</h1>
                    <p className="hero-subtitle">
                        Transforming mental health care through technology, compassion, and connection
                    </p>
                    <div className="hero-stats">
                        {statistics.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <div className="mission-text">
                        <p>
                            At <strong>CONNECT: Bridging Minds</strong>, we believe that everyone deserves 
                            access to quality mental health care. Our platform was founded on the principle 
                            that technology should bring people together, not keep them apart.
                        </p>
                        <p>
                            We're dedicated to breaking down barriers to mental health care by creating 
                            a seamless, secure, and supportive environment where clients and therapists 
                            can connect, communicate, and work toward better mental health together.
                        </p>
                    </div>
                    
                    <div className="mission-highlights">
                        <div className="highlight-card">
                            <div className="highlight-icon">🎯</div>
                            <h3>Our Vision</h3>
                            <p>
                                A world where mental health care is accessible, affordable, 
                                and available to anyone who needs it, whenever they need it.
                            </p>
                        </div>
                        <div className="highlight-card">
                            <div className="highlight-icon">🚀</div>
                            <h3>Our Approach</h3>
                            <p>
                                Leveraging technology to create meaningful connections between 
                                those seeking help and the professionals who provide it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <h2>Our Values</h2>
                <div className="values-grid">
                    {values.map((value, index) => (
                        <div key={index} className="value-card">
                            <div className="value-icon">{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <h2>How CONNECT Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Create Your Profile</h3>
                            <p>Sign up as a client seeking support or as a therapist ready to help.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Find Your Match</h3>
                            <p>Browse verified therapists by specialty, approach, and availability.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Schedule Sessions</h3>
                            <p>Book appointments that fit your schedule with our easy booking system.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Begin Your Journey</h3>
                            <p>Connect with your therapist through secure video sessions and messaging.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p className="team-intro">
                    We're a diverse group of clinicians, technologists, and mental health 
                    advocates united by a common mission.
                </p>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="team-avatar">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3>{member.name}</h3>
                            <div className="team-role">{member.role}</div>
                            <div className="team-specialty">{member.specialty}</div>
                            <p className="team-bio">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h3>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Begin Your Mental Health Journey?</h2>
                    <p>
                        Join thousands of others who have found support and healing through CONNECT.
                    </p>
                    <div className="cta-buttons">
                        <button 
                            className="cta-btn primary"
                            onClick={() => window.location.href = '/register'}
                        >
                            Get Started Today
                        </button>
                        <button 
                            className="cta-btn secondary"
                            onClick={() => window.location.href = '/search'}
                        >
                            Browse Therapists
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="contact-section">
                <h2>Get In Touch</h2>
                <div className="contact-info">
                    <div className="contact-item">
                        <strong>📧 Email:</strong> support@connectbridgingminds.com
                    </div>
                    <div className="contact-item">
                        <strong>📞 Phone:</strong> 1-800-CONNECT
                    </div>
                    <div className="contact-item">
                        <strong>🕒 Support Hours:</strong> 24/7 Crisis Support Available
                    </div>
                </div>
                <div className="emergency-notice">
                    <h4>🚨 Emergency Resources</h4>
                    <p>
                        If you're in crisis or experiencing a mental health emergency, 
                        please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room. 
                        CONNECT is not a crisis service.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;