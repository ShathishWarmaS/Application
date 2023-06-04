const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  const express = require('express');
  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  const app = express();
  
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  
  // Add the MongoDB connection code here
  
  const User = require('./models/user');
  app.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username: username,
        password: hashedPassword
      });
  
      await user.save();
  
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      res.redirect('/signup');
    }
  });
  
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        res.send('Login successful!');
      } else {
        res.send('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.send('An error occurred');
    }
  });
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  