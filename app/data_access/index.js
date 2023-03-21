const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');


const { sequelize,connect, disconnect } = require('../config/database');
require('./associations');

const db = {
  User,
  Role,
  UserRole,
  sequelize,
  connect,
  disconnect
};

module.exports = db;