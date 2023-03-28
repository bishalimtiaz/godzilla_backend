'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      background_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'background',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      foreground_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'foreground',
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};
