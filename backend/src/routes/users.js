const express = require("express");
const userRouter = express.Router();
const db = require("../db/users");

module.exports = (app) => {
  app.use("/users", userRouter);

  /**
   * @swagger
   * "/users/":
   *   get:
   *     tags:
   *     - users
   *     summary: "Gets all Users"
   *     description: "Returns a JSON result of all the Users"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"
   */
  userRouter.get("/", db.getUsers);
  /**
   * @swagger
   * "/users/{id}":
   *   get:
   *     tags:
   *     - users
   *     summary: "Get a single user"
   *     parameters:
   *       - name: "id"
   *         description: "The user ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single user"
   *       500:
   *         description: "Server Error"
   */
  userRouter.get("/:id", db.getUserById);
  /**
   * @swagger
   * "/users/":
   *   post:
   *     tags:
   *     - users
   *     summary: "Create a new user"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: johndoe
   *               password:
   *                 type: string
   *                 format: password
   *                 example: mysecretpassword
   *               email:
   *                 type: string
   *                 format: email
   *                 example: johndoe@example.com
   *               address:
   *                 type: string
   *                 example: 123 Main St, Anytown, CA 12345
   *     responses:
   *       201:
   *         description: "User Added"
   *       500:
   *         description: "User Registration Failed"
   */
  userRouter.post("/", db.createUser);
  /**
   * @swagger
   * "/users/{id}":
   *   put:
   *     tags:
   *     - users
   *     summary: "Update a user"
   *     parameters:
   *       - name: "id"
   *         description: "The user ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: johndoe
   *               password:
   *                 type: string
   *                 format: password
   *                 example: mysecretpassword
   *               email:
   *                 type: string
   *                 format: email
   *                 example: johndoe@example.com
   *               address:
   *                 type: string
   *                 example: 123 Main St, Anytown, CA 12345
   *     responses:
   *       200:
   *         description: "User modified with ID : {id}"
   *       500:
   *         description: "User Update Failed"
   */
  userRouter.put("/:id", db.updateUser);
  /**
   * @swagger
   * "/users/{id}":
   *   delete:
   *     tags:
   *     - users
   *     summary: "Delete a user"
   *     parameters:
   *       - name: "id"
   *         description: "The user ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "User deleted with ID : {id}"
   *       500:
   *         description: "User Delete Failed"
   */
  userRouter.delete("/:id", db.deleteUser);
  /**
   * @swagger
   * "/users/{id}/orders":
   *   get:
   *     tags:
   *     - users
   *     summary: "Get all user orders"
   *     parameters:
   *       - name: "id"
   *         description: "The user ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a users orders"
   *       500:
   *         description: "Server Error"
   */
  userRouter.get("/:id/orders", db.getUserOrders);
  /**
   * @swagger
   * "/users/{id}/orders/{orderid}":
   *   get:
   *     tags:
   *     - users
   *     summary: "Get a users order"
   *     parameters:
   *       - name: "id"
   *         description: "The user ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "2"
   *       - name: "orderid"
   *         description: "The order ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "18"
   *     responses:
   *       200:
   *         description: "JSON of a user order"
   *       500:
   *         description: "Server Error"
   */
  userRouter.get("/:id/orders/:order_id", db.getUserOrder);
  userRouter.get("/:id/cart", db.getUserCart);
};
