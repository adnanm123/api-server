'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Food = require('./food.js'); // Replace with your Food model file
const Clothes = require('./clothes.js'); // Replace with your Clothes model file

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // this is a singleton.

module.exports = {
  sequelize,
  FoodModel: Food(sequelize, DataTypes), // Replace 'Food' with your actual Food model
  ClothesModel: Clothes(sequelize, DataTypes) // Replace 'Clothes' with your actual Clothes model
};
