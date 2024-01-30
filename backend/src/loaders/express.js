const express = require("express");
const session = require("express-session");
const cors = require("cors");
const flash = require("connect-flash");

module.exports = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(flash());

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  return app;
};
