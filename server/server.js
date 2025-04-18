const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Security headers middleware for iframe
// app.use((req, res, next) => {
//   res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//   res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
//   next();
// });

// Middleware
app.use(
  cors({
    // origin: ['http://localhost:3000', 'http://localhost:5001'],
    origin: true, // Cho phép tất cả các origin trong môi trường development
    credentials: true, // Cho phép gửi credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
