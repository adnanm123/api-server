'use strict';

const express = require('express'); // Importing the express package
const cors = require('cors'); // Importing the cors package
const app = express(); // singleton -> there can only be one
const sequelize = require('./models').sequelize; // Import the Sequelize instance from 'models' directory
const foodRoutes = require('./routes/food'); //Import the food.js file in the routes folder
const clothesRoutes = require('./routes/clothes'); //Import the clothes.js file in the routes folder
const notFoundHandler = require('./error-handlers/404'); //Import the 404.js file in the error-handler folder
const internalServerErrorHandler = require('./error-handlers/500');//Import the 500.js file in the error-handler folder
// Using Cors and Express
app.use(cors()); //sets up CORS middleware in your Express application.
app.use(express.json()); //configures Express to parse incoming JSON data. necessary to handle JSON data sent in requests

// Use your routes
app.use(foodRoutes);
app.use(clothesRoutes);

// Error handlers
app.use(notFoundHandler); // Handle 404 errors
app.use(internalServerErrorHandler); // Handle 500 errors

module.exports = {
  createServer: () => { //returns an object with two properties: 'app' and 'start'.
    return {
      app,
      start: (port, callback) => {
        sequelize
          .authenticate()//authenticate the Sequelize connection to the database,
          .then(() => {
            console.log('Connected to the database.');
            return sequelize.sync(); // Return the promise for synchronization
          })
          .then(() => {
            const server = app.listen(port, () => { //start the Express server listening on a specified port.
              console.log(`REST server is running on port ${port}`);
            });
            callback(server); // Pass the server instance to the callback
          })
          .catch((err) => {
            console.error('Database connection error:', err);
          });
      },
    };
  },
};
