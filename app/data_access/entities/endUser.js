const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const EndUser = sequelize.define('end_user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  settings_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'settings',
      key: 'id',
    },
  },
  introduction_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'introduction',
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
}, {
  tableName: 'end_user',
});

module.exports = EndUser;
