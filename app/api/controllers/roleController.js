
const RoleService = require('../../domain/services/roleService');
const NotFoundError  = require('../../domain/exceptions/notFoundError');
const{RoleResponse} = require('../../domain/models/role')



class RoleController {


  roleService = new RoleService();
  

  async createRole(req, res, next) {
    try {
      const roleRequest = req.body;
      const role = await this.roleService.createRole(roleRequest);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req, res, next) {
    try {
      const roles = await this.roleService.getAllRoles();

      const response = roles.map((userRole) => new RoleResponse(userRole.name,userRole.description));

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req, res, next) {
    try {
      const roleId = req.params.id;
      const role = await this.roleService.getRoleById(roleId);
      res.json(role);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  async updateRole(req, res, next) {
    try {
      const roleId = req.params.id;
      const roleRequest = req.body;
      const updatedRole = await this.roleService.updateRole(roleId, roleRequest);
      res.json(updatedRole);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  async deleteRole(req, res, next) {
    try {
      const roleId = req.params.id;
      await this.roleService.deleteRole(roleId);
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
}

module.exports = RoleController;
