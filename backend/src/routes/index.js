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
};
