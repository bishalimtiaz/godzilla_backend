'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_experiences', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      end_user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'end_user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      experience_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'experience',
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
    await queryInterface.dropTable('user_experiences');
  }
};
