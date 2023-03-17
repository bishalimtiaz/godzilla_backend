const { InternalServerError } = require('../../domain/exceptions');

const errorHandlerMiddleware = (error, req, res, next) => {
  if (!error.statusCode) {
    console.error(error);
    error = new InternalServerError('An unexpected error occurred.');
  }
  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandlerMiddleware;