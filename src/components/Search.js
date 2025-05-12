import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Search = () => {
    const [specialty, setSpecialty] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/search?specialty=${specialty}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setResults(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setResults([]);
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2">Find a Therapist</Typography>
                <form onSubmit={handleSearch}>
                    <TextField
                        label="Specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Search
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </form>
                <Box sx={{ mt: 4 }}>
                    {results.map((therapist, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography>Name: {therapist.name}</Typography>
                            <Typography>Specialty: {therapist.specialty}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Search;

