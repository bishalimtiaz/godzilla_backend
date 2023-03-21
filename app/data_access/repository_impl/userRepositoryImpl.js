const User = require('../../data_access/entities/user');
const UserRole = require('../../data_access/entities/userRole');
const Role = require('../../data_access/entities/role');

const NotFoundError = require('../../domain/exceptions/notFoundError');
const ValidationError = require('../../domain/exceptions/validationError');

const UserRepository = require('../../domain/repository/userRepository');
const db = require('../../data_access/index');


class UserRepositoryImpl extends UserRepository {
  async createUser(user) {
    try {
      const createdUser = await db.User.create(user);
      return createdUser;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ValidationError('Email already exists.');
      }
      throw error;
    }
  }

  async getUserById(userId) {
    const user = await db.User.findByPk(userId, {
      include: [
        {
          model: UserRole,
          include: [{ model: Role }],
          attributes: [],
        },
      ],
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const roles = user.UserRoles.map((userRole) => {
      return {
        id: userRole.Role.id,
        name: userRole.Role.name,
        description: userRole.Role.description,
      };
    });

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      isActive: user.isActive,
      roles: roles,
    };
  }

  async updateUser(userId, updates) {
    const user = await this.getUserById(userId);
    await user.update(updates);
    return user;
  }

  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    await user.destroy();
  }

  async assignUserRole(userId, roleId) {
    const user = await this.getUserById(userId);
    await user.addRole(roleId);
  }

  async removeUserRole(userId, roleId) {
    const user = await this.getUserById(userId);
    await user.removeRole(roleId);
  }

  async findByEmail(email) {
    const user = await User.findOne({ 
      where: { email } ,
      include: [
        {
          model: UserRole,
          include: [{ model: Role }],
        },
      ],
    });
    console.log('login_debug: user: ', user);
    return user;
  }

  async findAll() {
    const users = await db.User.findAll({
      include: [
        {
          model: UserRole,
          include: [{ model: Role }],
          attributes: [],
        },
      ],
      attributes: { exclude: ['password'] },
    });

    const result = users.map((user) => {
      const roles = user.UserRoles.map((userRole) => {
        return {
          id: userRole.Role.id,
          name: userRole.Role.name,
          description: userRole.Role.description,
        };
      });

      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        isActive: user.isActive,
        roles: roles,
      };
    });

    return result;
  }
}


module.exports = UserRepositoryImpl;
