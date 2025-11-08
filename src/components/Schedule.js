import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Schedule = ({ selectedTherapist, user }) => {
    const [formData, setFormData] = useState({
        therapistId: '',
        clientName: '',
        clientEmail: '',
        date: '',
        time: '',
        notes: ''
    });
    const [therapists, setTherapists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isFetchingTherapists, setIsFetchingTherapists] = useState(true);
    const navigate = useNavigate();

    // Load therapists and pre-fill form if therapist is selected
    useEffect(() => {
        fetchTherapists();
        
        if (selectedTherapist) {
            setFormData(prev => ({
                ...prev,
                therapistId: selectedTherapist.id.toString(),
                clientName: user?.name || '',
                clientEmail: user?.email || ''
            }));
        }
        
        if (user) {
            setFormData(prev => ({
                ...prev,
                clientName: user.name,
                clientEmail: user.email
            }));
        }
    }, [selectedTherapist, user]);

    const fetchTherapists = async () => {
        setIsFetchingTherapists(true);
        try {
            const response = await fetch('http://localhost:5000/api/therapists');
            const data = await response.json();
            
            if (data.success) {
                setTherapists(data.therapists);
            } else {
                setMessage('❌ Failed to load therapists. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching therapists:', error);
            setMessage('❌ Error loading therapists. Please check your connection.');
        } finally {
            setIsFetchingTherapists(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // If therapist changes, clear date and time
        if (name === 'therapistId') {
            setFormData(prev => ({
                ...prev,
                therapistId: value,
                date: '',
                time: ''
            }));
            setAvailableSlots([]);
        }

        // If date changes, generate available time slots
        if (name === 'date' && value) {
            generateAvailableTimeSlots(value);
        }
    };

    const generateAvailableTimeSlots = (selectedDate) => {
        // Mock available slots - in real app, this would come from therapist's availability
        const baseSlots = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
        ];
        
        // Filter out some random slots to simulate booked appointments
        const available = baseSlots.filter((_, index) => Math.random() > 0.3);
        setAvailableSlots(available);
        
        // Clear selected time if no longer available
        if (formData.time && !available.includes(formData.time)) {
            setFormData(prev => ({ ...prev, time: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setMessage('❌ Please register or login first to schedule an appointment.');
            setTimeout(() => navigate('/register'), 2000);
            return;
        }

        // Validate form
        if (!formData.therapistId || !formData.date || !formData.time) {
            setMessage('❌ Please select a therapist, date, and time.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        const appointmentData = {
            ...formData,
            clientId: user.id,
            therapistId: parseInt(formData.therapistId)
        };

        try {
            const response = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage(`✅ ${data.message} Your appointment with ${data.appointment.therapistName} is scheduled for ${formatDate(data.appointment.date)} at ${data.appointment.time}`);
                
                // Reset form
                setFormData({
                    therapistId: '',
                    clientName: user.name,
                    clientEmail: user.email,
                    date: '',
                    time: '',
                    notes: ''
                });
                setAvailableSlots([]);
                
                // Redirect to home after success
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage('❌ Failed to schedule appointment. Please try again.');
            console.error('Appointment error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3); // 3 months in advance
        return maxDate.toISOString().split('T')[0];
    };

    const getSelectedTherapist = () => {
        return therapists.find(t => t.id === parseInt(formData.therapistId));
    };

    const isWeekend = (dateString) => {
        const date = new Date(dateString);
        return date.getDay() === 0 || date.getDay() === 6; // 0 = Sunday, 6 = Saturday
    };

    return (
        <div className="schedule-container">
            <div className="schedule-header">
                <h2>Schedule an Appointment</h2>
                <p>Book your session with a qualified mental health professional</p>
            </div>
            
            {!user && (
                <div className="warning-message">
                    <div className="warning-icon">⚠️</div>
                    <h4>Authentication Required</h4>
                    <p>Please register or login to schedule an appointment.</p>
                    <button 
                        onClick={() => navigate('/register')}
                        className="auth-btn"
                    >
                        Go to Registration
                    </button>
                </div>
            )}

            {selectedTherapist && (
                <div className="selected-therapist-banner">
                    <h4>Selected Therapist</h4>
                    <div className="therapist-quick-info">
                        <strong>{selectedTherapist.name}</strong> - {selectedTherapist.specialty}
                        <span className="rating">⭐ {selectedTherapist.rating}/5</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="schedule-form">
                {/* Therapist Selection */}
                <div className="form-section">
                    <h4>1. Select Therapist</h4>
                    <div className="form-group">
                        <label htmlFor="therapistId">Therapist *</label>
                        <select
                            id="therapistId"
                            name="therapistId"
                            value={formData.therapistId}
                            onChange={handleChange}
                            required
                            disabled={!user || isFetchingTherapists}
                        >
                            <option value="">-- Choose a therapist --</option>
                            {therapists.map((therapist) => (
                                <option key={therapist.id} value={therapist.id}>
                                    {therapist.name} - {therapist.specialty} ({therapist.experience})
                                </option>
                            ))}
                        </select>
                        {isFetchingTherapists && (
                            <div className="loading-text">Loading therapists...</div>
                        )}
                    </div>
                </div>

                {/* Client Information */}
                <div className="form-section">
                    <h4>2. Your Information</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="clientName">Full Name *</label>
                            <input
                                type="text"
                                id="clientName"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                required
                                disabled={!user}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientEmail">Email Address *</label>
                            <input
                                type="email"
                                id="clientEmail"
                                name="clientEmail"
                                value={formData.clientEmail}
                                onChange={handleChange}
                                required
                                disabled={!user}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                </div>

                {/* Appointment Details */}
                <div className="form-section">
                    <h4>3. Appointment Details</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={getTomorrowDate()}
                                max={getMaxDate()}
                                disabled={!user || !formData.therapistId}
                            />
                            {formData.date && isWeekend(formData.date) && (
                                <div className="weekend-warning">
                                    ⚠️ Weekend appointment - may have different rates
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time *</label>
                            <select
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                disabled={!user || !formData.date || availableSlots.length === 0}
                            >
                                <option value="">-- Select time --</option>
                                {availableSlots.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            {formData.date && availableSlots.length === 0 && (
                                <div className="no-slots-message">
                                    No available slots for this date
                                </div>
                            )}
                            {formData.date && availableSlots.length > 0 && (
                                <div className="slots-available">
                                    {availableSlots.length} slot(s) available
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="form-section">
                    <h4>4. Additional Information (Optional)</h4>
                    <div className="form-group">
                        <label htmlFor="notes">Session Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            disabled={!user}
                            placeholder="Any specific concerns or preferences for this session..."
                            rows="4"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-btn large"
                        disabled={isLoading || !user}
                    >
                        {isLoading ? (
                            <>
                                <div className="button-spinner"></div>
                                Scheduling...
                            </>
                        ) : (
                            '📅 SCHEDULE APPOINTMENT'
                        )}
                    </button>
                    
                    {user && !formData.therapistId && (
                        <div className="form-hint">
                            💡 First, select a therapist from the list above
                        </div>
                    )}
                </div>

                {/* Messages */}
                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                        {message.includes('✅') && (
                            <div className="success-details">
                                You will be redirected to the home page shortly...
                            </div>
                        )}
                    </div>
                )}
            </form>

            {/* Appointment Summary Preview */}
            {formData.therapistId && formData.date && formData.time && (
                <div className="appointment-preview">
                    <h4>Appointment Summary</h4>
                    <div className="preview-card">
                        <div className="preview-item">
                            <strong>Therapist:</strong> {getSelectedTherapist()?.name}
                        </div>
                        <div className="preview-item">
                            <strong>Specialty:</strong> {getSelectedTherapist()?.specialty}
                        </div>
                        <div className="preview-item">
                            <strong>Date:</strong> {formatDate(formData.date)}
                        </div>
                        <div className="preview-item">
                            <strong>Time:</strong> {formData.time}
                        </div>
                        <div className="preview-item">
                            <strong>Duration:</strong> 50 minutes
                        </div>
                        <div className="preview-item">
                            <strong>Session Type:</strong> Video Call
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions">
                <h4>Need Help?</h4>
                <div className="action-buttons">
                    <button 
                        className="action-btn"
                        onClick={() => navigate('/search')}
                    >
                        🔍 Find Another Therapist
                    </button>
                    <button 
                        className="action-btn"
                        onClick={() => window.open('tel:+1-800-HELP', '_self')}
                    >
                        📞 Emergency Help Line
                    </button>
                    <button 
                        className="action-btn"
                        onClick={() => alert('Our support team will contact you shortly.')}
                    >
                        💬 Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Schedule;