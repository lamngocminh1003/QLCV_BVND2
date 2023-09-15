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
            "permissionRole",
            [
                {
                    permissionId: 1,
                    roleId: 1,
                },
                {
                    permissionId: 2,
                    roleId: 1,
                },
                {
                    permissionId: 3,
                    roleId: 1,
                },
                {
                    permissionId: 4,
                    roleId: 1,
                },
                {
                    permissionId: 1,
                    roleId: 2,
                },
                {
                    permissionId: 3,
                    roleId: 2,
                },
                {
                    permissionId: 4,
                    roleId: 2,
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
