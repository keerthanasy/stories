const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// In-memory user storage as fallback
let inMemoryUsers = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret@1912', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Try MongoDB first
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.json({ message: 'Signup successful!' });
    } catch (mongoError) {
      // Fallback to in-memory storage
      const existingUser = inMemoryUsers.find(u => u.email === email);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        bio: '',
        website: '',
        location: '',
        avatar: '',
        createdAt: new Date()
      };

      inMemoryUsers.push(newUser);
      res.json({ message: 'Signup successful! (Using demo mode)' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Try MongoDB first
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret@1912', { expiresIn: '1h' });

      res.json({ message: 'Login successful!', token });
    } catch (mongoError) {
      // Fallback to in-memory storage
      const user = inMemoryUsers.find(u => u.email === email);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret@1912', { expiresIn: '1h' });

      res.json({ message: 'Login successful! (Demo mode)', token });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Try MongoDB first
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (mongoError) {
      // Fallback to in-memory storage
      const user = inMemoryUsers.find(u => u._id === req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, bio, website, location } = req.body;
    
    // Try MongoDB first
    try {
      // Check if email is being changed and if it's already taken
      if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: req.user.userId } });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email, bio, website, location },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (mongoError) {
      // Fallback to in-memory storage
      const userIndex = inMemoryUsers.findIndex(u => u._id === req.user.userId);
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if email is being changed and if it's already taken
      if (email) {
        const existingUser = inMemoryUsers.find(u => u.email === email && u._id !== req.user.userId);
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      inMemoryUsers[userIndex] = {
        ...inMemoryUsers[userIndex],
        name,
        email,
        bio,
        website,
        location
      };

      const { password, ...userWithoutPassword } = inMemoryUsers[userIndex];
      res.json(userWithoutPassword);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 