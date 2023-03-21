const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database');

const UserRole = sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'role',
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
  tableName: 'user_role'
});

module.exports = UserRole;
