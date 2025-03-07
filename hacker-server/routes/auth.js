const express = require('express');
const router = express.Router();
const { users } = require('../data/db');

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      u => u.username === username && u.password === password
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tên đăng nhập hoặc mật khẩu không đúng',
      });
    }

    // Thiết lập cookie
    res.cookie('session', 'your_session_value', {
      httpOnly: true, // Không cho phép truy cập cookie từ JavaScript
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường sản xuất
      maxAge: 24 * 60 * 60 * 1000, // Cookie sẽ hết hạn sau 1 ngày
      sameSite: 'Lax', // Cấu hình SameSite
    });

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('session'); // Xóa cookie session
  res.json({
    success: true,
    message: 'Đăng xuất thành công',
  });
});

module.exports = router;
