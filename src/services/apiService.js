
import axios from "axios";


// Define the API base URL - make sure this matches your server address
const API_BASE_URL = "http://localhost:5000";

export const getTextbooks = async (syllabusScheme, college, department, semester, subject) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/textbooks`, {
      params: { syllabusScheme, college, department, semester, subject }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    // Extract meaningful error message
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error("Server is not responding. Please check if the backend server is running.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const uploadTextbook = async (file, syllabusScheme, college, department, semester, subject) => {
  const formData = new FormData();
  formData.append("textbook", file);
  formData.append("syllabusScheme", syllabusScheme || "");
  formData.append("college", college || "");
  formData.append("department", department || "");
  formData.append("semester", semester || "");
  formData.append("subject", subject || "");

  try {
    console.log("Uploading textbook:", {
      file: file.name,
      syllabusScheme,
      college,
      department,
      semester,
      subject
    });
    
    const response = await axios.post(`${API_BASE_URL}/api/textbooks/upload`, formData, {
      headers: {
        // Let axios set the Content-Type header with boundary
      },
      withCredentials: true
    });
    
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error("Server is not responding. Please check if the backend server is running.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

// Optional helper to get the file URL for viewing/downloading
export const getFileUrl = (filename) => {
  return `${API_BASE_URL}/api/textbooks/download/${filename}`;
};




