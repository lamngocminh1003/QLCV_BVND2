"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define('permission', {
    permissionName: DataTypes.STRING,
  });

  permission.associate = (models) => {
    permission.belongsToMany(models.role, {
      through: 'permissionRole',
      foreignKey: 'permissionId',
    });
  };

  return permission;
};