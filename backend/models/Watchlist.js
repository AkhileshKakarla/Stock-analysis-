const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticker: { type: String, required: true, trim: true },
  name: { type: String, required: true },
  logoUrl: { type: String, default: "" },
  addedAt: { type: Date, default: Date.now }
});

WatchlistSchema.index({ userId: 1, ticker: 1 }, { unique: true }); // prevent duplicate tickers per user

module.exports = mongoose.model("Watchlist", WatchlistSchema);
