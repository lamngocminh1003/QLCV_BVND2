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
            "permission",
            [
                {
                    permissionName: "Tạo người dùng",
                },
                {
                    permissionName: "Xóa người dùng",
                },
                {
                    permissionName: "Sửa người dùng",
                },
                {
                    permissionName: "Xem người dùng",
                },
                {
                    permissionName: "Thêm vai trò",
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
        await queryInterface.bulkDelete("permission", null, {})
    },
};
