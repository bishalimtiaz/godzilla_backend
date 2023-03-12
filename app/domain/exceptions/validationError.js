const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 400);
  }
}

module.exports = ValidationError;