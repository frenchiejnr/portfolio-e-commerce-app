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
  pool,
  allTables,
};
