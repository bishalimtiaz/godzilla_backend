const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database');

const UserSkills = sequelize.define('user_skills', {
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
  skills_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'skills',
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
  tableName: 'user_skills'
});

module.exports = UserSkills;
