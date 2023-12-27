const express = require("express");
const db = require("./db/index");
const app = express();
const userRouter = require("./routes/users");

const PORT = 4001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use("/users", userRouter);

app.get("/tables", db.allTables);
