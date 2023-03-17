const { BadRequestError } = require('../../domain/exceptions');

const handleRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map((x) => x.message).join(', ');
      throw new BadRequestError(message);
    }
    return next();
  };
};

module.exports = handleRequest;
