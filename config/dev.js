module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-blog-generator',
  openaiApiKey: process.env.OPENAI_API_KEY,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  port: process.env.PORT || 5000,
  nodeEnv: 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}; 