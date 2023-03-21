const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const UnauthorizedError = require('../exceptions/unauthorizedError');
const ConflictError = require('../exceptions/conflictError');

const UserRepositoryImpl = require('../../data_access/repository_impl/userRepositoryImpl')
const config = require('../../config/config');

const portfolioCategoryRepositoryImpl = require('../../data_access/repository_impl/portfolioCategoryRepositoryImpl');
const CardRepositoryImplImpl = require('../../data_access/repository_impl/cardRepositoryImpl');
const DefaultPortfolioRepositoryImpl = require('../../data_access/repository_impl/defaultPortfolioRepositoryImpl');
const EndUserRepositoryImpl = require('../../data_access/repository_impl/endUserRepositoryImpl');
const PortfolioRepositoryImpl = require('../../data_access/repository_impl/portfolioRepositoryImpl');;





const SALT_ROUNDS = 10;


class AdminService {

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


  portfolioCategoryRepository = new portfolioCategoryRepositoryImpl();
  cardRepository = new CardRepositoryImplImpl();
  defaultPortfolioRepository = new DefaultPortfolioRepositoryImpl();
  endUserRepository = new EndUserRepositoryImpl();
  portfolioRepository = new PortfolioRepositoryImpl();


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
  
      // Get the default portfolio category
      const defaultPortfolioCategory = await this.portfolioCategoryRepository.getPortfolioCategoryByName(
        'default'
      );
  
      if (!defaultPortfolioCategory) {
        throw new Error('Default portfolio category not found.');
      }
  
      // Create a new default portfolio
      const newDefaultPortfolio = await this.defaultPortfolioRepository.createDefaultPortfolio({
        full_name: fullName,
        address: address,
        portfolioCategoryId: defaultPortfolioCategory.id,
      });
  
      // Create a new end user with the card reference and default portfolio category
      const newEndUser = await this.endUserRepository.createEndUser({
        contact_number: contactNumber,
        selected_card_id: newCard.id,
        selected_portfolio_category_id: defaultPortfolioCategory.id, // set the selected_portfolio_category_id to defaultPortfolioCategory.id
        password: hashedPassword,
      });

      console.log('end_debug:', newEndUser.id);
  
      // Create a new portfolio for the end user and default portfolio
      await this.portfolioRepository.createPortfolio({
        id: uuid.v4(),
        end_user_id: newEndUser.id, // set the end_user_id value
        default_portfolio_id: newDefaultPortfolio.id,
      });
  
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
