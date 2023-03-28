const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database');

const UserEducations = sequelize.define('user_educations', {
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
  education_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'education',
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
  tableName: 'user_educations'
});

module.exports = UserEducations;
