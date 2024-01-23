const { pool } = require("./index");

const getUsers = async (request, response) => {
  try {
    await pool.query(
      `SELECT * FROM "user" ORDER BY user_id ASC`,
      (error, results) => {
        console.log(`Fetched Users`);
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(`Fetching Users Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching Users Failed" });
  }
};
const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    await pool.query(
      `SELECT * FROM "user" WHERE user_id = $1`,
      [id],
      (err, results) => {
        console.log(`Fetched User ${id}`);
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(`Fetching User Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching User Failed" });
  }
};
const createUser = async (request, response) => {
  const { username, password, email, address } = request.body;

  try {
    await pool.query(
      `INSERT INTO "user" (username, password, email, address) VALUES ($1,$2,$3,$4)`,
      [username, password, email, address]
    );
    console.log(`User added`);
    response.status(201).json({ msg: `User added` });
  } catch (error) {
    console.error(`User Registration Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "User Registration Failed" });
  }
};
const updateUser = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { username, password, email, address } = request.body;
  try {
    pool.query(
      `UPDATE "user" SET username = $1, password = $2, email = $3, address = $4 WHERE user_id = $5`,
      [username, password, email, address, id],
      (error, results) => {
        if (error) {
          response.status(500).json({ msg: "User Update Failed" });
          throw error;
        }
        response.status(200).send(`User modified with ID : ${id}`);
      }
    );
  } catch (error) {}
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM "user" WHERE user_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "User Delete Failed" });
        throw error;
      }
      response.status(200).send(`User deleted with ID : ${id}`);
    }
  );
};

const getUserOrders = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT user_id, order_id
FROM user_order
WHERE user_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500);
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getUserOrder = (request, response) => {
  const id = parseInt(request.params.id);
  const order_id = parseInt(request.params.order_id);

  pool.query(
    `SELECT "order".order_id,	order_date,	status,	tracking_number
FROM user_order
JOIN "order"
ON user_order.order_id = "order".order_id
WHERE user_id = $1 AND "order".order_id = $2;`,
    [id, order_id],
    (error, results) => {
      if (error) {
        response.status(500);
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const findUserByUsername = async (username) => {
  try {
    const statement = `SELECT * 
      FROM "user" 
      WHERE username = $1`;
    const values = [username];

    const result = await pool.query(statement, values);
    if (result.rows?.length) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    throw new Error(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserOrder,
  findUserByUsername,
};
