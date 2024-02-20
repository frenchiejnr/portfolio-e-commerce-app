const express = require("express");
const cartItemRouter = express.Router();
const db = require("../db/cart-items");
const { verifyToken } = require("../middleware");
module.exports = (app) => {
  app.use("/cart-item", verifyToken, cartItemRouter);
  /**
   * @swagger
   * "/cart-item/":
   *   get:
   *     tags:
   *     - cart-item
   *     summary: "Gets all cart-item"
   *     description: "Returns a JSON result of all the cart-item"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"
   */
  cartItemRouter.get("/", db.getCartItems);
  /**
   * @swagger
   * "/cart-item/{id}":
   *   get:
   *     tags:
   *     - cart-item
   *     summary: "Get a single cart-item"
   *     parameters:
   *       - name: "id"
   *         description: "The cart-item ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single cart-item"
   *       500:
   *         description: "Server Error"
   */
  cartItemRouter.get("/:id", db.getCartItemById);
  /**
   * @swagger
   * "/cart-item/":
   *   post:
   *     tags:
   *     - cart-item
   *     summary: "Create a new cart-item"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               added_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               quantity:
   *                 type: int
   *                 example: 2
   *               product_id:
   *                 type: int
   *                 example: 2
   *               cart_id:
   *                 type: int
   *                 example: 2
   *     responses:
   *       201:
   *         description: "cart-item Added"
   *       500:
   *         description: "cart-item Registration Failed"
   */
  cartItemRouter.post("/", db.createCartItem);
  /**
   * @swagger
   * "/cart-item/{id}":
   *   put:
   *     tags:
   *     - cart-item
   *     summary: "Update a cart-item"
   *     parameters:
   *       - name: "id"
   *         description: "The cart-item ID as an int"
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
   *               added_at:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               quantity:
   *                 type: int
   *                 example: 2
   *               product_id:
   *                 type: int
   *                 example: 2
   *               cart_id:
   *                 type: int
   *                 example: 2
   *     responses:
   *       200:
   *         description: "cart-item modified with ID : {id}"
   *       500:
   *         description: "cart-item Update Failed"
   */
  cartItemRouter.put("/:id", db.updateCartItem);
  /**
   * @swagger
   * "/cart-item/{id}":
   *   delete:
   *     tags:
   *     - cart-item
   *     summary: "Delete a cart-item"
   *     parameters:
   *       - name: "id"
   *         description: "The cart-item ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "cart-item deleted with ID : {id}"
   *       500:
   *         description: "cart-item Delete Failed"
   */
  cartItemRouter.delete("/:id", db.deleteCartItem);
};
