

    const mongoose = require("mongoose");

const TextbookSchema = new mongoose.Schema({
  filename: String,        // Generated unique filename
  originalName: String,    // Original filename from upload
  path: String,            // File path on disk
  size: Number,            // File size in bytes
  mimetype: String,        // MIME type of file
  syllabusScheme: String,
  college: String,
  department: String,
  semester: String,
  subject: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Textbook", TextbookSchema);