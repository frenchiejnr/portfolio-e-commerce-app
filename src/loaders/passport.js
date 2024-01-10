const passport = require("passport");
const { login } = require("../auth");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await login({ username, password });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  return passport;
};
