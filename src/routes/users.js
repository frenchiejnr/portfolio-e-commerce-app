const express = require("express");
const userRouter = express.Router();
const db = require("../db/users");

userRouter.get("/", db.getUsers);
userRouter.get("/:id", db.getUserById);
userRouter.post("/", db.createUser);
userRouter.put("/:id", db.updateUser);
userRouter.delete("/:id", db.deleteUser);
userRouter.get("/:id/orders", db.getUserOrders);
userRouter.get("/:id/orders/:order_id", db.getUserOrder);

module.exports = userRouter;
