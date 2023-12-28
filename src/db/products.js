const { pool } = require(".");

const getProducts = (request, response) => {
  pool.query(
    `SELECT * FROM product ORDER BY product_id ASC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM product WHERE product_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createProduct = (request, response) => {
  const { name, description, price, stock_level, image_url } = request.body;

  pool.query(
    `INSERT INTO product (name,
        description,
        price,
        stock_level,
        image_url) VALUES ($1,$2,$3,$4, $5)`,
    [name, description, price, stock_level, image_url],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Product added`);
    }
  );
};
const updateProduct = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { name, description, price, stock_level, image_url } = request.body;

  pool.query(
    `UPDATE product SET name = $1, description = $2, price = $3, stock_level = $4, image_url= $5 WHERE product_id = $6`,
    [name, description, price, stock_level, image_url, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product modified with ID : ${id}`);
    }
  );
};
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM product WHERE product_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product deleted with ID : ${id}`);
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
