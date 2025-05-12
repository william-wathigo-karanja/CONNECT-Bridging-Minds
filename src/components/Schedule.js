import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Schedule = () => {
    const [therapist, setTherapist] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSchedule = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ therapist, date, time })
            });
            if (!response.ok) throw new Error('Scheduling failed');
            const message = await response.text();
            setConfirmation(message);
            setError('');
        } catch (err) {
            setError(err.message);
            setConfirmation('');
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2">Schedule an Appointment</Typography>
                <form onSubmit={handleSchedule}>
                    <TextField
                        label="Select Therapist"
                        value={therapist}
                        onChange={(e) => setTherapist(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Schedule
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {confirmation && <Typography color="success" sx={{ mt: 2 }}>{confirmation}</Typography>}
                </form>
            </Box>
        </Container>
    );
};

export default Schedule;
