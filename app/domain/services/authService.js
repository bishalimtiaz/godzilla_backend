const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../../domain/exceptions/unauthorizedError');
const UserRepositoryImpl = require('../../data_access/repository_impl/userRepositoryImpl')
const config = require('../../config/config');

const SALT_ROUNDS = 10;


class AuthService {

  userRepository = new UserRepositoryImpl();



  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    console.log('login_debug', user.userRoles);

    if (!user) {
      console.log('login_debug', 'user null');
      throw new UnauthorizedError('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('login_debug', 'invalid password');
      throw new UnauthorizedError('Invalid email or password.');
    }

    // Get the roles associated with the user
    const roles = user.userRoles.map((userRole) => userRole.role.name);

    // Create a JWT token with the user ID and email as the payload
    const token = jwt.sign(
      { userId: user.id, email: user.email, roles: roles }, 
      config.jwtSecret, 
      {
      expiresIn: '1h',
    }
    );

    return {
      token: token,
      user: user,
    };
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
