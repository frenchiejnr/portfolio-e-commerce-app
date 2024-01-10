const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

module.exports = (app) => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "e-commerce API",
      version: "1.0.0",
      description: "An API to use with your e-commerce site",
      contact: {
        name: "frenchiejnr",
        email: "frenchiejnr@gmail.com",
        url: "https://github.com/frenchiejnr",
      },
    },
    servers: [
      {
        url: "http://localhost:4001",
        description: "Development server",
      },
    ],
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["src/routes/*.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
