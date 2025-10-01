const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.q || "stock market";
  try {
    const news = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: { q, apiKey: process.env.NEWSAPI_KEY, language: "en" }
    });
    res.json(news.data.articles);
  } catch (e) {
    res.status(500).json({ error: "NewsAPI failure" });
  }
});

module.exports = router;
