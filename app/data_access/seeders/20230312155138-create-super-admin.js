'use strict';
const uuid = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash('1234!@#$', 10);
    const users = [
      {
        id: uuid.v4(),
        user_name: 'superadmin',
        email: 'super.admin@godzilla.com',
        password: hashedPassword,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('user', users, {});

    const superAdminRole = await queryInterface.rawSelect(
      'role',
      { where: { name: 'Super Admin' } },
      ['id']
    );

    const superAdminUser = await queryInterface.rawSelect(
      'user',
      { where: { email: 'super.admin@godzilla.com' } },
      ['id']
    );

    const userRoles = [
      {
        id: uuid.v4(),
        user_id: superAdminUser,
        role_id: superAdminRole,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('user_role', userRoles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role', null, {});
    await queryInterface.bulkDelete('user', null, {});
  }
};
