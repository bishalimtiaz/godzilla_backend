const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');


const Introduction = sequelize.define('introduction',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        years_of_experience: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        number_of_views: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
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
    },
    {
        tableName: 'introduction',
        timestamps: false
    }
);

module.exports = Introduction;
