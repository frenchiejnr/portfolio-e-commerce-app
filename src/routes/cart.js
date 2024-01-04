const express = require("express");
const cartRouter = express.Router();
const db = require("../db/cart");

cartRouter.get("/", db.getCarts);
cartRouter.get("/:id", db.getCartById);
cartRouter.post("/", db.createCart);
cartRouter.put("/:id", db.updateCart);
cartRouter.delete("/:id", db.deleteCart);

module.exports = cartRouter;
