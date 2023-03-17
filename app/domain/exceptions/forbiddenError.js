const AppError = require('./appError');

class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
      super(message, 403);
      this.name = 'ForbiddenError';
    }
  }

  module.exports = ForbiddenError;
  