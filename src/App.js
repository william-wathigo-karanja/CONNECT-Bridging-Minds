import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Search from './components/Search';
import Schedule from './components/Schedule';
import About from './components/About';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [selectedTherapist, setSelectedTherapist] = useState(null);

    // Check if user data exists in localStorage on app start
    useEffect(() => {
        const savedUser = localStorage.getItem('connectUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        
        // Seed therapists on app start (for demo purposes)
        seedTherapists();
    }, []);

    const seedTherapists = async () => {
        try {
            await fetch('http://localhost:5000/api/seed-therapists', {
                method: 'POST'
            });
            console.log('Sample therapists seeded');
        } catch (error) {
            console.log('Therapists already seeded or server not running');
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('connectUser', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        setSelectedTherapist(null);
        localStorage.removeItem('connectUser');
    };

    const handleTherapistSelect = (therapist) => {
        setSelectedTherapist(therapist);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        CONNECT: Bridging Minds
                    </Typography>
                    
                    {user && (
                        <Chip 
                            label={`Welcome, ${user.name}`} 
                            variant="outlined" 
                            style={{ color: 'white', borderColor: 'white', marginRight: '10px' }}
                        />
                    )}
                    
                    <Button color="inherit" component={Link} to="/">
                        {user ? 'Dashboard' : 'Home'}
                    </Button>
                    <Button color="inherit" component={Link} to="/search">
                        Find Therapists
                    </Button>
                    <Button color="inherit" component={Link} to="/schedule">
                        Schedule
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                    
                    {user ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            
            <Container>
                <main style={{ marginTop: '20px' }}>
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                user ? (
                                    <div className="dashboard">
                                        <h2>Welcome back, {user.name}!</h2>
                                        <p>You are logged in as a <strong>{user.type}</strong>.</p>
                                        <div className="dashboard-actions">
                                            <Button 
                                                variant="contained" 
                                                component={Link} 
                                                to="/search"
                                                style={{ marginRight: '10px' }}
                                            >
                                                Find Therapists
                                            </Button>
                                            <Button 
                                                variant="outlined" 
                                                component={Link} 
                                                to="/schedule"
                                            >
                                                Schedule Appointment
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Register onLogin={handleLogin} />
                                )
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={<Register onLogin={handleLogin} />} 
                        />
                        <Route 
                            path="/search" 
                            element={<Search onTherapistSelect={handleTherapistSelect} />} 
                        />
                        <Route 
                            path="/schedule" 
                            element={
                                <Schedule 
                                    selectedTherapist={selectedTherapist}
                                    user={user}
                                />
                            } 
                        />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </Container>
        </Router>
    );
};

export default App;