const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { posts, users } = require('../data/db');

// Lấy tất cả bài viết
router.get('/', (req, res) => {
  res.json(posts);
});

// Tạo bài viết mới
router.post('/', auth, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId: req.user.userId,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Lấy bài viết theo id
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  res.json(post);
});

module.exports = router; 