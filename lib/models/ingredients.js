'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  });

  Ingredients.associate = (models) => {
    Ingredients.belongsTo(models.Food); // Establish a one-to-many relationship with Food
  };

  return Ingredients;
};
