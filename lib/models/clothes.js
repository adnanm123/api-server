'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clothes = sequelize.define('Clothes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
  });

  return Clothes;
};
