'use strict';
const uuid = require('uuid');
const ForegroundSettings = require('../../utils/foregroundSettings');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const foreroundSettings = [
      {
        id: uuid.v4(),
        color_scheme: ForegroundSettings.Default,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('foreground', foreroundSettings, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foreground', null, {});
  }
};
