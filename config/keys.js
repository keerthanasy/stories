const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Development configuration
const dev = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-blog-generator',
  openaiApiKey: process.env.OPENAI_API_KEY,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  port: process.env.PORT || 5000,
  nodeEnv: 'development'
};

// Production configuration
const prod = {
  mongoURI: process.env.MONGODB_URI,
  openaiApiKey: process.env.OPENAI_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  nodeEnv: 'production'
};

// Export configuration based on environment
const config = process.env.NODE_ENV === 'production' ? prod : dev;

module.exports = config; 