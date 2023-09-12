"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.task);
      user.belongsTo(models.department);
      user.belongsTo(models.role);
      user.belongsTo(models.position);
    }
  }
  user.init(
    {
      userName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      positionId: DataTypes.INTEGER,
      departmentId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      isActive: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
