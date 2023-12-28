const express = require("express");
const productRouter = express.Router();
const db = require("../db/index");

productRouter.get("/", db.getProducts);
// productRouter.get("/:id", );
// productRouter.post("/", );
// productRouter.put("/:id", );
// productRouter.delete("/:id", );

module.exports = productRouter;
