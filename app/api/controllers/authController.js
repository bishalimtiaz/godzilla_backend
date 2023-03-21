const UnauthorizedError = require('../../domain/exceptions/unauthorizedError');
const AuthService = require('../../domain/services/authService');
const { UserResponse } = require('../../domain/models/user');
const { RoleResponse } = require('../../domain/models/role');

class AuthController {


  authService = new AuthService();


  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await this.authService.login(email, password);
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
}


module.exports = AuthController;
