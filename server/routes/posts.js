const express = require('express');
const router = express.Router();
const { posts } = require('../data/db');

// Middleware kiểm tra đăng nhập
const checkAuth = (req, res, next) => {
  if (req.cookies.session) {
    next(); // Nếu có cookie, cho phép tiếp tục
  } else {
    return res.status(401).json({
      success: false,
      message: 'Bạn cần đăng nhập để thực hiện hành động này',
    });
  }
};

// Tạo post mới
router.post('/', checkAuth, (req, res) => {
  console.log('reqs', req);
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Nội dung xì ta tút không được bỏ trống',
      });
    }

    const newPost = {
      id: Date.now().toString(),
      content,
    };
    posts.push(newPost);

    res.status(200).json({
      success: true,
      message: 'Tạo xì ta tút thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Tạo xì ta tút thất bại',
    });
  }
});

// Lấy tất cả posts
router.get('/', checkAuth, (req, res) => {
  try {
    res.json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách bài post',
    });
  }
});

module.exports = router;
