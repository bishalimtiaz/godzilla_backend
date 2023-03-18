const express = require('express');
const { handleRequest } = require('../middlewares/requestHandlerMiddleware');
const { createUserValidator, updateUserValidator } = require('../validators/userValidator');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermissionMiddleware } = require('../middlewares/checkPermissionMiddleware');
const { UserController } = require('../controllers/userController');
const { Permissions } = require('../../config/permission');
const { container } = require('../../app/di/inject');
const { TYPES } = require('../../app/di/types');

const router = express.Router();

const userController = container.resolve<UserController>(TYPES.UserController);

router.post(
  '/',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  handleRequest(createUserValidator),
  userController.createUser.bind(userController),
);

router.get(
  '/',
  checkPermissionMiddleware([Permissions.SuperAdmin, Permissions.Admin]),
  authMiddleware,
  userController.getAllUsers.bind(userController),
);

router.get(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin, Permissions.Admin]),
  authMiddleware,
  userController.getUserById.bind(userController),
);

router.put(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  handleRequest(updateUserValidator),
  userController.updateUser.bind(userController),
);

router.delete(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  userController.deleteUser.bind(userController),
);

module.exports = router;