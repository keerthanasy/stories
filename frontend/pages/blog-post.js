import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPost() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.id) {
      fetchBlogPost(router.query.id);
    }
  }, [router.query.id]);

  const fetchBlogPost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setBlogPost(data);
      } else {
        setError('Blog post not found');
      }
    } catch (err) {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
          <Link href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
          <Link href="/" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go Home
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
              AI Blog
            </motion.div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Dashboard
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

      {/* Blog Post Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Blog Header */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight"
            >
              {blogPost.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center space-x-4 text-gray-600 mb-6"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {blogPost.author ? blogPost.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="font-medium">{blogPost.author || 'Anonymous'}</span>
              </div>
              <span>•</span>
              <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
              {blogPost.readingTime && (
                <>
                  <span>•</span>
                  <span>{blogPost.readingTime}</span>
                </>
              )}
            </motion.div>

            {blogPost.description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-700 leading-relaxed mb-6"
              >
                {blogPost.description}
              </motion.p>
            )}

            {blogPost.keyPoints && blogPost.keyPoints.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-purple-50 border border-purple-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Key Points:</h3>
                <ul className="space-y-2">
                  {blogPost.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Blog Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8"
          >
            {blogPost.content ? (
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {blogPost.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Content Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  This blog post is currently being generated. Check back soon for the full content!
                </p>
                <Link 
                  href="/ai-assistant"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium"
                >
                  Generate More Content
                </Link>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link 
              href="/ai-assistant"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium text-center"
            >
              Generate More Ideas
            </Link>
            <Link 
              href="/new-post"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium border border-purple-200 text-center"
            >
              Create Your Own Post
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 