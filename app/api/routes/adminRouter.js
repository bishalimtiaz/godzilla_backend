const express = require('express');
const handleRequest = require('../middlewares/requestHandlerMiddleware');
const { loginValidator } = require('../validators/authValidator');
const AdminController = require('../controllers/adminController')
const Permissions = require('../../config/permission');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const adminController = new AdminController();

router.post('/login', handleRequest(loginValidator), adminController.login.bind(adminController));

router.post('/create-user', authMiddleware([Permissions.SuperAdmin]), adminController.createUser.bind(adminController));

module.exports = router;
