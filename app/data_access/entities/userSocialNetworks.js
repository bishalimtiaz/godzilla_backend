const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database');

const UserSocialNetworks = sequelize.define('user_social_networks', 
{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  end_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'end_user',
      key: 'id',
    },
  },
  social_network_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'social_network',
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
  tableName: 'user_social_networks',
  timestamps: false
});

module.exports = UserSocialNetworks;
