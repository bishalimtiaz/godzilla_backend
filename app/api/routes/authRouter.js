const express = require('express');
const handleRequest = require('../middlewares/requestHandlerMiddleware');
const { loginValidator } = require('../validators/authValidator');
const AuthController = require('../controllers/authController')

const router = express.Router();

const authController = new AuthController();

router.post('/login', handleRequest(loginValidator), authController.login.bind(authController));

module.exports = router;
