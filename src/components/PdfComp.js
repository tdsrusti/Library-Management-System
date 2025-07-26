


import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); // default zoom level

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));

  const zoomIn = () => setScale((prev) => prev + 0.2);
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button onClick={goToPrevPage} style={styles.navButton} disabled={pageNumber <= 1}>
          ◀ Prev
        </button>
        <span style={styles.pageText}>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={goToNextPage} style={styles.navButton} disabled={pageNumber >= numPages}>
          Next ▶
        </button>
      </div>

      <div style={styles.zoomControls}>
        <button onClick={zoomOut} style={styles.zoomButton}>➖ Zoom Out</button>
        <span style={styles.zoomLevel}>Zoom: {(scale * 100).toFixed(0)}%</span>
        <button onClick={zoomIn} style={styles.zoomButton}>➕ Zoom In</button>
      </div>

      <div style={styles.pdf}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
          />
        </Document>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2d3436",
    color: "#fff",
    cursor: "pointer",
  },
  pageText: {
    fontSize: "16px",
    color: "#2d3436",
  },
  zoomControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  zoomButton: {
    padding: "8px 14px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#0984e3",
    color: "#fff",
    cursor: "pointer",
  },
  zoomLevel: {
    fontSize: "14px",
    color: "#333",
  },
  pdf: {
    display: "flex",
    justifyContent: "center",
  },
};

export default PdfComp;
