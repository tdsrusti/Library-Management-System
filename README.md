# LIBRARY-MANAGEMENT-SYSTEM

**Digitizing Academic Resources, Enabling Knowledge Sharing**

![last commit](https://img.shields.io/badge/last%20commit-today-blue)
![javascript](https://img.shields.io/badge/javascript-68.2%25-yellow)
![languages](https://img.shields.io/badge/languages-4-green)

**Built with the tools and technologies:**

![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
![.ENV](https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=black)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview

Library-Management-System is a comprehensive full-stack web application that allows users to manage, upload, and access textbooks in an academic environment. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform is designed to help students and educators easily share study materials and textbooks through a secure, payment-integrated marketplace.

The application features a streamlined workflow for textbook uploads with academic parameter filtering (syllabus scheme, college, department, semester, and subject), secure payment integration via Stripe for viewing or downloading files, and JWT-based authentication for secure user sessions. The system supports multiple file formats and includes an integrated PDF viewer for seamless content access.

### Why Library-Management-System?

This project addresses the common challenges in academic resource sharing and helps educational institutions build efficient digital libraries. The core features include:

🔐 **Secure Authentication**: JWT-based user registration and login system with secure session management

📚 **Textbook Upload System**: Support for multiple file formats (PDF, DOC, DOCX, PPT, PPTX) with 10MB file size limit

🔍 **Advanced Filtering**: Search textbooks by syllabus scheme, college, department, semester, and subject

💳 **Payment Integration**: Stripe-powered payment system with dual pricing (view vs download)

📖 **Integrated PDF Viewer**: Preview textbooks directly in the browser without downloads

🗂️ **File Management**: Multer-based file handling with secure storage and retrieval

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language**: JavaScript (Node.js v14 or higher)
- **Package Manager**: npm
- **Database**: MongoDB (local instance or cloud deployment)
- **Payment Gateway**: Stripe API keys
- **Runtime Environment**: Node.js

### Installation

Build Library-Management-System from source and install dependencies:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tdsrusti/Library-Management-System.git
   cd Library-Management-System
   ```

2. **Backend Setup:**
   Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   In a new terminal, navigate to the frontend directory:
   ```bash
   cd ../src
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_API_KEY=your_stripe_api_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   PORT=5000
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=pdf,doc,docx,ppt,pptx
   ```

## Usage

This is a MERN stack application with separate frontend and backend servers.

### Running the Backend

From the backend directory, start the Express server:

```bash
npm start
```

The backend server will start on port 5000 and connect to MongoDB.

### Running the Frontend

From the frontend directory (src), start the React development server:

```bash
npm start
```

The React application will run on port 3000 and use React Router for navigation.

### Application Flow

1. **User Registration/Login**: New users register and existing users sign in securely
2. **Browse Textbooks**: Search and filter textbooks using academic parameters
3. **Upload Textbooks**: Users can upload textbooks when resources are unavailable
4. **Payment Process**: Choose between viewing (lower cost) or downloading (higher cost)
5. **Content Access**: View textbooks in integrated PDF viewer or download after payment

## Features

### 🔐 User Authentication
- **Secure Registration**: New user signup with validation
- **JWT-based Login**: Token-based authentication for secure sessions
- **Session Management**: Automatic token refresh and logout handling

### 📚 Textbook Management
- **Multi-format Support**: Upload PDF, DOC, DOCX, PPT, and PPTX files
- **File Validation**: Automatic file type checking and 10MB size limit
- **Metadata Storage**: Comprehensive textbook information with academic parameters

### 🔍 Advanced Search & Filtering
- **Academic Filters**: Filter by syllabus scheme, college, department, semester, subject
- **Smart Search**: Find textbooks based on multiple criteria
- **Availability Check**: Real-time status of textbook availability

### 💳 Payment Integration
- **Stripe Gateway**: Secure payment processing with industry standards
- **Dual Pricing Model**: Separate pricing for viewing vs downloading
- **Payment Sessions**: Secure checkout process with session management
- **Webhook Support**: Real-time payment confirmation handling

### 📖 Content Viewing System
- **Integrated PDF Viewer**: Preview textbooks directly in browser
- **Secure Access Control**: Content access only after successful payment
- **Download Management**: Controlled file downloads with user tracking

### 🗂️ File Handling
- **Multer Integration**: Efficient file upload middleware
- **Secure Storage**: Protected file storage with access controls
- **RESTful API**: Clean endpoints for upload, retrieval, and download operations

## Configuration

### Backend Configuration
- **Database Connection**: Configured in `backend/config/db.js`
- **Upload Middleware**: File handling setup in `backend/middleware/uploadMiddleware.js`
- **Payment Routes**: Stripe API integration in payment route handlers
- **Authentication**: JWT middleware for protected routes

### Frontend Configuration
- **React Router**: Route management configured in `src/App.js`
- **Component Structure**: Organized under `/src/components/` directory
- **API Services**: Backend communication handled in `src/services/apiService.js`
- **State Management**: React hooks for application state

### Key Components
- **Header Component**: Navigation and user interface
- **Textbook Upload**: File upload functionality with validation
- **PDF Viewer**: Integrated document viewing capability
- **Download Manager**: Secure file download handling
- **Payment Interface**: Stripe checkout integration

## Contributing

We welcome contributions to improve the Library Management System! Please follow these steps:

1. **Fork the Repository:**
   Create your own fork on GitHub

2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes:**
   Write clear, concise commit messages detailing your changes

4. **Push and Create a Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Code Review Process:**
   Respond to feedback and make required changes

### Development Guidelines
- Follow existing code conventions and style guidelines
- Ensure your code doesn't break existing functionality
- Write meaningful commit messages
- Test your changes thoroughly before submission



**Empowering education through digital resource sharing**
