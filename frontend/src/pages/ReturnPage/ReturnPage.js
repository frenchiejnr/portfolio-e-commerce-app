import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { API_URL } from "../../config/index";

export const ReturnPage = () => {
  const [status, setStatus] = useState(null);
  const cartId = useSelector((state) => state.cart.cartId);
  const cartTotal = useSelector((state) => state.cart.total);
  const userId = useSelector((state) => state.user.userId);
  const token = window.localStorage.getItem("jwt_token");
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      fetch(`${API_URL}/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setStatus(data.status));
    }
  }, [status]);

  useEffect(() => {
    if (status === "complete") {
      completeOrder();
    }
  }, [status]);
  const completeOrder = async () => {
    const address = await fetch(`${API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        return res[0].address;
      });
    const checkout_id = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_method: "Stripe",
        shipping_address: address,
        total_amount: cartTotal / 100,
        cart_id: cartId,
      }),
    }).then((res) => {
      return res.json();
    });

    const getRandomTrackingNumber = (length = 9) => {
      // Check for valid length
      if (length <= 0 || !Number.isInteger(length)) {
        throw new Error("Invalid length: must be a positive integer.");
      }

      let digits = "";
      for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        digits += randomDigit;
      }
      return digits;
    };

    const order_id = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_date: dayjs().toISOString(),
        status: "processing",
        tracking_number: getRandomTrackingNumber(),
        checkout_id,
        user_id: userId,
      }),
    });
  };

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }
  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent. If you
          have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
  return null;
};
