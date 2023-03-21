const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../../domain/exceptions/unauthorizedError');
const ForbiddenError = require('../../domain/exceptions/forbiddenError');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const config = require('../../config/config');


const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      // Get the token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedError('Authorization header missing.');
      }

      const [authType, token] = authHeader.split(' ');

      if (authType !== 'Bearer' || !token) {
        throw new UnauthorizedError('Invalid token format.');
      }

      // Decode the token and extract the user ID, email, and roles
      const decodedToken = jwt.verify(token, config.jwtSecret);
      //const userId = decodedToken.userId;
      //const email = decodedToken.email;
      const tokenRoles = decodedToken.roles;

      // If there are required roles, check if the user has them
      if (roles.length > 0) {
        const hasRequiredRoles = roles.every((requiredRole) => tokenRoles.includes(requiredRole));
        if (!hasRequiredRoles) {
          throw new ForbiddenError('Permission not granted.');
        }
      }

      // Attach the user ID and email to the request object
      // req.userId = userId;
      // req.email = email;


      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
       error = new UnauthorizedError('Sessioun Timeout');
      }
      next(error);
    }
  };
};

module.exports = authMiddleware;
