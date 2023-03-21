const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const LoginController = require('../controllers/loginController');

const router = express.Router();


const loginController = new LoginController();


router.post('/', loginController.login.bind(loginController));

module.exports = router;