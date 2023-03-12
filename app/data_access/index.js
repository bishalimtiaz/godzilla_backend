const User = require('./entities/User');
const Role = require('./entities/Role');
const UserRole = require('./entities/UserRole');

User.hasMany(UserRole);
UserRole.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

const db  = {
  User,
  Role,
  UserRole,
};

module.exports = db;
