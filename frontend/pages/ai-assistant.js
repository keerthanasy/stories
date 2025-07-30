import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AIAssistant() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('ideas');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [generatingBlog, setGeneratingBlog] = useState(false);

  // Form states for different AI features
  const [ideaForm, setIdeaForm] = useState({
    topic: '',
    audience: 'general audience',
    tone: 'professional'
  });

  const [outlineForm, setOutlineForm] = useState({
    title: '',
    topic: '',
    audience: 'general audience',
    contentLength: 'medium'
  });

  const [improveForm, setImproveForm] = useState({
    content: '',
    improvementType: 'general',
    tone: 'professional'
  });

  const [socialForm, setSocialForm] = useState({
    blogContent: '',
    platform: 'Twitter',
    tone: 'engaging'
  });

  const [analyzeForm, setAnalyzeForm] = useState({
    content: '',
    title: ''
  });

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleIdeaGeneration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(ideaForm)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.ideas);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate ideas');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOutlineGeneration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(outlineForm)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.outline);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate outline');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentImprovement = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/improve-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(improveForm)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.improvedContent);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to improve content');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialGeneration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(socialForm)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.socialPosts);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate social posts');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(analyzeForm)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.analysis);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to analyze content');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBlogContent = async (idea) => {
    setGeneratingBlog(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-blog-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: idea.title,
          description: idea.description,
          keyPoints: idea.keyPoints,
          tone: ideaForm.tone,
          audience: ideaForm.audience
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save the blog post to the database
        const saveResponse = await fetch('http://localhost:5000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            title: data.blogPost.title,
            content: data.blogPost.content,
            author: data.blogPost.author
          })
        });

        if (saveResponse.ok) {
          const savedPost = await saveResponse.json();
          // Redirect to the blog post page
          window.location.href = `/blog-post?id=${savedPost._id}`;
        } else {
          setError('Failed to save blog post');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate blog content');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setGeneratingBlog(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access AI features</h2>
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
              AI Assistant
            </motion.div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/new-post" className="text-purple-600 hover:text-pink-500 transition-colors font-medium">
                Create Post
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

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              AI-Powered{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Content Assistant
              </span>
            </h1>
            <p className="text-xl text-purple-700 max-w-3xl mx-auto">
              Enhance your content creation with AI-powered tools for ideas, outlines, improvements, and analysis.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'ideas', label: 'Generate Ideas', icon: '💡' },
                { id: 'outline', label: 'Create Outline', icon: '📋' },
                { id: 'improve', label: 'Improve Content', icon: '✨' },
                { id: 'social', label: 'Social Posts', icon: '📱' },
                { id: 'analyze', label: 'Content Analysis', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                      : 'bg-white/50 text-gray-700 hover:bg-white/70'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Generate Ideas */}
              {activeTab === 'ideas' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">Generate Blog Post Ideas</h3>
                  <form onSubmit={handleIdeaGeneration} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                      <input
                        type="text"
                        value={ideaForm.topic}
                        onChange={(e) => setIdeaForm({...ideaForm, topic: e.target.value})}
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., artificial intelligence, cooking, travel"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select
                          value={ideaForm.audience}
                          onChange={(e) => setIdeaForm({...ideaForm, audience: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="general audience">General Audience</option>
                          <option value="professionals">Professionals</option>
                          <option value="students">Students</option>
                          <option value="beginners">Beginners</option>
                          <option value="experts">Experts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                        <select
                          value={ideaForm.tone}
                          onChange={(e) => setIdeaForm({...ideaForm, tone: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="friendly">Friendly</option>
                          <option value="authoritative">Authoritative</option>
                          <option value="conversational">Conversational</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Generating Ideas...' : 'Generate Ideas'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Create Outline */}
              {activeTab === 'outline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">Create Content Outline</h3>
                  <form onSubmit={handleOutlineGeneration} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                        <input
                          type="text"
                          value={outlineForm.title}
                          onChange={(e) => setOutlineForm({...outlineForm, title: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your post title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                        <input
                          type="text"
                          value={outlineForm.topic}
                          onChange={(e) => setOutlineForm({...outlineForm, topic: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="e.g., artificial intelligence, cooking, travel"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select
                          value={outlineForm.audience}
                          onChange={(e) => setOutlineForm({...outlineForm, audience: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="general audience">General Audience</option>
                          <option value="professionals">Professionals</option>
                          <option value="students">Students</option>
                          <option value="beginners">Beginners</option>
                          <option value="experts">Experts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content Length</label>
                        <select
                          value={outlineForm.contentLength}
                          onChange={(e) => setOutlineForm({...outlineForm, contentLength: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="short">Short (500-800 words)</option>
                          <option value="medium">Medium (800-1500 words)</option>
                          <option value="long">Long (1500+ words)</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Generating Outline...' : 'Generate Outline'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Improve Content */}
              {activeTab === 'improve' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">Improve Your Content</h3>
                  <form onSubmit={handleContentImprovement} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content to Improve</label>
                      <textarea
                        value={improveForm.content}
                        onChange={(e) => setImproveForm({...improveForm, content: e.target.value})}
                        rows={6}
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="Paste your content here..."
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Improvement Type</label>
                        <select
                          value={improveForm.improvementType}
                          onChange={(e) => setImproveForm({...improveForm, improvementType: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="general">General Improvement</option>
                          <option value="grammar">Grammar & Spelling</option>
                          <option value="clarity">Clarity & Readability</option>
                          <option value="engagement">Engagement</option>
                          <option value="seo">SEO Optimization</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                        <select
                          value={improveForm.tone}
                          onChange={(e) => setImproveForm({...improveForm, tone: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="friendly">Friendly</option>
                          <option value="authoritative">Authoritative</option>
                          <option value="conversational">Conversational</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Improving Content...' : 'Improve Content'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Social Media Posts */}
              {activeTab === 'social' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">Generate Social Media Posts</h3>
                  <form onSubmit={handleSocialGeneration} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
                      <textarea
                        value={socialForm.blogContent}
                        onChange={(e) => setSocialForm({...socialForm, blogContent: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="Paste your blog content here..."
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                        <select
                          value={socialForm.platform}
                          onChange={(e) => setSocialForm({...socialForm, platform: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="Twitter">Twitter</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                        <select
                          value={socialForm.tone}
                          onChange={(e) => setSocialForm({...socialForm, tone: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="engaging">Engaging</option>
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="funny">Funny</option>
                          <option value="inspirational">Inspirational</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Generating Posts...' : 'Generate Social Posts'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Content Analysis */}
              {activeTab === 'analyze' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">Analyze Your Content</h3>
                  <form onSubmit={handleContentAnalysis} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                        <input
                          type="text"
                          value={analyzeForm.title}
                          onChange={(e) => setAnalyzeForm({...analyzeForm, title: e.target.value})}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your post title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                          value={analyzeForm.content}
                          onChange={(e) => setAnalyzeForm({...analyzeForm, content: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="Paste your content here..."
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Analyzing Content...' : 'Analyze Content'}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>

          {/* Results */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">AI is working its magic...</p>
            </div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">AI Results</h3>
              
              {/* Ideas Results */}
              {activeTab === 'ideas' && Array.isArray(result) && (
                <div className="space-y-4">
                  {result.map((idea, index) => (
                    <div key={index} className="border border-purple-200 rounded-lg p-4 bg-white/50">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">{idea.title}</h4>
                      <p className="text-gray-600 mb-3">{idea.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {idea.keyPoints?.map((point, i) => (
                          <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                            {point}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Reading time: {idea.readingTime}</p>
                        <button
                          onClick={() => handleGenerateBlogContent(idea)}
                          disabled={generatingBlog}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {generatingBlog ? 'Generating...' : 'Read Full Blog'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Outline Results */}
              {activeTab === 'outline' && result && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Introduction</h4>
                    <p className="text-blue-700">{result.introduction}</p>
                  </div>
                  
                  {result.sections?.map((section, index) => (
                    <div key={index} className="border border-purple-200 rounded-lg p-4 bg-white/50">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">{section.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {section.subsections?.map((sub, i) => (
                          <li key={i}>{sub}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Conclusion</h4>
                    <p className="text-green-700">{result.conclusion}</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Key Takeaways</h4>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700">
                      {result.keyTakeaways?.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Improved Content Results */}
              {activeTab === 'improve' && typeof result === 'string' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Improved Content</h4>
                  <div className="whitespace-pre-wrap text-green-700">{result}</div>
                </div>
              )}

              {/* Social Posts Results */}
              {activeTab === 'social' && Array.isArray(result) && (
                <div className="space-y-4">
                  {result.map((post, index) => (
                    <div key={index} className="border border-purple-200 rounded-lg p-4 bg-white/50">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">Post {index + 1}</h4>
                      <p className="text-gray-700 mb-3">{post.text}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.hashtags?.map((tag, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Best time: {post.postingTime}</p>
                      <p className="text-sm text-gray-600 mt-2">{post.engagementTips}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Analysis Results */}
              {activeTab === 'analyze' && result && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Sentiment</h4>
                      <p className="text-blue-700 capitalize">{result.sentiment}</p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Readability Score</h4>
                      <p className="text-green-700">{result.readabilityScore}/10</p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Engagement Potential</h4>
                      <p className="text-purple-700">{result.engagementPotential}/10</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">SEO Score</h4>
                      <p className="text-yellow-700">{result.seoScore}/10</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Recommended Audience</h4>
                      <p className="text-gray-700">{result.recommendedAudience}</p>
                    </div>
                    
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Reading Time</h4>
                      <p className="text-indigo-700">{result.estimatedReadingTime}</p>
                    </div>
                    
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <h4 className="font-semibold text-pink-800 mb-2">Key Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.keyThemes?.map((theme, i) => (
                          <span key={i} className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-sm">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Suggestions</h4>
                      <ul className="list-disc list-inside space-y-1 text-orange-700">
                        {result.suggestions?.map((suggestion, i) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 