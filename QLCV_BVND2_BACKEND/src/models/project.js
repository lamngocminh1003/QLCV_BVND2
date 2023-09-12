"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsToMany(models.user, {
        through: "projectUser",
      });
      project.belongsTo(models.user);
    }
  }
  project.init(
    {
      name: DataTypes.STRING,
      des: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      startDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return project;
};
