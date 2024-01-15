const { pool } = require("./index");

const getCheckouts = (request, response) => {
  pool.query(
    `SELECT * FROM checkout ORDER BY checkout_id ASC`,
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to get checkouts" });
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getCheckoutById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM checkout WHERE checkout_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to get checkout" });

        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCheckout = async (request, response) => {
  const { payment_method, shipping_address, total_amount, cart_id, order_id } =
    request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO checkout (payment_method, shipping_address, total_amount) VALUES ($1,$2, $3) RETURNING checkout_id`;
    const res = await client.query(queryText, [
      payment_method,
      shipping_address,
      total_amount,
    ]);
    console.log(res.rows);

    const insertIntoCheckoutCart = `INSERT INTO checkout_cart (checkout_id, cart_id) VALUES ($1, $2)`;
    await client.query(insertIntoCheckoutCart, [
      res.rows[0].checkout_id,
      cart_id,
    ]);
    const insertIntoCheckoutOrder = `INSERT INTO checkout_order (checkout_id, order_id) VALUES ($1, $2)`;
    await client.query(insertIntoCheckoutOrder, [
      res.rows[0].checkout_id,
      order_id,
    ]);
    await client.query("COMMIT");
    response.status(201).send(`Checkout added`);
  } catch (e) {
    await client.query("ROLLBACK");
    response.status(500).json({ msg: "Failed to create checkout" });
    throw e;
  } finally {
    client.release();
  }
};
const updateCheckout = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { payment_method, shipping_address, total_amount } = request.body;

  pool.query(
    `UPDATE checkout SET payment_method = $1, shipping_address = $2, total_amount = $3 WHERE checkout_id = $4`,
    [payment_method, shipping_address, total_amount, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to update checkout" });
        throw error;
      }
      response.status(200).send(`Checkout modified with ID : ${id}`);
    }
  );
};
const deleteCheckout = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM checkout WHERE checkout_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to delete checkout" });
        throw error;
      }
      response.status(200).send(`Checkout deleted with ID : ${id}`);
    }
  );
};

module.exports = {
  getCheckouts,
  getCheckoutById,
  createCheckout,
  updateCheckout,
  deleteCheckout,
};
