const { body, param } = require('express-validator');

const createRoleValidator = [
  body('name').notEmpty().withMessage('Role name cannot be empty.'),
  body('description').notEmpty().withMessage('Role description cannot be empty.'),
];

const updateRoleValidator = [
  param('id').isInt().withMessage('Invalid role ID.'),
  ...createRoleValidator,
];

module.exports = { createRoleValidator, updateRoleValidator };
