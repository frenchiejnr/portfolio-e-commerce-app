const express = require("express");
const checkoutRouter = express.Router();
const db = require("../db/checkout");

checkoutRouter.get("/", db.getCheckouts);
checkoutRouter.get("/:id", db.getCheckoutById);
checkoutRouter.post("/", db.createCheckout);
checkoutRouter.put("/:id", db.updateCheckout);
checkoutRouter.delete("/:id", db.deleteCheckout);

module.exports = checkoutRouter;
