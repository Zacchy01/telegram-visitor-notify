const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(cors());
app.use(bodyParser.json());

app.post('/notify', async (req, res) => {
  const { ip, city, region, country, org, userAgent, time } = req.body;

  const message = `📥 *New Visitor Alert!*

🕒 ${time}
📍 IP: ${ip}
🌍 Location: ${city}, ${region}, ${country}
🏢 ISP: ${org}
🖥 Browser: ${userAgent}`;

  try {
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      params: {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }
    });
    res.send("Notified with details");
  } catch (err) {
    console.error("Telegram error", err);
    res.status(500).send("Failed to send message");
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
