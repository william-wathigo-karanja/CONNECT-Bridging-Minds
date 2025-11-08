const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage (replace with database later)
let users = [];
let therapists = [];
let appointments = [];

// Routes

// User Registration
app.post('/api/register', (req, res) => {
    const { name, email, type } = req.body;
    
    if (!name || !email || !type) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required.' 
        });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists with this email.'
        });
    }

    const user = { 
        id: Date.now(), 
        name, 
        email, 
        type,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    // If registering as therapist, add to therapists list
    if (type === 'therapist') {
        const therapist = {
            ...user,
            specialty: '',
            bio: '',
            experience: '',
            rating: 0,
            availableSlots: []
        };
        therapists.push(therapist);
    }

    console.log('User registered:', user);
    res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: { id: user.id, name: user.name, type: user.type }
    });
});

// Therapist Search
app.get('/api/therapists', (req, res) => {
    const { specialty, search } = req.query;
    
    let filteredTherapists = therapists;
    
    // Filter by specialty
    if (specialty) {
        filteredTherapists = filteredTherapists.filter(
            therapist => therapist.specialty?.toLowerCase().includes(specialty.toLowerCase())
        );
    }
    
    // Filter by search term (name or bio)
    if (search) {
        filteredTherapists = filteredTherapists.filter(
            therapist => 
                therapist.name.toLowerCase().includes(search.toLowerCase()) ||
                therapist.bio.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({
        success: true,
        therapists: filteredTherapists.map(t => ({
            id: t.id,
            name: t.name,
            specialty: t.specialty,
            bio: t.bio,
            experience: t.experience,
            rating: t.rating
        }))
    });
});

// Schedule Appointment
app.post('/api/appointments', (req, res) => {
    const { therapistId, clientId, date, time, clientName, clientEmail } = req.body;
    
    if (!therapistId || !date || !time || !clientName) {
        return res.status(400).json({
            success: false,
            message: 'Therapist ID, date, time, and client name are required.'
        });
    }

    const therapist = therapists.find(t => t.id === parseInt(therapistId));
    if (!therapist) {
        return res.status(404).json({
            success: false,
            message: 'Therapist not found.'
        });
    }

    const appointment = {
        id: Date.now(),
        therapistId: parseInt(therapistId),
        therapistName: therapist.name,
        clientId: clientId || null,
        clientName,
        clientEmail: clientEmail || '',
        date,
        time,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    appointments.push(appointment);
    
    console.log('Appointment scheduled:', appointment);
    res.status(201).json({
        success: true,
        message: 'Appointment scheduled successfully',
        appointment: {
            id: appointment.id,
            therapistName: appointment.therapistName,
            date: appointment.date,
            time: appointment.time
        }
    });
});

// Get user appointments
app.get('/api/appointments/:userId', (req, res) => {
    const { userId } = req.params;
    const userAppointments = appointments.filter(
        apt => apt.clientId === parseInt(userId) || apt.therapistId === parseInt(userId)
    );
    
    res.json({
        success: true,
        appointments: userAppointments
    });
});

// Add sample therapists for testing
app.post('/api/seed-therapists', (req, res) => {
    const sampleTherapists = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@therapy.com',
            type: 'therapist',
            specialty: 'Anxiety & Depression',
            bio: 'Licensed clinical psychologist with 10 years of experience specializing in anxiety disorders.',
            experience: '10 years',
            rating: 4.8
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            email: 'michael.chen@therapy.com',
            type: 'therapist',
            specialty: 'Relationship Counseling',
            bio: 'Marriage and family therapist focused on helping couples build stronger relationships.',
            experience: '8 years',
            rating: 4.9
        },
        {
            id: 3,
            name: 'Dr. Maria Garcia',
            email: 'maria.garcia@therapy.com',
            type: 'therapist',
            specialty: 'Trauma & PTSD',
            bio: 'Trauma-informed therapist specializing in EMDR and cognitive behavioral therapy.',
            experience: '12 years',
            rating: 4.7
        }
    ];

    therapists.push(...sampleTherapists);
    users.push(...sampleTherapists);
    
    res.json({
        success: true,
        message: 'Sample therapists added successfully',
        count: sampleTherapists.length
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'CONNECT API is running successfully',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`CONNECT server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Add sample therapists: POST http://localhost:${PORT}/api/seed-therapists`);
});