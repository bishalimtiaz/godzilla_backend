const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const UnauthorizedError = require('../exceptions/unauthorizedError');
const ConflictError = require('../exceptions/conflictError');

const UserRepositoryImpl = require('../../data_access/repository_impl/userRepositoryImpl')
const config = require('../../config/config');

const CardRepositoryImplImpl = require('../../data_access/repository_impl/cardRepositoryImpl');
const EndUserRepositoryImpl = require('../../data_access/repository_impl/endUserRepositoryImpl');





const SALT_ROUNDS = 10;


class AdminService {

  userRepository = new UserRepositoryImpl();



  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    console.log('login_debug', user.user_roles);

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
    const roles = user.user_roles.map((userRole) => userRole.role.name);

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


  cardRepository = new CardRepositoryImplImpl();
  endUserRepository = new EndUserRepositoryImpl();


  async createUser(contactNumber, fullName, address) {
    try {
      // Generate a 6-digit random number as the password

      const endUser = await this.endUserRepository.findEndUserByConatNumber(contactNumber);
      if(endUser){
        throw new ConflictError('User with contact number already exists');
      }

      const password = Math.floor(Math.random() * 900000) + 100000;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);
  
      // Create a new card
      const newCard = await this.cardRepository.createCard();
      

  
      return {
        password: password.toString(),
      };
    } catch (error) {
      throw error;
    }
  }

  




  ///end of class
}


module.exports = AdminService;
