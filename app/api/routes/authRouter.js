const express = require('express');
const { handleRequest } = require('../middlewares/requestHandlerMiddleware');
const { loginValidator } = require('../validators/authValidator');
const { authController } = require('../controllers/authController');
const { container } = require('../../app/di/inject');
const { TYPES } = require('../../app/di/types');

const router = express.Router();

const authController = container.resolve(TYPES.AuthController);

router.post('/login', handleRequest(loginValidator), authController.login.bind(authController));

module.exports = router;
