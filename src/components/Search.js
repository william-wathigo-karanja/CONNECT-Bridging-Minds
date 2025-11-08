import React, { useState, useEffect } from 'react';
import './App.css';

const Search = ({ onTherapistSelect }) => {
    const [therapists, setTherapists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Fetch therapists on component mount
    useEffect(() => {
        fetchTherapists();
    }, []);

    const fetchTherapists = async (search = '', specialty = '') => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (specialty) queryParams.append('specialty', specialty);

            const response = await fetch(`http://localhost:5000/api/therapists?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setTherapists(data.therapists);
                if (data.therapists.length === 0) {
                    setMessage('No therapists found matching your criteria.');
                } else {
                    setMessage(`Found ${data.therapists.length} therapist(s)`);
                }
            } else {
                setMessage('Failed to load therapists.');
            }
        } catch (error) {
            setMessage('Error loading therapists. Please try again.');
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTherapists(searchTerm, specialty);
    };

    const handleSpecialtySearch = (selectedSpecialty) => {
        setSpecialty(selectedSpecialty);
        fetchTherapists(searchTerm, selectedSpecialty);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSpecialty('');
        fetchTherapists();
    };

    const handleBookAppointment = (therapist) => {
        if (onTherapistSelect) {
            onTherapistSelect(therapist);
            // Navigate to schedule page
            window.location.href = '/schedule';
        } else {
            alert(`Ready to book with ${therapist.name}! Please go to the Schedule page.`);
        }
    };

    const specialties = [
        'Anxiety & Depression',
        'Relationship Counseling',
        'Trauma & PTSD', 
        'Stress Management',
        'Family Therapy',
        'Child Therapy',
        'Addiction',
        'Couples Counseling'
    ];

    return (
        <div className="search-container">
            <div className="search-header">
                <h2>Find a Therapist</h2>
                <p>Connect with licensed mental health professionals</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search therapists by name, specialty, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button 
                        type="submit" 
                        className="search-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? '🔍 Searching...' : '🔍 Search'}
                    </button>
                </div>
                
                <div className="filter-toggle">
                    <button 
                        type="button" 
                        onClick={() => setShowFilters(!showFilters)}
                        className="filter-toggle-btn"
                    >
                        {showFilters ? '▲ Hide Filters' : '▼ Show Filters'}
                    </button>
                </div>

                {showFilters && (
                    <div className="filters-section">
                        {/* Specialty Quick Filters */}
                        <div className="specialty-section">
                            <h4>Filter by Specialty</h4>
                            <div className="specialty-buttons">
                                {specialties.map((spec) => (
                                    <button
                                        key={spec}
                                        type="button"
                                        className={`specialty-btn ${specialty === spec ? 'active' : ''}`}
                                        onClick={() => handleSpecialtySearch(spec)}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(searchTerm || specialty) && (
                            <div className="active-filters">
                                <span>Active filters:</span>
                                {searchTerm && (
                                    <span className="filter-tag">
                                        Search: "{searchTerm}"
                                        <button onClick={() => setSearchTerm('')}>×</button>
                                    </span>
                                )}
                                {specialty && (
                                    <span className="filter-tag">
                                        Specialty: {specialty}
                                        <button onClick={() => setSpecialty('')}>×</button>
                                    </span>
                                )}
                                <button 
                                    onClick={handleClearFilters}
                                    className="clear-all-btn"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>

            {/* Results Summary */}
            {message && (
                <div className="results-summary">
                    {message}
                </div>
            )}

            {/* Therapists Grid */}
            <div className="therapists-grid">
                {isLoading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Searching for therapists...</p>
                    </div>
                ) : therapists.length > 0 ? (
                    therapists.map((therapist) => (
                        <div key={therapist.id} className="therapist-card">
                            <div className="therapist-header">
                                <h3 className="therapist-name">{therapist.name}</h3>
                                <div className="rating">
                                    ⭐ {therapist.rating}/5
                                </div>
                            </div>
                            
                            <div className="therapist-specialty">
                                <strong>Specialty:</strong> {therapist.specialty}
                            </div>
                            
                            <div className="therapist-experience">
                                <strong>Experience:</strong> {therapist.experience}
                            </div>
                            
                            <div className="therapist-bio">
                                <p>{therapist.bio}</p>
                            </div>
                            
                            <div className="therapist-actions">
                                <button 
                                    className="book-btn primary"
                                    onClick={() => handleBookAppointment(therapist)}
                                >
                                    📅 Book Appointment
                                </button>
                                <button 
                                    className="book-btn secondary"
                                    onClick={() => {
                                        // View profile functionality
                                        alert(`Viewing ${therapist.name}'s full profile`);
                                    }}
                                >
                                    👁️ View Profile
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No therapists found</h3>
                        <p>Try adjusting your search criteria or filters.</p>
                        <button 
                            onClick={handleClearFilters}
                            className="clear-search-btn"
                        >
                            Clear Search & Show All
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            {therapists.length > 0 && (
                <div className="quick-actions">
                    <h4>Need help choosing?</h4>
                    <div className="action-buttons">
                        <button className="action-btn">
                            💬 Chat with Support
                        </button>
                        <button className="action-btn">
                            📞 Call Help Line
                        </button>
                        <button className="action-btn">
                            ❓ Matching Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;