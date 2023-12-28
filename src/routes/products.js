const express = require("express");
const productRouter = express.Router();
const db = require("../db/index");

productRouter.get("/", db.getProducts);
productRouter.get("/:id", db.getProductById);
productRouter.post("/", db.createProduct);
productRouter.put("/:id", db.updateProduct);
productRouter.delete("/:id", db.deleteProduct);

module.exports = productRouter;
