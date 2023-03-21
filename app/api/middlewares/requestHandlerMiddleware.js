const { validationResult } = require('express-validator');
const UnprocessableEntityError = require('../../domain/exceptions/unprocessableEntityError');

const handleRequest = (validators) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validators.map((validator) => validator.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        throw new UnprocessableEntityError(firstError);

      }
      return next();
        
    } catch (error) {
      next(error);
    }
  };
};

module.exports = handleRequest;
