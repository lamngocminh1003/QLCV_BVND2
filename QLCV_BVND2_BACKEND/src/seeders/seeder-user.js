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
      "user",
      [
        {
          userName: "Minh",
          fullName: "Ngọc Minh",
          password: "123",
          phone: "0708079427",
          email: "minh@gmail.com",
          roleId: 1,
          positionId: 1,
          departmentId: 1,
        },
        {
          userName: "Phú",
          fullName: "Lâm Phú",
          password: "123",
          phone: "0708079400",
          email: "phu@gmail.com",
          roleId: 2,
          positionId: 2,
          departmentId: 2,
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
