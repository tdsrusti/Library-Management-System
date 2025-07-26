

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PdfComp from "./PdfComp";

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState(location.state?.pdfFile || "");

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };

  if (!pdfFile) {
    return (
      <div style={styles.container}>
        <p style={styles.noPdf}>No PDF file to display.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
      <div style={styles.viewerWrapper}>
        <PdfComp pdfFile={pdfFile} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
  },
  backButton: {
    backgroundColor: "#2d3436",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "16px",
  },
  viewerWrapper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  noPdf: {
    textAlign: "center",
    color: "#888",
    fontSize: "18px",
  },
};

export default PdfViewer;
