const express = require("express");
const ordersRouter = express.Router();
const db = require("../db/orders");
const { forwardAuthenticated } = require("../auth");

module.exports = (app) => {
  app.use("/orders", forwardAuthenticated, ordersRouter);

  /**
   * @swagger
   * "/orders/":
   *   get:
   *     tags:
   *     - orders
   *     summary: "Gets all orders"
   *     description: "Returns a JSON result of all the orders"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"
   */
  ordersRouter.get("/", db.getOrders);
  /**
   * @swagger
   * "/orders/{id}":
   *   get:
   *     tags:
   *     - orders
   *     summary: "Get a single order"
   *     parameters:
   *       - name: "id"
   *         description: "The order ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single order"
   *       500:
   *         description: "Server Error"
   */
  ordersRouter.get("/:id", db.getOrderById);
  /**
   * @swagger
   * "/orders/":
   *   post:
   *     tags:
   *     - orders
   *     summary: "Create a new order"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               order_date:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               status:
   *                 type: string
   *                 example: processing
   *               tracking_number:
   *                 type: int
   *                 example: 947
   *               order_id:
   *                 type: int
   *                 example: 2
   *               checkout_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       201:
   *         description: "order Added"
   *       500:
   *         description: "order Registration Failed"
   */
  ordersRouter.post("/", db.createOrder);
  /**
   * @swagger
   * "/orders/{id}":
   *   put:
   *     tags:
   *     - orders
   *     summary: "Update a order"
   *     parameters:
   *       - name: "id"
   *         description: "The order ID as an int"
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
   *               order_date:
   *                 type: date
   *                 example: "2024-01-09T14:40:16.482Z"
   *               status:
   *                 type: string
   *                 example: processing
   *               tracking_number:
   *                 type: int
   *                 example: 948
   *               order_id:
   *                 type: int
   *                 example: 2
   *               checkout_id:
   *                 type: int
   *                 example: 10
   *     responses:
   *       200:
   *         description: "order modified with ID : {id}"
   *       500:
   *         description: "order Update Failed"
   */
  ordersRouter.put("/:id", db.updateOrder);
  /**
   * @swagger
   * "/orders/{id}":
   *   delete:
   *     tags:
   *     - orders
   *     summary: "Delete a order"
   *     parameters:
   *       - name: "id"
   *         description: "The order ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "order deleted with ID : {id}"
   *       500:
   *         description: "order Delete Failed"
   */
  ordersRouter.delete("/:id", db.deleteOrder);

  ordersRouter.get("/:id/items", db.orderItems);
};
