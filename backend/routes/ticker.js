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
    // Return mock data if Polygon API fails
    const mockData = [
      {
        ticker: "RELIANCE",
        name: "Reliance Industries",
        price: 2500.25,
        change: -1.23,
        logoUrl: "/assets/RELIANCE.png"
      },
      {
        ticker: "TCS",
        name: "Tata Consultancy Services",
        price: 3700.10,
        change: 2.15,
        logoUrl: "/assets/TCS.png"
      },
      {
        ticker: "INFY",
        name: "Infosys",
        price: 1450.50,
        change: 0.85,
        logoUrl: ""
      },
      {
        ticker: "USDINR",
        name: "USD/INR",
        price: 83.20,
        change: 0.05,
        logoUrl: ""
      },
      {
        ticker: "NIFTY",
        name: "Nifty 50",
        price: 19500.00,
        change: -0.45,
        logoUrl: ""
      }
    ];
    res.json(mockData);
  }
});

module.exports = router;
