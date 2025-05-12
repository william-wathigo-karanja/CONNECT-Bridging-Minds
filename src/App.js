import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Search from './components/Search';
import Schedule from './components/Schedule';
import About from './components/About';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './App.css';

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        CONNECT: Bridging Minds
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/search">Search Therapists</Button>
                    <Button color="inherit" component={Link} to="/schedule">Schedule Appointment</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <main>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </Container>
        </Router>
    );
};

export default App;
