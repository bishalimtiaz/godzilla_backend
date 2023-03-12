const { NotFoundError, ForbiddenError } = require('../exceptions');
const UserRepositoryImpl = require('../repository_impl/userRepositoryImpl');

class UserService {

    constructor(userRepository = new UserRepositoryImpl()) {
        this.userRepository = userRepository;
    }

  async createUser(user) {
    try {
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new ForbiddenError('Email already in use');
    }
  }

  async updateUser(id, updates, currentUser) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError('User not found');
    }
    if (currentUser.id !== existingUser.id && currentUser.role.name !== 'Super Admin') {
      throw new ForbiddenError('You do not have permission to update this user');
    }
    const updatedUser = await this.userRepository.updateUser(id, updates);
    return updatedUser;
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
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async assignUserRole(userId, roleId) {
    await this.userRepository.assignUserRole(userId, roleId);
  }

  async removeUserRole(userId, roleId) {
    await this.userRepository.removeUserRole(userId, roleId);
  }
}

module.exports = UserService;
