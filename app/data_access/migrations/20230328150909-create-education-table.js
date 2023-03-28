'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('education',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        institute: {
          type: Sequelize.STRING,
          allowNull: false
        },
        degree: {
          type: Sequelize.STRING,
          allowNull: false
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: false
        },
        grade: {
          type: Sequelize.DOUBLE,
          allowNull: true,
          defaultValue: null,
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
    await queryInterface.dropTable('education');
  }
};
