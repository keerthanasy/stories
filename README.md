# AI Blog Generator

A full-stack web application that uses AI to generate blog post ideas, outlines, and content. Built with Node.js, Express, React, and OpenAI API.

## 🚀 Features

- **AI-Powered Content Generation**: Generate blog post ideas, outlines, and full content using OpenAI
- **User Authentication**: Secure signup/login system with JWT tokens
- **Content Management**: Create, edit, and manage blog posts
- **AI Content Improvement**: Enhance existing content with grammar, clarity, and SEO improvements
- **Social Media Integration**: Generate social media posts from blog content
- **Content Analysis**: Get insights and suggestions for your content
- **Responsive Design**: Modern, mobile-friendly UI

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with in-memory fallback)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI content generation

### Frontend
- **React** - UI framework
- **CSS3** - Styling
- **Axios** - HTTP client

## 📁 Project Structure

```
├── backend/                 # Backend server
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   └── index.js            # Server entry point
├── frontend/               # React frontend
├── config/                 # Environment configuration
│   ├── keys.js             # Environment logic
│   ├── dev.js              # Development config
│   └── prod.js             # Production config
├── .env                    # Development environment variables
├── .env.production         # Production environment template
└── .env.example            # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works with in-memory storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-blog-generator
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your values
   nano .env
   ```

4. **Configure your environment variables**
   ```env
   # Development Environment Variables
   NODE_ENV=development
   
   # Development MongoDB Configuration
   MONGO_URI_DEV=mongodb://localhost:27017/your_dev_database
   
   # Development JWT Secret
   JWT_SECRET_DEV=your_development_jwt_secret_key_here
   
   # Development Port
   PORT_DEV=5000
   
   # AI Configuration - Development
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Other Development Variables
   DEBUG=true
   LOG_LEVEL=debug
   ```

5. **Start the development server**
   ```bash
   # Start backend (from root directory)
   cd backend
   npm start
   
   # Start frontend (in a new terminal)
   cd frontend
   npm start
   ```

6. **Open your browser**
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## 🔧 Environment Configuration

### Development
- Uses `.env` file in root directory
- Contains actual development values
- **Never commit this file** (already in .gitignore)

### Production
- Uses `.env.production` file (safe to commit)
- Values are set in deployment platform environment variables
- Configure in Render/Heroku/etc.

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGO_URI_DEV` | Development MongoDB connection string | Yes |
| `JWT_SECRET_DEV` | Development JWT secret | Yes |
| `PORT_DEV` | Development server port | No (default: 5000) |
| `OPENAI_API_KEY` | OpenAI API key | Yes |

## 🚀 Deployment

### Render Deployment

1. **Connect your GitHub repository to Render**

2. **Set environment variables in Render dashboard:**
   - `NODE_ENV` = `production`
   - `MONGO_URI_PROD` = Your production MongoDB URL
   - `JWT_SECRET_PROD` = Your production JWT secret
   - `PORT_PROD` = `5000` (or let Render assign)
   - `OPENAI_API_KEY` = Your production OpenAI API key

3. **Deploy!**

### Other Platforms
The app is compatible with Heroku, Vercel, and other Node.js hosting platforms.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### AI Features
- `POST /api/ai/generate-ideas` - Generate blog post ideas
- `POST /api/ai/generate-outline` - Generate content outline
- `POST /api/ai/generate-blog-content` - Generate full blog content
- `POST /api/ai/improve-content` - Improve existing content
- `POST /api/ai/generate-social` - Generate social media posts
- `POST /api/ai/analyze-content` - Analyze content

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/ai-blog-generator/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- OpenAI for providing the AI API
- MongoDB for the database
- The open-source community for various packages used

---

**Note**: This application uses OpenAI's API. Make sure to add billing to your OpenAI account for production use, as the free tier has rate limits. 