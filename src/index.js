const express = require("express");
const db = require("./db/index");
const app = express();

const PORT = 4001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.get("/tables", db.allTables);
