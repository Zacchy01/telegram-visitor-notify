const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(cors());

app.get('/notify', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const time = new Date().toLocaleString();

  const message = `👀 *New Page Visit!*
🕒 ${time}
📍 IP: ${ip}
🖥 Browser: ${userAgent}`;

  try {
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      params: {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }
    });
    res.send('Notified!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send message');
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
