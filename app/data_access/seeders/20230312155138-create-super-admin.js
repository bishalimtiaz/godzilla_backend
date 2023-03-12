'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const users = [
      {
        id: uuid.v4(),
        userName: 'superadmin',
        email: 'super.admin@godzilla.com',
        password: 'superadminpassword',
        isActive: true,
        createdAt: now,
        updatedAt: now,
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
        userId: superAdminUser,
        roleId: superAdminRole,
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert('UserRole', userRoles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRole', null, {});
    await queryInterface.bulkDelete('user', null, {});
  }
};
