const express = require('express');
const handleRequest  = require('../middlewares/requestHandlerMiddleware');
const { createUserValidator, updateUserValidator } = require('../validators/userValidator');
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');
const Permissions = require('../../config/permission');

const router = express.Router();

const userController = new UserController();

router.post(
  '/',
  userController.createUser.bind(userController),
);

router.get(
  '/',
  userController.getAllUsers.bind(userController),
);

router.get(
  '/:id',
  userController.getUserById.bind(userController),
);

router.put(
  '/:id',
  userController.updateUser.bind(userController),
);

router.delete(
  '/:id',
  userController.deleteUser.bind(userController),
);

module.exports = router;
