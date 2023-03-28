const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');


const Skills = sequelize.define('skills',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        skill_logo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id',
              },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        tableName: 'skills'
    }
);

module.exports = Skills;
