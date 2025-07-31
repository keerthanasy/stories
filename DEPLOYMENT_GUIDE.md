# Deployment Guide - Environment Variables Setup

## Environment Files Structure

### Development (Local)
- **`.env`** - Contains actual development values
- Used when `NODE_ENV=development` or not set

### Production (Render Deployment)
- **`.env.production`** - Contains `process.env` references
- Values are set in Render environment variables

## Render Environment Variables Setup

When deploying to Render, you need to set these environment variables in your Render dashboard:

### Required Environment Variables for Production:

1. **NODE_ENV**
   - Value: `production`

2. **MONGO_URI_PROD**
   - Value: Your production MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/prod_database`

3. **JWT_SECRET_PROD**
   - Value: A strong, secure JWT secret for production
   - Example: `your_very_long_and_secure_jwt_secret_key_here`

4. **PORT_PROD**
   - Value: Port number (usually `5000` or let Render assign)

5. **OPENAI_API_KEY**
   - Value: Your production OpenAI API key
   - Example: `your-production-openai-key-here`

## How to Set Environment Variables in Render:

1. Go to your Render dashboard
2. Select your service
3. Go to "Environment" tab
4. Add each variable with its corresponding value
5. Save and redeploy

## Environment File Usage:

```javascript
// Your app will automatically use:
// - .env for development
// - .env.production for production (with values from Render env vars)
const config = require('./config/keys');
```

## Security Notes:

- ✅ `.env` and `.env.production` are in `.gitignore`
- ✅ Production values are set in Render, not in code
- ✅ Development values are local only
- ✅ No sensitive data in version control 