const express = require("express");
const cartRouter = express.Router();
const db = require("../db/cart");
module.exports = (app) => {
  app.use("/cart", cartRouter);

  /**
   * @swagger
   * "/cart/":
   *   get:
   *     tags:
   *     - cart
   *     summary: "Gets all carts"
   *     description: "Returns a JSON result of all the carts"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"
   */
  cartRouter.get("/", db.getCarts);
  /**
   * @swagger
   * "/cart/{id}":
   *   get:
   *     tags:
   *     - cart
   *     summary: "Get a single cart"
   *     parameters:
   *       - name: "id"
   *         description: "The cart ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single cart"
   *       500:
   *         description: "Server Error"
   */
  cartRouter.get("/:id", db.getCartById);
  /**
   * @swagger
   * "/cart/":
   *   post:
   *     tags:
   *     - cart
   *     summary: "Create a new cart"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               created_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               updated_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               user_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       201:
   *         description: "cart Added"
   *       500:
   *         description: "cart Registration Failed"
   */
  cartRouter.post("/", db.createCart);
  /**
   * @swagger
   * "/cart/{id}":
   *   put:
   *     tags:
   *     - cart
   *     summary: "Update a cart"
   *     parameters:
   *       - name: "id"
   *         description: "The cart ID as an int"
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
   *               created_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               updated_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               user_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       200:
   *         description: "cart modified with ID : {id}"
   *       500:
   *         description: "cart Update Failed"
   */
  cartRouter.put("/:id", db.updateCart);
  /**
   * @swagger
   * "/cart/{id}":
   *   delete:
   *     tags:
   *     - cart
   *     summary: "Delete a cart"
   *     parameters:
   *       - name: "id"
   *         description: "The cart ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "cart deleted with ID : {id}"
   *       500:
   *         description: "cart Delete Failed"
   */
  cartRouter.delete("/:id", db.deleteCart);
  cartRouter.get("/:id/cart-items", db.getCartItems);
  cartRouter.get("/:id/completed", db.getCartCheckout);
};
