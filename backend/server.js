const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
const shortid = require("shortid");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create a new order
app.post("/payment/orders", async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});


app.post("/payment/success", async (req, res) => {
  const crypto = require("crypto");
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest === razorpaySignature) {
    res.json({ msg: "Payment successfully verified" });
  } else {
    res.status(400).json({ msg: "Invalid signature, payment not verified" });
  }
});


app.use((req, res) => {
  res.status(404).send("404: Not Found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
