const AppError = require('./appError');

class InternalServerError extends AppError {
    constructor(message) {
      super(message,500);
      this.name = 'InternalServerError';
    }
}

module.exports = InternalServerError;