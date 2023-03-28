'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('social_network', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      sn_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sn_logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('social_network');
  }
};
