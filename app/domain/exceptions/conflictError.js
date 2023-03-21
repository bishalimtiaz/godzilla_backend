const AppError = require('./appError');

class BadRequestError extends AppError {
    constructor(message) {
      super(message,409);
      this.name = 'ConflictError';
    }
  }

  module.exports = BadRequestError;

