# 🤖 AI-Powered Blog Platform

A modern, full-stack blog platform that combines the power of artificial intelligence with beautiful design to help you create engaging content effortlessly.

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Secure login/signup system with JWT tokens
- **User Profiles**: Complete profile management with customizable details
- **Blog Creation**: Create and manage blog posts with rich content
- **AI-Powered Content Generation**: Generate ideas, outlines, and full blog posts
- **Beautiful UI**: Modern, responsive design with smooth animations

### 🤖 AI Assistant Features
- **Generate Ideas**: Get creative blog post ideas based on topics
- **Create Outlines**: Generate structured content outlines
- **Improve Content**: Enhance existing content with AI suggestions
- **Social Media Posts**: Create engaging social media content
- **Content Analysis**: Get insights and recommendations for your posts
- **Full Blog Generation**: Generate complete blog posts from ideas

### 🎨 Design Features
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Beautiful gradient backgrounds and glass-morphism effects
- **Smooth Animations**: Framer Motion powered animations
- **Professional Typography**: Clean, readable text layouts
- **Interactive Elements**: Hover effects and smooth transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **OpenAI API** - AI content generation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- OpenAI API key (optional, for real AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-blog-platform
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/aiblog?retryWrites=true&w=majority
   
   # OpenAI API Key (Get yours from https://platform.openai.com/api-keys)
   OPENAI_API_KEY=sk-your-real-openai-api-key-here
   
   # JWT Secret (Change this to a secure random string)
   JWT_SECRET=your-secure-jwt-secret
   
   # Server Port
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```
   
   This will start both frontend (port 3001) and backend (port 5000) concurrently.

## 📖 Usage

### 1. User Registration & Authentication
- Sign up with your email and password
- Login to access all features
- Manage your profile information

### 2. AI Content Generation
1. Navigate to "AI Assistant"
2. Choose from different AI features:
   - **Generate Ideas**: Enter a topic to get blog post ideas
   - **Create Outline**: Generate structured content outlines
   - **Improve Content**: Enhance existing content
   - **Social Posts**: Create social media content
   - **Content Analysis**: Get insights about your content

### 3. Blog Management
- **Create Posts**: Write your own blog posts
- **Generate Full Blogs**: Click "Read Full Blog" on any AI-generated idea
- **View All Posts**: Browse all created content
- **Read Posts**: Beautiful reading experience with full content

### 4. Profile Management
- Update your personal information
- Add bio, website, and location
- View your profile statistics

## 🔧 Configuration

### MongoDB Setup
The application supports both local MongoDB and MongoDB Atlas:

1. **Local MongoDB**:
   - Install MongoDB locally
   - Update `MONGODB_URI` in `.env` to `mongodb://localhost:27017/aiblog`

2. **MongoDB Atlas** (Recommended):
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string and update `MONGODB_URI`

### OpenAI API Setup
1. Create an account at [OpenAI Platform](https://platform.openai.com)
2. Get your API key from the API Keys section
3. Add billing information (required for API usage)
4. Update `OPENAI_API_KEY` in your `.env` file

**Note**: The application includes mock responses for demo purposes when OpenAI API is not available.

## 📁 Project Structure

```
ai-blog-platform/
├── frontend/                 # Next.js frontend application
│   ├── pages/               # Next.js pages
│   ├── contexts/            # React contexts
│   ├── styles/              # CSS styles
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── routes/              # API routes
│   ├── models/              # MongoDB models
│   ├── middleware/          # Custom middleware
│   └── package.json
├── package.json             # Root package.json
├── README.md               # Project documentation
└── .gitignore              # Git ignore file
```

## 🌟 Key Features Explained

### AI Content Generation
The platform uses OpenAI's GPT models to generate:
- **Blog Ideas**: Creative and engaging blog post concepts
- **Content Outlines**: Structured content plans
- **Full Blog Posts**: Complete articles with introduction, body, and conclusion
- **Content Improvements**: Grammar, clarity, and engagement enhancements
- **Social Media Content**: Platform-specific social posts

### Authentication System
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- User session management

### Database Design
- **User Model**: User profiles with customizable fields
- **Post Model**: Blog posts with metadata
- **In-Memory Fallback**: Works without MongoDB for demo purposes

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend Deployment (Heroku/Railway)
1. Create a new app on your preferred platform
2. Set environment variables
3. Deploy from GitHub

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help:
- Create an issue in the GitHub repository
- Check the documentation
- Review the code comments

---

**Happy Blogging with AI! 🚀** 