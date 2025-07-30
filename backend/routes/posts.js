const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// In-memory posts storage as fallback
let inMemoryPosts = [];

// Get all posts
router.get('/', async (req, res) => {
  try {
    // Try MongoDB first
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (mongoError) {
      // Fallback to in-memory storage
      const sortedPosts = inMemoryPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(sortedPosts);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try MongoDB first
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (mongoError) {
      // Fallback to in-memory storage
      const post = inMemoryPosts.find(p => p._id === id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    // Try MongoDB first
    try {
      const post = new Post({ title, content, author });
      await post.save();
      res.status(201).json(post);
    } catch (mongoError) {
      // Fallback to in-memory storage
      const newPost = {
        _id: Date.now().toString(),
        title,
        content,
        author: author || 'Anonymous',
        createdAt: new Date()
      };
      inMemoryPosts.push(newPost);
      res.status(201).json(newPost);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 