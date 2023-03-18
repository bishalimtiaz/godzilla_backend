const { UnauthorizedError } = require('../exceptions');
const { AuthService } = require('../../domain/services/authService');
const { injectable, inject } = require('inversify');
const { TYPES } = require('../../app/di/types');

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) authService) {
    this.authService = authService;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.authenticate(email, password);
      if (!token) {
        throw new UnauthorizedError('Invalid email or password.');
      }
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
