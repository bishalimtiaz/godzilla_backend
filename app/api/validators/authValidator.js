const { body, check } = require('express-validator');


const loginValidator = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

module.exports = {
  loginValidator,
};
