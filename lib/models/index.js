"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Food = require("./food.js");
const Clothes = require("./clothes.js");
const Ingredients = require("./ingredients.js");

const SQL_CONNECTION_STRING =
  process.env.SQL_CONNECTION_STRING || "sqlite:memory:";

const sequelize = new Sequelize(SQL_CONNECTION_STRING);

module.exports = {
  sequelize,
  FoodModel: Food(sequelize, DataTypes),
  ClothesModel: Clothes(sequelize, DataTypes),
  IngredientsModel: Ingredients(sequelize, DataTypes),
};
