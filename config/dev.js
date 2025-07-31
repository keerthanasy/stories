module.exports = {
  mongoURI: process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/your_dev_database',
  jwtSecret: process.env.JWT_SECRET_DEV || 'your_dev_jwt_secret',
  port: process.env.PORT_DEV || 5000,
  nodeEnv: 'development',
  // AI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  googleAiApiKey: process.env.GOOGLE_AI_API_KEY
}; 