"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    roleName: DataTypes.STRING,
  });

  role.associate = (models) => {
    role.belongsToMany(models.permission, {
      through: 'permissionRole',
      foreignKey: 'roleId',
    });
  };

  return role;
};