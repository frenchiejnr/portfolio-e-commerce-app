const passport = require("passport");
const { login } = require("../auth");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    if (user.error) {
      done(JSON.stringify(user));
    } else {
      console.log(user);
      done(null, user.user_id);
    }
  });
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  return passport;
};
