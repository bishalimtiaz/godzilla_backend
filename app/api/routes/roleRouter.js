const express = require('express');
const { handleRequest } = require('../middlewares/requestHandlerMiddleware');
const { createRoleValidator, updateRoleValidator } = require('../validators/roleValidator');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermissionMiddleware } = require('../middlewares/checkPermissionMiddleware');
const { RoleController } = require('../controllers/roleController');
const { Permissions } = require('../../config/permission');
const { container } = require('../../app/di/inject');
const { TYPES } = require('../../app/di/types');

const router = express.Router();

const roleController = container.resolve<RoleController>(TYPES.RoleController);

router.post(
  '/',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  handleRequest(createRoleValidator),
  roleController.createRole.bind(roleController),
);

router.get(
  '/',
  checkPermissionMiddleware([Permissions.SuperAdmin, Permissions.Admin]),
  authMiddleware,
  roleController.getAllRoles.bind(roleController),
);

router.get(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin, Permissions.Admin]),
  authMiddleware,
  roleController.getRoleById.bind(roleController),
);

router.put(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  handleRequest(updateRoleValidator),
  roleController.updateRole.bind(roleController),
);

router.delete(
  '/:id',
  checkPermissionMiddleware([Permissions.SuperAdmin]),
  authMiddleware,
  roleController.deleteRole.bind(roleController),
);

module.exports = router;
