const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');


const SocialNetwork = sequelize.define('social_network',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        sn_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sn_logo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        base_url: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'social_network'
    }
);

module.exports = SocialNetwork;
