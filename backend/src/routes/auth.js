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
  authRouter.post("/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const response = await auth.login({
        username,
        password,
      });
      if (response.error) {
        console.log(response);
        return res.status(401).json(response);
      }
      console.log(response);
      res.status(200).json({ message: "Login successful!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
    }
  });
};
