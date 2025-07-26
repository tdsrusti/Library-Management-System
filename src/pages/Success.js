import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const filename = query.get("filename");
  const priceOption = query.get("priceOption");

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Your payment for {filename} was successful.</p>
      <p>Go to MyTextbooks to acess Purchased Textbook</p>
    </div>
  );
};

export default Success;