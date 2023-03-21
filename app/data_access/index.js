const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');
const PortfolioCategory = require('./entities/portfolioCategory');
const EndUser = require('./entities/endUser');
const DefaultPortfolio = require('./entities/defaultPortfolio');
const Card = require('./entities/card');
const Portfolio = require('./entities/portfolio');







const { sequelize,connect, disconnect } = require('../config/database');
require('./associations');

const db = {
  User,
  Role,
  UserRole,
  PortfolioCategory,
  EndUser,
  DefaultPortfolio,
  Card,
  Portfolio,
  sequelize,
  connect,
  disconnect
};

module.exports = db;