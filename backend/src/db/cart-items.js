const { pool } = require("./index");

const getCartItems = (request, response) => {
  pool.query(
    `SELECT * FROM cart_item ORDER BY cart_item_id ASC`,
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to get cart_items" });
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
        response.status(500).json({ msg: "Failed to get cart_item" });

        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCartItem = async (request, response) => {
  const { quantity, added_at, product_id, cart_id } = request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO cart_item (quantity, added_at) VALUES ($1,$2) RETURNING cart_item_id`;
    const res = await client.query(queryText, [quantity, added_at]);

    const insertJoiningTableText = `INSERT INTO product_cartitem (product_id, cart_item_id) VALUES ($1, $2)`;
    await client.query(insertJoiningTableText, [
      product_id,
      res.rows[0].cart_item_id,
    ]);
    const insertIntoCartCartItem = `INSERT INTO cart_cartitem (cart_id, cart_item_id) VALUES ($1, $2)`;
    await client.query(insertIntoCartCartItem, [
      cart_id,
      res.rows[0].cart_item_id,
    ]);

    await client.query("COMMIT");
    response.status(201).send(`CartItem added`);
  } catch (e) {
    await client.query("ROLLBACK");
    response.status(500).json({ msg: "Failed to add cart_item" });

    throw e;
  } finally {
    client.release();
  }
};
const updateCartItem = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { field, value } = request.body;
    const statement = `UPDATE cart_item SET ${field} = $1 WHERE cart_item_id = $2`;
    const values = [value, id];
    await pool.query(statement, values, (error, results) => {
      response.status(200).send(`CartItem modified with ID : ${id}`);
    });
  } catch (error) {
    if (error) {
      response.status(500).json({ msg: "Failed to update cart_item" });
      throw error;
    }
  }
};
const deleteCartItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM cart_item WHERE cart_item_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to delete cart_item" });

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
