const { body } = require('express-validator');

const createUserValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
];

const updateUserValidator = [
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').optional().isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
  body('lastName').optional().isLength({ max: 50 }).withMessage('Last name must be less than 50 characters'),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
};
