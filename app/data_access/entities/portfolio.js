const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Portfolio = sequelize.define('portfolio', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  end_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  default_portfolio_id: {
    type: DataTypes.UUID,
    allowNull: false,
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
}, {
  tableName: 'portfolio',
});


module.exports = Portfolio;