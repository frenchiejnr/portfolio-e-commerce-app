const { pool } = require("./index");

const getUsers = (request, response) => {
  pool.query(`SELECT * FROM "user" ORDER BY user_id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM "user" WHERE user_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createUser = (request, response) => {
  const { username, password, email, address } = request.body;

  pool.query(
    `INSERT INTO "user" (username, password, email, address) VALUES ($1,$2,$3,$4)`,
    [username, password, email, address],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added`);
    }
  );
};
const updateUser = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { username, password, email, address } = request.body;

  pool.query(
    `UPDATE "user" SET username = $1, password = $2, email = $3, address = $4 WHERE user_id = $5`,
    [username, password, email, address, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID : ${id}`);
    }
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM "user" WHERE user_id = $1`,
    [id],
    (error, results) => {
      if (error) {
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
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserOrder,
};
