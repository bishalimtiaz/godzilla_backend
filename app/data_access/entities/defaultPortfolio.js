const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const PortfolioCategory = require('./portfolioCategory');

const DefaultPortfolio = sequelize.define('default_portfolio', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
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
  tableName: 'default_portfolio',
});


module.exports = DefaultPortfolio;
