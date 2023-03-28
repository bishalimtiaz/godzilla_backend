'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('introduction', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
       resume: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
       years_of_experience: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      number_of_views: {
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

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('introduction');
  }
};
