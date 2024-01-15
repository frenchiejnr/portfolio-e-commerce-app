const express = require("express");
const checkoutRouter = express.Router();
const db = require("../db/checkout");
module.exports = (app) => {
  app.use("/checkout", checkoutRouter);

  /**
   * @swagger
   * "/checkout/":
   *   get:
   *     tags:
   *     - checkout
   *     summary: "Gets all checkouts"
   *     description: "Returns a JSON result of all the checkouts"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"
   */
  checkoutRouter.get("/", db.getCheckouts);
  /**
   * @swagger
   * "/checkout/{id}":
   *   get:
   *     tags:
   *     - checkout
   *     summary: "Get a single checkout"
   *     parameters:
   *       - name: "id"
   *         description: "The checkout ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single checkout"
   *       500:
   *         description: "Server Error"
   */
  checkoutRouter.get("/:id", db.getCheckoutById);
  /**
   * @swagger
   * "/checkout/":
   *   post:
   *     tags:
   *     - checkout
   *     summary: "Create a new checkout"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               payment_method:
   *                 type: string
   *                 example: "Debit Card"
   *               shipping_address:
   *                 type: string
   *                 example: "9325 Vicente Ranch"
   *               total_amount:
   *                 type: decimal
   *                 example: "947.23"
   *               cart_id:
   *                 type: int
   *                 example: 2
   *               checkout_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       201:
   *         description: "checkout Added"
   *       500:
   *         description: "checkout Registration Failed"
   */
  checkoutRouter.post("/", db.createCheckout);
  /**
   * @swagger
   * "/checkout/{id}":
   *   put:
   *     tags:
   *     - checkout
   *     summary: "Update a checkout"
   *     parameters:
   *       - name: "id"
   *         description: "The checkout ID as an int"
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
   *               payment_method:
   *                 type: string
   *                 example: "Debit Card"
   *               shipping_address:
   *                 type: string
   *                 example: "9325 Vicente Ranch"
   *               total_amount:
   *                 type: decimal
   *                 example: "947.23"
   *               cart_id:
   *                 type: int
   *                 example: 2
   *               checkout_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       200:
   *         description: "checkout modified with ID : {id}"
   *       500:
   *         description: "checkout Update Failed"
   */
  checkoutRouter.put("/:id", db.updateCheckout);
  /**
   * @swagger
   * "/checkout/{id}":
   *   delete:
   *     tags:
   *     - checkout
   *     summary: "Delete a checkout"
   *     parameters:
   *       - name: "id"
   *         description: "The checkout ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "checkout deleted with ID : {id}"
   *       500:
   *         description: "checkout Delete Failed"
   */
  checkoutRouter.delete("/:id", db.deleteCheckout);
};
