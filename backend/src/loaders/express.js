const express = require("express");
const session = require("express-session");
const cors = require("cors");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  return app;
};
