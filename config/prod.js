module.exports = {
  mongoURI: process.env.MONGODB_URI,
  openaiApiKey: process.env.OPENAI_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  nodeEnv: 'production',
  corsOrigin: process.env.CORS_ORIGIN || 'https://your-domain.com'
}; 