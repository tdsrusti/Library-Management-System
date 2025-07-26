
import React from "react";
import axios from "axios";

const DownloadTextbook = ({ textbook,userId }) => {
  const handlePayment = async (priceOption) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          userId, // Pass the actual userId
          textbookId: textbook._id, // Use the textbook's _id as textbookId
          filename: textbook.filename,
          originalName: textbook.originalName,
          priceOption,
        }
      );
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="textbook-item">
      <h4>{textbook.originalName}</h4>
      <button onClick={() => handlePayment("view")}>View Only (₹100)</button>
      <button onClick={() => handlePayment("download")}>Download (₹200)</button>
    </div>
  );
};

export default DownloadTextbook;