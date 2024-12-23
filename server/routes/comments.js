const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { comments, posts } = require('../data/db');

// Lấy bình luận cho bài viết
router.get('/post/:postId', (req, res) => {
  const postComments = comments.filter(c => c.postId === parseInt(req.params.postId));
  res.json(postComments);
});

// Thêm bình luận mới
router.post('/', auth, (req, res) => {
  const { postId, content } = req.body;
  
  const post = posts.find(p => p.id === parseInt(postId));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

  const newComment = {
    id: comments.length + 1,
    content,
    postId: parseInt(postId),
    userId: req.user.userId,
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router; 