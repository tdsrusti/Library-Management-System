
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        
      });
      console.log("✅ Mongoose connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      
    }
  };
  

module.exports = connectDB;
