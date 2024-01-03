const express = require("express");
const cartItemRouter = express.Router();
const db = require("../db/cart-items");

cartItemRouter.get("/", db.getCartItems);
cartItemRouter.get("/:id", db.getCartItemById);
cartItemRouter.post("/", db.createCartItem);
cartItemRouter.put("/:id", db.updateCartItem);
cartItemRouter.delete("/:id", db.deleteCartItem);

module.exports = cartItemRouter;
