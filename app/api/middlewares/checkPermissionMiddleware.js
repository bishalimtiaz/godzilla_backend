const { ForbiddenError } = require('../../domain/exceptions');

const checkPermissionMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      throw new ForbiddenError(`User does not have permission to access this resource.`);
    }
    next();
  }
};

module.exports = checkPermissionMiddleware;
