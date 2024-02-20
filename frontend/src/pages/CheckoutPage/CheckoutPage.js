import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/index";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

export const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cartTotal = useSelector((state) => state.cart.total);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt_token");
    // Create a Checkout Session as soon as the page loads
    fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        price: parseInt(cartTotal),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };
  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};
