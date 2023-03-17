const AppError = require('./appError');

class BadRequestError extends AppError {
    constructor(message) {
      super(message,400);
      this.name = 'BadRequestError';
    }
  }

  module.exports = BadRequestError;

