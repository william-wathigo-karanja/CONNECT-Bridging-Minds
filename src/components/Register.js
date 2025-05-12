import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Container, Box } from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('client');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, type })
            });
            if (!response.ok) throw new Error('Registration failed');
            const message = await response.text();
            setSuccess(message);
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2">Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="I am a"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="therapist">Therapist</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
                </form>
            </Box>
        </Container>
    );
};

export default Register;
