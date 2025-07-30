import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              AI Blog
            </motion.div>
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <Link href="/new-post" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Write
                  </Link>
                  <Link href="/ai-assistant" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    AI Assistant
                  </Link>
                  <Link href="/profile" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Profile
                  </Link>
                  <Link href="/posts" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Read
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/posts" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Read
                  </Link>
                  <Link href="/login" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
          >
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Blog Platform
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-purple-700 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Welcome to our intelligent blog platform where AI meets creativity. 
            Discover insightful articles and create engaging content with the power of artificial intelligence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-semibold shadow-md"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  href="/new-post"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold shadow-md border border-purple-200"
                >
                  Create New Post
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/signup"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-semibold shadow-md"
                >
                  Get Started
                </Link>
                <Link 
                  href="/posts"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold shadow-md border border-purple-200"
                >
                  Browse Posts
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Experience the future of content creation with our cutting-edge AI features
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-pink-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Writing</h3>
            <p className="text-purple-700 leading-relaxed">
              Generate creative content and ideas with the help of artificial intelligence. 
              Our advanced AI assists you in crafting compelling articles and engaging narratives.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Insights</h3>
            <p className="text-purple-700 leading-relaxed">
              Get intelligent suggestions and analytics for your blog content. 
              Track performance, understand your audience, and optimize your writing strategy.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Modern Design</h3>
            <p className="text-purple-700 leading-relaxed">
              Beautiful, responsive design that looks great on all devices. 
              Enjoy a seamless writing experience with our intuitive and elegant interface.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl p-10 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Writing?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of writers who are already creating amazing content with AI assistance.
          </p>
          <Link 
            href="/new-post"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-md"
          >
            Start Writing Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-100">
            © 2024 AI Blog Platform. Built with Next.js, React, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
} 