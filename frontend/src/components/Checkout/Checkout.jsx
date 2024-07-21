import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showId = params.get("id");
  const selectedSeats = params.get("seats")?.split(",") || [];
  const [tickets, setTickets] = useState(selectedSeats.length);
  const ticketPrice = 100;
  const totalPrice = tickets * ticketPrice;

  useEffect(() => {
    setTickets(selectedSeats.length);
  }, [selectedSeats]);

  async function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const result = await axios.post(
        "https://ticket-booking-app-0asy.onrender.com/payment/orders",
        {
          amount: totalPrice * 100,
          currency: "INR",
        }
      );

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_9prTtLDZGWqgQT",
        amount: amount.toString(),
        currency: currency,
        name: "Ticket Booking App",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "https://ticket-booking-app-0asy.onrender.com/payment/success",
            data
          );

          alert(result.data.msg);
        },
        prefill: {
          name: "<YOUR NAME>",
          email: "example@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Example Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in processing payment:", error);
      alert("Failed to initiate payment. Please try again later.");
    }
  }

  return (
    <div className="checkout-container">
      <h1>Checkout for Show {showId}</h1>
      <form>
        <div>
          <label htmlFor="tickets">Number of Tickets:</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            required
            min="1"
            value={tickets}
            readOnly
          />
        </div>
        <div>
          <label>Total Price: </label>
          <span>{totalPrice} INR</span>
        </div>
        <button type="button" onClick={displayRazorpay}>
          Confirm Checkout
        </button>
      </form>
    </div>
  );
}

export default Checkout;
