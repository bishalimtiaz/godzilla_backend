const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');


const Settings = sequelize.define('settings',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        background_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'background',
                key: 'id',
              },
        },
        foreground_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'foreground',
                key: 'id',
              },
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
        tableName: 'settings'
    }
);

module.exports = Settings;
