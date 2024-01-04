const { pool } = require("./index");

const getCarts = (request, response) => {
  pool.query(`SELECT * FROM cart ORDER BY cart_id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getCartById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM cart WHERE cart_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
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
      throw error;
    }
    response.status(200).send(`Cart deleted with ID : ${id}`);
  });
};

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
