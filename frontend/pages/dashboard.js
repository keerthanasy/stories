import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's posts or recent posts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access the dashboard</h2>
          <Link href="/login" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

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
              AI Blog Dashboard
            </motion.div>
            <div className="flex items-center space-x-6">
              <Link href="/new-post" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Create Post
              </Link>
              <Link href="/ai-assistant" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                AI Assistant
              </Link>
              <Link href="/profile" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Profile
              </Link>
              <Link href="/" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Home
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
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
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Welcome to Your{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-purple-700 mb-10"
          >
            Manage your blog posts and create amazing content with AI assistance
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {/* Profile Overview Card */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Welcome back!</h3>
                <p className="text-sm text-gray-600">Manage your profile</p>
              </div>
            </div>
            <Link 
              href="/profile"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all text-sm"
            >
              View Profile
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Post</h3>
            <p className="text-gray-600 mb-4">Start writing your next amazing blog post</p>
            <Link 
              href="/new-post"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">View All Posts</h3>
            <p className="text-gray-600 mb-4">Browse and manage your published content</p>
            <Link 
              href="/posts"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
            >
              Browse Posts
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Assistant</h3>
            <p className="text-gray-600 mb-4">Get AI-powered writing suggestions</p>
            <Link 
              href="/ai-assistant"
              className="bg-gradient-to-r from-blue-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-700 transition-all"
            >
              Try AI
            </Link>
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No posts yet. Create your first post!</p>
              <Link 
                href="/new-post"
                className="inline-block mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Create Post
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 