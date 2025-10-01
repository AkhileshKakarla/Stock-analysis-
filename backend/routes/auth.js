const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// Register new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, passwordHash });
    res.json({ msg: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Edit profile
router.put("/profile", async (req, res) => {
  const { userId, name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, avatar }, { new: true });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: "Profile update failed" });
  }
});

module.exports = router;
