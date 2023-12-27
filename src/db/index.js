const dotenv = require("dotenv");
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

      pool.end(); // Close the connection pool
    }
  );
};

module.exports = {
  getUsers,
  allTables,
};
