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
      "position",
      [
        {
          positionName: "IT",
        },
        {
          positionName: "Lễ tân",
        },
        {
          positionName: "Bác sĩ"
        },
        {
          positionName: "Dược sĩ",
        },
        {
          positionName: "Điều dưỡng",
        },
        {
          positionName: "Kỹ thuật viên",
        },
        {
          positionName: "Kết nối xét nghiệm",
        },
        {
          positionName: "Kế toán",
        },
        {
          positionName: "Thủ kho",
        },
        {
          positionName: "Bảo vệ",
        },
        {
          positionName: "Khác",
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
