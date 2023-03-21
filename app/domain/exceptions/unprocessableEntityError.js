const AppError = require('./appError');

class UnprocessableEntityError extends AppError {
    constructor(message = 'UnprocessableEntityError') {
      super(message, 422);
      this.name = "UnprocessableEntityError";
    
    }
  }

  module.exports = UnprocessableEntityError;
  