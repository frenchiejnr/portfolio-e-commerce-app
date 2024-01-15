const routesLoader = require("../routes");
const expressLoader = require("./express");
const passportLoader = require("./passport");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
  // Load Express middlewares
  const expressApp = await expressLoader(app);
  const passport = await passportLoader(expressApp);

  await routesLoader(app, passport);
  await swaggerLoader(app);
};
