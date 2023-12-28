const { pool } = require("./index");

const getOrders = (request, response) => {
  pool.query(
    `SELECT * FROM "order" ORDER BY order_id ASC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getOrderById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM "order" WHERE order_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createOrder = (request, response) => {
  const { order_date, status, tracking_number } = request.body;

  pool.query(
    `INSERT INTO "order" (order_date, status, tracking_number) VALUES ($1,$2,$3)`,
    [order_date, status, tracking_number],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Order added`);
    }
  );
};
const updateOrder = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { order_date, status, tracking_number } = request.body;

  pool.query(
    `UPDATE "order" SET order_date = $1, status = $2, tracking_number = $3 WHERE order_id = $4`,
    [order_date, status, tracking_number, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order modified with ID : ${id}`);
    }
  );
};
const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM "order" WHERE order_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order deleted with ID : ${id}`);
    }
  );
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
