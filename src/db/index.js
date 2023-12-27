const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

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

const allTables = (request, response) => {
  pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    (err, res) => {
      if (err) {
        console.error("Error executing query", err);
        return;
      }

      const tables = res.rows.map((row) => row.table_name);
      console.log("Tables:", tables);
    }
  );
};

module.exports = {
  getUsers,
  allTables,
  getUserById,
  createUser,
  updateUser,
};
