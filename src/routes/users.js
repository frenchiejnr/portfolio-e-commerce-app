const express = require("express");
const userRouter = express.Router();
const db = require("../db/index");

userRouter.get("/", db.getUsers);
userRouter.get("/:id", db.getUserById);
userRouter.post("/", db.createUser);
userRouter.put("/:id", db.updateUser);
userRouter.delete("/:id", db.deleteUser);

module.exports = userRouter;
