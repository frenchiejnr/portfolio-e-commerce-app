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

  authRouter.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    (req, res) => {
      const userId = req.user.user_id;
      console.log(`Setting Auth Token`);
      res.cookie("auth_token", "authorised", {
        httpOnly: false,
        path: "/",
        expires: new Date(Date.now() + 3_600_000),
      });
      res.json({ id: userId });
    }
  );

  authRouter.post("/logout", (req, res) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
    });
    console.log(`-------> User Logged out`);
  });
};
