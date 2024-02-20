const express = require("express");
const authRouter = express.Router();
const auth = require("../auth");
const jwt = require("jsonwebtoken");

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
      const payload = { userId };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ id: userId, token });
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

  const verrifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = decoded; // Make decoded user data available in subsequent middleware
      next();
    });
  };
};
