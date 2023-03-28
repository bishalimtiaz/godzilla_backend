const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Experience = sequelize.define('experience',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        contribution: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        company_url: {
            type: DataTypes.STRING,
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
    }, {
    tableName: 'experience',
    timestamps: false
});

module.exports = Experience;
