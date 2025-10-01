const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: "" }, // URL or base64 string for profile pic
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
