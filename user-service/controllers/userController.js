const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Error signing up:', err);
    res.redirect('/signup');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error logging in:', err);
    res.redirect('/login');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error('Error getting user by ID:', err);
    res.status(404).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, email },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(404).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(404).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error getting all users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    // Implementation for password reset functionality goes here
    res.send('Forgot password functionality');
  } catch (err) {
    console.error('Error in forgot password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // Implementation for password reset functionality goes here
    res.send('Reset password functionality');
  } catch (err) {
    console.error('Error in reset password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
