const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');



User.hasMany(UserRole);
UserRole.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);
