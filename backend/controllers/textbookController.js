

const Textbook = require("../models/textbookModel");

exports.uploadTextbook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract metadata from request body
    const { syllabusScheme, college, department, semester, subject } = req.body;

    // Create a new textbook record
    const textbook = new Textbook({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      //title,
      syllabusScheme,
      college,
      department,
      semester,
      subject
    });

    await textbook.save();

    res.status(201).json({
      message: "Textbook uploaded successfully",
      textbook
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Server error during upload" });
  }
};

exports.getTextbooks = async (req, res) => {
  try {
    const { syllabusScheme, college, department, semester, subject } = req.query;

    // Build query object with only defined parameters
    const query = {};
    
    if (syllabusScheme) query.syllabusScheme = syllabusScheme;
    if (college) query.college = college;
    if (department) query.department = department;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;

    console.log("Searching textbooks with query:", query);

    const textbooks = await Textbook.find(query);
    console.log(`Found ${textbooks.length} textbooks`);

    res.json(textbooks);
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};


exports.downloadTextbook = async (req, res) => {
  try {
    const textbook = await Textbook.findOne({ filename: req.params.filename });

    if (!textbook) {
      return res.status(404).json({ error: "File not found" });
    }

    // Set headers for download
    res.setHeader("Content-Type", textbook.mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${textbook.originalName}"`);
    
    // Send the file
    res.sendFile(textbook.path, (err) => {
      if (err) {
        console.error("File send error:", err);
        res.status(500).json({ error: "Error sending file" });
      }
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
};


