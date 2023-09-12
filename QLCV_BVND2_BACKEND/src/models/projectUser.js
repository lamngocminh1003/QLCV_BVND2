"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projectUser.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "projectUser",
    }
  );
  return projectUser;
};
