
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const path = require("path");
const textbookRoutes = require("./routes/textbookRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const upload = require("./middleware/uploadMiddleware"); 
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");



dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables.");
    }
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongoose connected to MongoDB in server.js");

    app.use("/api/textbooks", textbookRoutes(upload)); // Pass upload middleware
    app.use("/api/payments", paymentRoutes);
    app.use("/api/auth", authRoutes);
    app.post("/api/payments/webhook", express.raw({ type: "application/json" }), paymentRoutes);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();