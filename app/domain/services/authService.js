const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../exceptions');
const { User } = require('../models/user');
const { UserRepository } = require('../../domain/repository/userRepository');
const { injectable, inject } = require('inversify');
const { TYPES } = require('../../app/di/types');

const SALT_ROUNDS = 10;

@injectable()
class AuthService {
  constructor(@inject(TYPES.UserRepository) userRepository) {
    this.userRepository = userRepository;
  }

  async login(username, password) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedError('Invalid username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid username or password.');
    }

    return new User(user.id, user.username, user.role);
  }

  async register(username, password, role) {
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser) {
      throw new UnauthorizedError('Username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User(null, username, role, hashedPassword);
    const createdUser = await this.userRepository.createUser(user);
    return new User(createdUser.id, createdUser.username, createdUser.role);
  }
}

module.exports = AuthService;
