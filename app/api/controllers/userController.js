const { NotFoundError, ValidationError } = require('../exceptions');
const { injectable, inject } = require('inversify');
const { UserService } = require('../../domain/services/userService');
const { User } = require('../models/user');
const TYPES = require('../../app/di/types');

@injectable()
class UserController {
  constructor(@inject(TYPES.UserService) userService) {
    this.userService = userService;
  }

  async createUser(req, res, next) {
    try {
      const userRequest = req.body;
      const user = await this.userService.createUser(userRequest);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const userRequest = req.body;
      const updatedUser = await this.userService.updateUser(userId, userRequest);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      await this.userService.deleteUser(userId);
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

module.exports = UserController;
