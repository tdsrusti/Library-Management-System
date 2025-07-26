

const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    timeout: 120000, // Set timeout to 120 seconds
  });
const Payment = require("../models/payment");
const router = express.Router();




router.post("/create-checkout-session", async (req, res) => {
  const { userId, textbookId, originalName, priceOption } = req.body;
  if (!userId || !textbookId) {
    return res.status(400).json({ error: "userId and textbookId are required." });
  }
  try {
    // Determine the amount based on the price option
    const amount = priceOption === "view" ? 10000 : 20000; // Amount in paise (INR)

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: originalName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    // Save the payment details in MongoDB
    const payment = new Payment({
      userId,
      textbookId,
      type: priceOption,
      amount: amount / 100, // Convert to INR
      status: "completed",
      sessionId: session.id,
    });

    await payment.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
  
      try {
        // Update the payment status in MongoDB
        const payment = await Payment.findOneAndUpdate(
          { sessionId: session.id },
          { status: "completed", updatedAt: new Date() },
          { new: true }
        );
  
        if (payment) {
          console.log("Payment completed:", payment);
        } else {
          console.error("Payment not found for session ID:", session.id);
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    }
  
    res.json({ received: true });
  });

module.exports = router;