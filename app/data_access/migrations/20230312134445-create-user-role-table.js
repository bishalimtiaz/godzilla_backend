'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_role', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_role');
  }
};
