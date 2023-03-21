const UnauthorizedError = require('../../domain/exceptions/unauthorizedError');
const AdminService = require('../../domain/services/adminService');
const { UserResponse } = require('../../domain/models/user');
const { RoleResponse } = require('../../domain/models/role');

class AdminController {


  adminService = new AdminService();


  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await this.adminService.login(email, password);
      const user = response.user


      response.user = new UserResponse(
        user.id, user.username, 
        user.email, 
        user.isActive, 
        user.userRoles.map((userRole) => new RoleResponse(userRole.role.name,userRole.role.description)));

      res.json(response);

    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { contactNumber, fullName, address } = req.body;

      const response = await this.adminService.createUser(contactNumber, fullName, address);

      res.json(response);

    } catch (error) {
      next(error);
    }
  }

}



module.exports = AdminController;
