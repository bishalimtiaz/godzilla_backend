
const AppError = require('./appError');

class UnauthorizedError extends AppError {
    constructor(message) {
      super(message,401);
      this.name = 'UnauthorizedError';
    }
}

module.exports = UnauthorizedError;