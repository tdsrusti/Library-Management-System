

import React, { useState } from "react";
import { uploadTextbook } from "../services/apiService";

const UploadTextbook = ({ syllabusScheme, college, department, semester, subject }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'application/vnd.ms-powerpoint', 
                         'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      
      if (!validTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please select a PDF, DOC, DOCX, PPT, or PPTX file.");
        setFile(null);
        return;
      }
      
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File is too large. Maximum size is 10MB.");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(false);
      
      const result = await uploadTextbook(file, syllabusScheme, college, department, semester, subject);
      
      console.log("Upload successful:", result);
      setSuccess(true);
      setFile(null);
      
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      setError("Upload failed: " + (err.message || "Unknown error"));
      console.error("Upload error:", err);
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload a Textbook</h3>
      <p>No textbooks available for {subject} (Semester {semester}). Be the first to upload!</p>
      
      <div className="file-input-container">
        <input 
          type="file" 
          id="textbook-file"
          onChange={handleFileChange} 
          disabled={uploading}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />
        <label htmlFor="textbook-file">
          {file ? file.name : "Choose file"}
        </label>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Upload successful!</div>}
      
      <button 
        className="upload-button"
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload Textbook"}
      </button>
      
      <div className="upload-details">
        
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Semester:</strong> {semester}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>College:</strong> {college}</p>
        <p><strong>Syllabus Scheme:</strong> {syllabusScheme}</p>
      </div>
    </div>
  );
};

export default UploadTextbook;