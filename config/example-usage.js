// Example of how to use the environment configurations
const config = require('./keys');

// Load environment variables
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

console.log('Current Environment:', config.nodeEnv);
console.log('MongoDB URI:', config.mongoURI);
console.log('Port:', config.port);

// Example MongoDB connection using mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${config.nodeEnv} environment`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, config }; 