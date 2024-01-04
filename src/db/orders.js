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
const createOrder = async (request, response) => {
  const { order_date, status, tracking_number, user_id, checkout_id } =
    request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO "order" (order_date, status, tracking_number) VALUES ($1,$2,$3) RETURNING order_id`;
    const res = await client.query(queryText, [
      order_date,
      status,
      tracking_number,
    ]);
    console.log(res.rows);

    const insertIntoUserOrder = `INSERT INTO User_Order (user_id, order_id) VALUES ($1, $2)`;
    await client.query(insertIntoUserOrder, [user_id, res.rows[0].order_id]);
    const insertIntoCheckoutOrder = `INSERT INTO checkout_order (checkout_id, order_id) VALUES ($1, $2)`;
    await client.query(insertIntoCheckoutOrder, [
      checkout_id,
      res.rows[0].order_id,
    ]);
    await client.query("COMMIT");
    response.status(201).send(`Order added`);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
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
