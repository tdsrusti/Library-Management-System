import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextbookMarketplace from "./pages/TextbookMarketplace";
import React, { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyTextbooks from "./components/MyTextbooks";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { Header, Footer } from "./components/Header";
import PdfViewer from "./components/PdfViewer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6f8"
      }}>
        <Header user={user} setUser={setUser} />
        
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TextbookMarketplace userId={user?.id} />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/my-textbooks" element={<MyTextbooks />} />
            <Route path="/view-pdf" element={<PdfViewer />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
