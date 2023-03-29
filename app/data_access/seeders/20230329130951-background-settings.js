'use strict';
const uuid = require('uuid');
const BackgroundSettings = require('../../utils/backgroundSettings');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const backgroundSettings = [
      {
        id: uuid.v4(),
        background_name: BackgroundSettings.Default,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('background', backgroundSettings, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('background', null, {});
  }
};
