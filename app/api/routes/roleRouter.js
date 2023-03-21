const express = require('express');
const handleRequest  = require('../middlewares/requestHandlerMiddleware');
const { createRoleValidator, updateRoleValidator } = require('../validators/roleValidator');
const authMiddleware = require('../middlewares/authMiddleware');
const RoleController = require('../controllers/roleController');
const Permissions = require('../../config/permission');

const router = express.Router();

const roleController = new RoleController();

router.post(
  '/',

  handleRequest(createRoleValidator),
  roleController.createRole.bind(roleController),
);

router.get(
  '/',
  authMiddleware([Permissions.SuperAdmin, Permissions.Admin]),
  roleController.getAllRoles.bind(roleController),
);

router.get(
  '/:id',
  roleController.getRoleById.bind(roleController),
);

router.put(
  '/:id',
  roleController.updateRole.bind(roleController),
);

router.delete(
  '/:id',
  roleController.deleteRole.bind(roleController),
);

module.exports = router;
