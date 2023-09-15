"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.user, {
        foreignKey: "personalSendId",
        as: "sender", // Đặt một biệt danh cho mối quan hệ này
      });

      task.belongsTo(models.user, {
        foreignKey: "personalReceiveId",
        as: "receiver", // Đặt một biệt danh cho mối quan hệ này
      });
      task.belongsTo(models.category);
    }
  }
  task.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      dateSend: DataTypes.DATE,
      dateEnd: DataTypes.DATE,
      personalSendId: DataTypes.INTEGER,
      personalReceiveId: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "task",
    }
  );
  return task;
};
