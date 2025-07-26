const express = require("express");
const User = require("../models/userModel");
const Payment = require("../models/payment"); 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Check if the password matches
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email }, });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// Logout user
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
});

// Fetch purchased textbooks for the logged-in user
router.get("/my-textbooks", async (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
      const userId = decoded.id;
  
      // Fetch textbooks purchased by the user
      const purchasedTextbooks = await Payment.find({ userId, status: "completed" }).populate("textbookId");
  
      res.json(purchasedTextbooks);
    } catch (error) {
      console.error("Error fetching purchased textbooks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;