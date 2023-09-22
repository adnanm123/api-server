'use strict';

const { Sequelize, DataTypes } = require('sequelize'); //imports 'sequelize' library& extracts Sequelize and DataTypes objs
const Food = require('./food.js'); // imports food mudule
const Clothes = require('./clothes.js'); // imports clothes mudule

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:'; //hold the connection string used to connect to a database.

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // this is a singleton.

module.exports = { // makes these objects accessible to other parts of the application.
  sequelize,
  FoodModel: Food(sequelize, DataTypes), //invokes the Food function with the sequelize and DataTypes objects as arguments.
  ClothesModel: Clothes(sequelize, DataTypes) //invokes the Clothes function with the sequelize and DataTypes objects as arguments.
};
