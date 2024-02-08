const userRouter = require("./users");
const productRouter = require("./products");
const orderRouter = require("./orders");
const cartItemRouter = require("./cart-item");
const cartRouter = require("./cart");
const checkoutRouter = require("./checkout");
const authRouter = require("./auth");

module.exports = (app, passport) => {
  authRouter(app, passport);
  userRouter(app);
  productRouter(app);
  orderRouter(app);
  cartItemRouter(app);
  cartRouter(app);
  checkoutRouter(app);

  const stripe = require("stripe")(`${process.env.STRIPE_CLIENT_SECRET}`);

  app.post("/create-checkout-session", async (req, res) => {
    const { price } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "My Order",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      ui_mode: "embedded",
      return_url: "http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}",
    });
    res.send({ clientSecret: session.client_secret });
  });
};
