const passport = require("passport");
const { login } = require("../auth");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../db/users");
const { response } = require("express");
const session = require("express-session");
const { pool } = require("../db");

module.exports = (app) => {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const authUser = async (username, password, done) => {
    try {
      const user = await users.findUserByUsername(username);
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

  passport.deserializeUser((id, done) => {
    pool.query(
      `SELECT * FROM "user" WHERE user_id = $1`,
      [id.user_id],
      (err, user) => {
        if (err) {
          return done(err);
        }
        return done(null, user);
      }
    );
  });

  return passport;
};
