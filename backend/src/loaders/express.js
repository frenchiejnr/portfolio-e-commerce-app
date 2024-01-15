const express = require("express");
const session = require("express-session");

module.exports = (app) => {
  app.use(express.json());
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
