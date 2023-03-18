const { NotFoundError, ForbiddenError, ValidationError } = require('../exceptions');
const { injectable, inject } = require('inversify');
const { UserRepository } = require('../../domain/repository/userRepository');
const { User, UserRequest, UserResponse, UserUpdateRequest } = require('../models/user');
const TYPES = require('../../app/di/types');

@injectable()
class UserService {
  constructor(@inject(TYPES.UserRepository) userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userRequest) {
    try {
      const roles = await this.userRepository.getRolesByIds(userRequest.roleIds);
      const user = new User(null, userRequest.userName, userRequest.email, userRequest.password, true, roles);
      const createdUser = await this.userRepository.createUser(user);
      return new UserResponse(createdUser.id, createdUser.userName, createdUser.email, createdUser.isActive, createdUser.roles);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ForbiddenError('Email already in use');
      }
      throw error;
    }
  }

  async updateUser(id, userUpdateRequest, currentUser) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError('User not found');
    }
    if (currentUser.id !== existingUser.id && currentUser.role.name !== 'Super Admin') {
      throw new ForbiddenError('You do not have permission to update this user');
    }
    const updates = {};
    if (userUpdateRequest.userName) {
      updates.userName = userUpdateRequest.userName;
    }
    if (userUpdateRequest.email) {
      const existingUserByEmail = await this.userRepository.findByEmail(userUpdateRequest.email);
      if (existingUserByEmail && existingUserByEmail.id !== existingUser.id) {
        throw new ValidationError('Email already in use');
      }
      updates.email = userUpdateRequest.email;
    }
    if (userUpdateRequest.password) {
      updates.password = userUpdateRequest.password;
    }
    if (userUpdateRequest.roleIds) {
      const roles = await this.userRepository.getRolesByIds(userUpdateRequest.roleIds);
      updates.roles = roles;
    }
    const updatedUser = await this.userRepository.updateUser(id, updates);
    return new UserResponse(updatedUser.id, updatedUser.userName, updatedUser.email, updatedUser.isActive, updatedUser.roles);
  }

  async deleteUser(id, currentUser) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError('User not found');
    }
    if (currentUser.id !== existingUser.id && currentUser.role.name !== 'Super Admin') {
      throw new ForbiddenError('You do not have permission to delete this user');
    }
    await this.userRepository.deleteUser(id);
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users.map(user => new UserResponse(user.id, user.userName, user.email, user.isActive, user.roles));
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return new UserResponse(user.id, user.userName, user.email, user.isActive, user.roles);
  }

  async assignUserRole(userId, roleId) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const role = await this.userRepository.getRoleById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    await this.userRepository.assignUserRole(userId, roleId);
  }
  
  async removeUserRole(userId, roleId) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  
    const role = await this.userRepository.getRoleById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found');
    }
  
    const userRole = await this.userRepository.getUserRole(userId, roleId);
    if (!userRole) {
      throw new NotFoundError('User does not have this role assigned');
    }
  
    await this.userRepository.removeUserRole(userId, roleId);
  }
}

module.exports = UserService;
