const express = require("express");
const db = require("./db/index");
const app = express();

const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const cartItemRouter = require("./routes/cart-item");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");

const PORT = 4001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/cart-item", cartItemRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

app.get("/tables", db.allTables);
