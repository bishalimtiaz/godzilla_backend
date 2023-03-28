'use strict';
const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const roles = [
      {
        id: uuid.v4(),
        name: 'Super Admin',
        description: 'Super Admin Role',
        created_at: now,
        updated_at: now,
      },
      {
        id: uuid.v4(),
        name: 'Admin',
        description: 'Admin Role',
        created_at: now,
        updated_at: now,
      },
      {
        id: uuid.v4(),
        name: 'Card User',
        description: 'Card User Role',
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('role', roles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  }
};
