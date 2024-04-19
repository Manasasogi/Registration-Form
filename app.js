const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (Make sure to replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS in this case)
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.send('Registration failed.');
        } else {
            res.send('Registration successful.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
