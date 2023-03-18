const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../domain/exceptions');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Authorization header missing.');
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid token format.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token.');
  }
};

module.exports = authMiddleware;
