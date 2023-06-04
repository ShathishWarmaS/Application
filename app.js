// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Import the User model

// Create an Express application
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shathishwarma:B6YJ9siF1KRPMmTT@ecommerce.vt6lhcu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define the User model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      });
      await user.save();
      res.redirect('/login');
    } catch (err) {
      console.error('Error signing up:', err);
      res.redirect('/signup');
    }
  });

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        throw new Error('Invalid username or password');
      }
      const isPasswordValid = await user.comparePassword(req.body.password);
      if (!isPasswordValid) {
        throw new Error('Invalid username or password');
      }
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error logging in:', err);
      res.redirect('/login');
    }
  });
// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
