const express = require("express");
const productRouter = express.Router();
const db = require("../db/products");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
  app.use("/products", productRouter);

  /**
   * @swagger
   * "/products/":
   *   get:
   *     tags: 
   *     - products
   *     summary: "Gets all products"
   *     description: "Returns a JSON result of all the products"
   *     responses:
   *       200:
   *         description: "JSON Returned"
   *       500:
   *         description: "Server Error"

   */
  productRouter.get("/", db.getProducts);
  /**
   * @swagger
   * "/products/{id}":
   *   get:
   *     tags:
   *     - products
   *     summary: "Get a single products"
   *     parameters:
   *       - name: "id"
   *         description: "The products ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "JSON of a single products"
   *       500:
   *         description: "Server Error"
   */
  productRouter.get("/:id", db.getProductById);
  /**
   * @swagger
   * "/products/":
   *   post:
   *     tags:
   *     - products
   *     summary: "Create a new products"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: randomProduct
   *               description:
   *                 type: string
   *                 example: "randomproductdescription"
   *               price:
   *                 type: decimal
   *                 example: 42.50
   *               stock_level:
   *                 type: int
   *                 example: 7
   *               image_url:
   *                 type: string
   *                 example: http://placeimg.com/640/480
   *     responses:
   *       201:
   *         description: "Products Added"
   *       500:
   *         description: "Failed to add Product"
   */
  productRouter.post("/", verifyToken, db.createProduct);
  /**
   * @swagger
   * "/products/{id}":
   *   put:
   *     tags:
   *     - products
   *     summary: "Update a product"
   *     parameters:
   *       - name: "id"
   *         description: "The products ID as an int"
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
   *               name:
   *                 type: string
   *                 example: randomProduct
   *               description:
   *                 type: string
   *                 example: "randomproductdescription"
   *               price:
   *                 type: decimal
   *                 example: 42.50
   *               stock_level:
   *                 type: int
   *                 example: 7
   *               image_url:
   *                 type: string
   *                 example: http://placeimg.com/640/480
   *     responses:
   *       200:
   *         description: "Product modified with ID : {id}"
   *       500:
   *         description: "Product Update Failed"
   */
  productRouter.put("/:id", verifyToken, db.updateProduct);
  /**
   * @swagger
   * "/products/{id}":
   *   delete:
   *     tags:
   *     - products
   *     summary: "Delete a product"
   *     parameters:
   *       - name: "id"
   *         description: "The product ID as an int"
   *         in: path
   *         required: true
   *         type: int
   *         example: "1"
   *     responses:
   *       200:
   *         description: "Product deleted with ID : {id}"
   *       500:
   *         description: "Product Delete Failed"
   */
  productRouter.delete("/:id", verifyToken, db.deleteProduct);
};
