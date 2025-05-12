const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { name, email, type } = req.body;
    if (!name || !email || !type) {
        return res.status(400).send('All fields are required.');
    }
    // Mock saving to database
    const user = { id: Date.now(), name, email, type };
    console.log('User registered:', user);
    res.status(201).send('Registration successful');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
