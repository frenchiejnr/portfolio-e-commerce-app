const passport = require("passport");
const { login } = require("../auth");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../db/users");
const { response } = require("express");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const authUser = async (username, password, done) => {
    try {
      const user = await users.findUserByUsername(username);
      console.log(user);

      if (!user) {
        console.log(`{ error: "Incorrect username or password." }`);
        return done(null, false);
      }
      if (user.password !== password) {
        console.log(`{ error: "Incorrect username or password." }`);
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.error(err); // Log the error for debugging
      return { error: "Internal server error." }; // Generic error message for users
    }
  };
  passport.use(new LocalStrategy(authUser));
  passport.serializeUser((userObj, done) => {
    done(null, userObj);
  });
  passport.deserializeUser((userObj, done) => {
    done(null, userObj);
  });

  checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

  checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
  };

  return passport;
};
