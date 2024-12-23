const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../data/db');

const JWT_SECRET = 'your_jwt_secret';

// Thêm màu sắc cho console.log
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// Đăng ký
router.post('/register', async (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body received:', req.body);
  console.log('Content-Type:', req.headers['content-type']);

  try {
    console.log(`${colors.blue}[REQUEST] Register attempt for:${colors.reset}`, req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log(`${colors.yellow}[VALIDATION] Missing fields${colors.reset}`);
      console.log('Missing data - Body:', req.body);
      return res.status(400).json({ 
        message: 'Vui lòng cung cấp username và password',
        received: { username: !!username, password: !!password }
      });
    }
    
    if (users.find(u => u.username === username)) {
      console.log(`${colors.yellow}[CONFLICT] User already exists:${colors.reset}`, username);
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      password: await bcrypt.hash(password, 10)
    };
    
    users.push(newUser);
    console.log(`${colors.green}[SUCCESS] New user registered:${colors.reset}`, {
      id: newUser.id,
      username: newUser.username
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    
    return res.status(201).json({ 
      message: 'Đăng ký thành công',
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });

  } catch (err) {
    console.log(`${colors.red}[ERROR] Registration failed:${colors.reset}`, err);
    return res.status(500).json({ 
      message: 'Lỗi server',
      error: err.message 
    });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Thông tin đăng nhập không chính xác' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Thông tin đăng nhập không chính xác' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Lỗi từ server');
  }
});

module.exports = router;
