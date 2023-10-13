"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "department",
      [
        {
          departmentName: "Phòng giám đốc",
        },
        {
          departmentName: "Phòng It",
        },
        {
          departmentName: "Tiêu Hoá 3",
        },
        {
          departmentName: "Dinh Dưỡng 2",
        },
        {
          departmentName: "Nhiễm",
        },
        {
          departmentName: "Tiêu Hoá 2",
        },
        {
          departmentName: "Sơ Sinh",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
