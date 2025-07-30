const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const PostRoutes = require('./routes/posts');
const AuthRoutes = require('./routes/auth');
const AIRoutes = require('./routes/ai');

// MongoDB connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aiblog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection failed. Using in-memory storage for demo purposes.');
    console.log('To use MongoDB, please:');
    console.log('1. Install MongoDB locally, or');
    console.log('2. Set up a free MongoDB Atlas account and update MONGODB_URI in .env');
  }
};

connectDB();

app.use('/api/posts', PostRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/ai', AIRoutes);

app.get('/', (req, res) => {
  res.send('AI Blog Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 