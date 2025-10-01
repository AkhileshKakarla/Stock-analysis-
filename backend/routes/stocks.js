const express = require("express");
const axios = require("axios");
const router = express.Router();

// Search stocks by symbol (autocomplete or direct)
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`https://api.polygon.io/v3/reference/tickers`, {
      params: {
        search: q,
        market: "stocks",
        limit: 10,
        apiKey: process.env.POLYGON_KEY,
      },
    });
    res.json(response.data.results);
  } catch (e) {
    res.status(500).json({ error: "Polygon ticker search failed" });
  }
});

// Get specific stock chart data (1D, 1W, etc.)
router.get("/:symbol/chart", async (req, res) => {
  const { symbol } = req.params;
  const { range } = req.query; // e.g. 1D, 1W, 1M, 1Y
  // Range mapping
  const ranges = {
    "1D": { multiplier: 5, timespan: "minute", from: "today", to: "now" },
    "1W": { multiplier: 30, timespan: "minute", from: "1 week ago", to: "now" },
    "1M": { multiplier: 1, timespan: "day", from: "1 month ago", to: "now" },
    "1Y": { multiplier: 1, timespan: "week", from: "1 year ago", to: "now" },
    "5Y": { multiplier: 1, timespan: "month", from: "5 years ago", to: "now" },
  };
  const { multiplier, timespan } = ranges[range] || ranges["1M"];
  try {
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/2023-01-01/${new Date().toISOString().slice(0,10)}`;
    const response = await axios.get(url, { params: { apiKey: process.env.POLYGON_KEY } });
    res.json(response.data.results);
  } catch (e) {
    res.status(500).json({ error: "Polygon chart fetch failed" });
  }
});

// Get real-time data for stock
router.get("/:symbol/quote", async (req, res) => {
  const { symbol } = req.params;
  try {
    const url = `https://api.polygon.io/v2/last/nbbo/${symbol}`;
    const response = await axios.get(url, { params: { apiKey: process.env.POLYGON_KEY } });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: "Polygon quote fetch failed" });
  }
});

module.exports = router;
