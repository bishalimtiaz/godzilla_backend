'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('public_profile',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      
      public_url: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      end_user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'end_user',
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
    await queryInterface.dropTable('public_profile');
  }
};
