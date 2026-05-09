const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const { sendResetEmail } = require("../config/mail");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  console.log(token);
  await user.save();

  const resetLink = `https://expense-tracker-mern-project-seven.vercel.app/auth/reset-password/${token}`;
  await sendResetEmail(email, resetLink);

  res.json({ message: "Password reset link sent to your email." });
});

router.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

module.exports = router;
