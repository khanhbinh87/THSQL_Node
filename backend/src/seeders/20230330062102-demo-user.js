'use strict'

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
            'User',
            [
                {
                    username: 'test1',
                    password: '1',
                    email: 'test1@gmail.com',
                },
                {
                    username: 'test12',
                    password: '1',
                    email: 'test2@gmail.com',
                },
                {
                    username: 'test3',
                    password: '1',
                    email: 'test3@gmail.com',
                },
            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
