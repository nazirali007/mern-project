const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require('./userData.js/userData');
const insertUser = require('./models/insertUser/InsertUser');
const blogRoutes = require('./routes/blogRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// GET users route to fetch all users from MongoDB
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// POST users route to insert a new user into the database
app.post('/users', async (req, res) => {
    try {
        await insertUser(); // Call insertUser to insert new users into the database
        res.status(201).json({ message: 'Users created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting users', error });
    }
});

// server.js (Backend)
let users = [];

// Endpoint to receive form data and add a new user
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = { name, email, age };
    users.push(newUser);

    res.json(newUser);
});

const mongoURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// default routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to get user by email
app.get('/users/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await UserData.findOne({ email });

        if (!UserData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(UserData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Use the blog routes under the '/posts' path
app.use('/posts', blogRoutes);

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
