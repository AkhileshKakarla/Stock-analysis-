const express = require("express");
const twilio = require("twilio");
const router = express.Router();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post("/whatsapp", async (req, res) => {
  const { phone, message } = req.body;
  try {
    await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`
    });
    res.json({ status: "sent" });
  } catch (e) {
    res.status(500).json({ error: "Twilio sending failed" });
  }
});

module.exports = router;
