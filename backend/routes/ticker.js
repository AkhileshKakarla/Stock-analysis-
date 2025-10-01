const express = require("express");
const axios = require("axios");
const router = express.Router();

const TICKERS = ["RELIANCE", "TCS", "INFY", "USDINR", "NIFTY"];

router.get("/", async (req, res) => {
  try {
    const results = await Promise.all(
      TICKERS.map(tkr =>
        axios.get(`https://api.polygon.io/v2/aggs/ticker/${tkr}/prev`, {
          params: { apiKey: process.env.POLYGON_KEY }
        })
      )
    );
    const stockData = results.map((r, i) => {
      const d = r.data.results[0];
      return {
        ticker: TICKERS[i],
        name: TICKERS[i],
        price: d.c,
        change: ((d.c - d.o) / d.o * 100).toFixed(2),
        logoUrl: `/assets/${TICKERS[i]}.png`
      };
    });
    res.json(stockData);
  } catch (e) {
    res.status(500).json({ error: "Polygon API failure" });
  }
});

module.exports = router;
