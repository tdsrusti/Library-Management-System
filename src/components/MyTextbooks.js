
// export default MyTextbooks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyTextbooks = () => {
  const [textbooks, setTextbooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/my-textbooks", { withCredentials: true });
        setTextbooks(response.data);
      } catch (error) {
        console.error("Error fetching purchased textbooks:", error);
        alert("Failed to fetch purchased textbooks. Please try again.");
      }
    };

    fetchTextbooks();
  }, []);

  const handleView = (filename) => {
    navigate("/view-pdf", { state: { pdfFile: `http://localhost:5000/uploads/${filename}` } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Textbooks</h2>
      {textbooks.length === 0 ? (
        <p style={styles.noBooks}>You have not purchased any textbooks yet.</p>
      ) : (
        <div style={styles.grid}>
          {textbooks.map((textbook, index) => (
            <div key={`${textbook.textbookId._id}-${index}`} style={styles.card}>
              <h4 style={styles.bookTitle}>{textbook.textbookId.originalName}</h4>
              {textbook.type === "download" ? (
                <a
                  href={`http://localhost:5000/uploads/${textbook.textbookId.filename}`}
                  download
                  style={styles.downloadButton}
                >
                  Download
                </a>
              ) : (
                <button onClick={() => handleView(textbook.textbookId.filename)} style={styles.viewButton}>
                  View
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  noBooks: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "0 10px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  bookTitle: {
    marginBottom: "15px",
    color: "#34495e",
    fontSize: "1.1rem",
  },
  viewButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  downloadButton: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    display: "inline-block",
  },
};

export default MyTextbooks;
