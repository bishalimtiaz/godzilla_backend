const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

module.exports = {
  loginValidator,
};
