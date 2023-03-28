'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('skills',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true
        },
        skill_name: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        skill_logo: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        category_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'category',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },

      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('skills');
  }
};
