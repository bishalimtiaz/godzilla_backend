const AppError = require('./appError');

class ValidationError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 400);
    this.name = 'NotFoundError';
  }
}

module.exports = ValidationError;