'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('experience',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        company_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        designation: {
          type: Sequelize.STRING,
          allowNull: false
        },
        from: {
          type: Sequelize.DATE,
          allowNull: false
        },
        to: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        contribution: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        company_url: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
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
    await queryInterface.dropTable('experience');
  }
};
