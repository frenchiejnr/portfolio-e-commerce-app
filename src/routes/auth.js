const express = require("express");
const authRouter = express.Router();
const auth = require("../auth");

// Instantiate Services

module.exports = (app, passport) => {
  app.use("/auth", authRouter);

  // Registration Endpoint
  authRouter.post("/register", async (req, res, next) => {
    try {
      const data = req.body;

      const response = await auth.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  // Login Endpoint
  authRouter.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;

        const response = await auth.login({
          username,
          password,
        });

        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
