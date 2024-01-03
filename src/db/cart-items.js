const { pool } = require("./index");

const getCartItems = (request, response) => {
  pool.query(
    `SELECT * FROM cart_item ORDER BY cart_item_id ASC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getCartItemById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM cart_item WHERE cart_item_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCartItem = async (request, response) => {
  const { quantity, added_at, product_id } = request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO cart_item (quantity, added_at) VALUES ($1,$2) RETURNING cart_item_id`;
    const res = await client.query(queryText, [quantity, added_at]);
    console.log(res.rows);

    const insertJoiningTableText = `INSERT INTO product_cartitem (product_id, cart_item_id) VALUES ($1, $2)`;
    await client.query(insertJoiningTableText, [
      product_id,
      res.rows[0].cart_item_id,
    ]);
    await client.query("COMMIT");
    response.status(201).send(`CartItem added`);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
const updateCartItem = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { quantity, added_at } = request.body;

  pool.query(
    `UPDATE cart_item SET quantity = $1, added_at = $2 WHERE cart_item_id = $3`,
    [quantity, added_at, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`CartItem modified with ID : ${id}`);
    }
  );
};
const deleteCartItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM cart_item WHERE cart_item_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`CartItem deleted with ID : ${id}`);
    }
  );
};

module.exports = {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
};
