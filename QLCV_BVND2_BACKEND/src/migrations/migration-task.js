"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("task", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateSend: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Giá trị mặc định là `CURRENT_TIMESTAMP`
      },
      dateEnd: {
        type: Sequelize.DATE,
      },
      personalSendId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      personalReceiveId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("task");
  },
};
