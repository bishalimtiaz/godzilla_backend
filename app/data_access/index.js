const { User, Role, UserRole } = require('./entities');
const { sequelize } = require('../config/database');
require('./associations');

const db = {
  User,
  Role,
  UserRole,
  sequelize,
};

module.exports = db;