const express = require("express");
const app = express();
const loaders = require("./loaders");
const PORT = 4001;

const startServer = async () => {
  // Initialise Loaders
  loaders(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();
