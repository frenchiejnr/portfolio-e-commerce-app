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
      res.json({ id: userId });
    }
  );

  authRouter.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
    console.log(`-------> User Logged out`);
  });
};
