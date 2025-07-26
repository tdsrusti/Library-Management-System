import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    backgroundColor: "#f1f1f1",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333333",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    margin: "0.8rem 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  link: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "1rem",
  },
  linkText: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "500",
  },
};

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true });
      alert(response.data.message);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        alert(error.response.data.message || "Server error occurred");
      } else if (error.request) {
        alert("No response from server. Please check if the backend is running.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div style={loginStyles.container}>
      <form onSubmit={handleSubmit} style={loginStyles.form}>
        <h2 style={loginStyles.title}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={loginStyles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={loginStyles.input}
        />
        <button type="submit" style={loginStyles.button}>Login</button>
        <div style={loginStyles.link}>
          <p>Don't have an account? <a href="/register" style={loginStyles.linkText}>Register here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
