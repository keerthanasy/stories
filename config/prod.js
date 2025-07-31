module.exports = {
  mongoURI: process.env.MONGO_URI_PROD,
  jwtSecret: process.env.JWT_SECRET_PROD,
  port: process.env.PORT_PROD,
  nodeEnv: 'production',
  // AI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY,

};
