const { pool } = require("./index");

const getCarts = async (request, response) => {
  try {
    await pool.query(
      `SELECT * FROM cart ORDER BY cart_id ASC`,
      (error, results) => {
        console.log(`Fetched Carts`);
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(`Fetching Carts Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching Carts Failed" });
  }
};
const getCartById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    await pool.query(
      `SELECT * FROM cart WHERE cart_id = $1`,
      [id],
      (error, results) => {
        console.log(`Fetched Cart ${id}`);
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(`Fetching Cart Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching Cart Failed" });
  }
};

const createCart = async (request, response) => {
  const { created_at, updated_at, user_id } = request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO cart (created_at, updated_at) VALUES ($1,$2) RETURNING cart_id`;
    const res = await client.query(queryText, [created_at, updated_at]);
    console.log(res.rows);

    const insertJoiningTableText = `INSERT INTO user_cart (user_id, cart_id) VALUES ($1, $2)`;
    await client.query(insertJoiningTableText, [user_id, res.rows[0].cart_id]);
    await client.query("COMMIT");
    response.status(201).send(`Cart added`);
  } catch (e) {
    await client.query("ROLLBACK");
    response.status(500).json({ msg: "Failed to add cart" });
    throw e;
  } finally {
    client.release();
  }
};
const updateCart = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { created_at, updated_at } = request.body;

  pool.query(
    `UPDATE cart SET created_at = $1, updated_at = $2 WHERE cart_id = $3`,
    [created_at, updated_at, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to update cart" });
        throw error;
      }
      response.status(200).send(`Cart modified with ID : ${id}`);
    }
  );
};
const deleteCart = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(`DELETE FROM cart WHERE cart_id = $1`, [id], (error, results) => {
    if (error) {
      response.status(500).json({ msg: "Failed to delete cart" });
      throw error;
    }
    response.status(200).send(`Cart deleted with ID : ${id}`);
  });
};

const getCartItems = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const statement = `
    SELECT quantity, added_at, price, name, image_url, p.product_id, cci.cart_item_id FROM cart_cartitem cci 
    JOIN cart_item ci ON cci.cart_item_id = ci.cart_item_id
    JOIN product_cartitem pci ON ci.cart_item_id = pci.cart_item_id
    JOIN product p ON pci.product_id = p.product_id
    WHERE cart_id = $1`;
    const values = [id];
    await pool.query(statement, values, (error, results) => {
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error(`Fetching CartItems Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching CartItems Failed" });
  }
};

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  getCartItems,
};
