

const express = require("express");
const path = require("path");
const fs = require("fs");
const Textbook = require("../models/textbookModel");

const router = express.Router();

// Function to create router with upload middleware
module.exports = (upload) => {
  // Upload a textbook
  router.post("/upload", upload.single("textbook"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const textbook = new Textbook({
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        //title:req.body.title,
        syllabusScheme: req.body.syllabusScheme,
        college: req.body.college,
        department: req.body.department,
        semester: req.body.semester,
        subject: req.body.subject,
      });

      await textbook.save();

      res.status(200).json({
        message: "File uploaded successfully",
        textbook,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
  
  // Get all textbooks (with optional filters)
  router.get("/", async (req, res) => {
    try {
      const { syllabusScheme, college, department, semester, subject } = req.query;
      
      // Build query object with only defined parameters
      const query = {};
      if (syllabusScheme) query.syllabusScheme = syllabusScheme;
      if (college) query.college = college;
      if (department) query.department = department;
      if (semester) query.semester = semester;
      if (subject) query.subject = subject;
      
      const textbooks = await Textbook.find(query);
      res.status(200).json(textbooks);
    } catch (err) {
      console.error("Fetching textbooks failed:", err);
      res.status(500).json({ error: "Failed to fetch textbooks" });
    }
  });

  // Download a textbook by filename
  router.get("/download/:filename", async (req, res) => {
    try {
      const textbook = await Textbook.findOne({ filename: req.params.filename });

      if (!textbook) {
        return res.status(404).json({ error: "File not found" });
      }

      const filePath = textbook.path;
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File does not exist on server" });
      }

      // Set headers for download
      res.setHeader("Content-Type", textbook.mimetype);
      res.setHeader("Content-Disposition", `attachment; filename="${textbook.originalName}"`);
      
      // Stream the file to response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ error: "Error downloading file" });
    }
  });

  return router;
};