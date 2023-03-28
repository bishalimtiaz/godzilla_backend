const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database');

const UserExperiences = sequelize.define('user_experiences', {
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
  experience_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'experience',
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
  tableName: 'user_experiences'
});

module.exports = UserExperiences;
