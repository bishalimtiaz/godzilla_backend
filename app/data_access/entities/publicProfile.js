const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');


const PublicProfile = sequelize.define('public_profile',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        public_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'end_user',
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
        tableName: 'public_profile',
        timestamps: false
    }
);

module.exports = PublicProfile;
