const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticker: { type: String, required: true, trim: true },
  alertType: { type: String, enum: ["price", "news", "sentiment"], default: "price" },
  thresholdPrice: { type: Number }, // required if alertType is price
  triggered: { type: Boolean, default: false },
  lastTriggeredAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

AlertSchema.index({ userId: 1, ticker: 1, alertType: 1 }, { unique: true });

module.exports = mongoose.model("Alert", AlertSchema);
