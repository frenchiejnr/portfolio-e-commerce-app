const express = require("express");
const ordersRouter = express.Router();
const db = require("../db/orders");

ordersRouter.get("/", db.getOrders);
ordersRouter.get("/:id", db.getOrderById);
ordersRouter.post("/", db.createOrder);
ordersRouter.put("/:id", db.updateOrder);
ordersRouter.delete("/:id", db.deleteOrder);

module.exports = ordersRouter;
