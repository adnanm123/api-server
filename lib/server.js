"use strict";

const express = require("express");
const cors = require("cors");
const app = express(); 
const sequelize = require("./models").sequelize; 
const foodRoutes = require("./routes/food");
const clothesRoutes = require("./routes/clothes");
const ingredientsRoutes = require("./routes/ingredients");
const notFoundHandler = require("./error-handlers/404");
const internalServerErrorHandler = require("./error-handlers/500");
const ingredients = require("./models/ingredients");

app.use(cors());
app.use(express.json());

// Use your routes
app.use(foodRoutes);
app.use(clothesRoutes);
app.use(ingredientsRoutes);

// Error handlers
app.use(notFoundHandler); // Handle 404 errors
app.use(internalServerErrorHandler); // Handle 500 errors

module.exports = {
  createServer: () => {
    return {
      app,
      start: (port, callback) => {
        sequelize
          .authenticate()
          .then(() => {
            console.log("Connected to the database.");
            return sequelize.sync(); // Return the promise for synchronization
          })
          .then(() => {
            const server = app.listen(port, () => {
              console.log(`REST server is running on port ${port}`);
            });
            callback(server); // Pass the server instance to the callback
          })
          .catch((err) => {
            console.error("Database connection error:", err);
          });
      },
    };
  },
};
