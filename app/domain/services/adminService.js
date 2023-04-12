const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const UnauthorizedError = require('../exceptions/unauthorizedError');
const ConflictError = require('../exceptions/conflictError');

const UserRepositoryImpl = require('../../data_access/repository_impl/userRepositoryImpl')
const config = require('../../config/config');

const CardRepositoryImplImpl = require('../../data_access/repository_impl/cardRepositoryImpl');
const EndUserRepositoryImpl = require('../../data_access/repository_impl/endUserRepositoryImpl');
const SettingsRepository = require('../../data_access/repository_impl/settingsRepository');
const BackgroundSettings = require('../../utils/backgroundSettings');
const ForegroundSettings = require('../../utils/foregroundSettings');
const NotFoundError = require('../exceptions/notFoundError');
const IntroductionRepository = require('../../data_access/repository_impl/introductionRepository');
const PublicProfileRespository = require('../../data_access/repository_impl/publicProfileRepository');







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
  settingsRepository = new SettingsRepository();
  introductionRepository = new IntroductionRepository();
  publicProfileRepository = new PublicProfileRespository();


  async createUser(contact_number, full_name, address) {
    try {
      // Generate a 6-digit random number as the password

      const endUser = await this.endUserRepository.findEndUserByConatNumber(contact_number);
      if (endUser) {
        throw new ConflictError('User with contact number already exists');
      }

      const password = Math.floor(Math.random() * 900000) + 100000;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);


      //Get default background and foreground settings
      const background = await this.settingsRepository.findBackgroundSettingsByBackgroundName(BackgroundSettings.Default);
      const foreground = await this.settingsRepository.findForegroundSettingsByColorScheme(ForegroundSettings.Default);

      if (!background) {
        throw NotFoundError('Default Background Settings Not Found');
      }
      if (!foreground) {
        throw NotFoundError('Default Foreground Settings Not Found');
      }

      //Create New Settings.

      const newSettings = await this.settingsRepository.createSettings(
        {
          id: uuid.v4(),
          background_id: background.id,
          foreground_id: foreground.id,
        }
      );


      // Create a new card
      const newCard = await this.cardRepository.createCard();

      //create newIntroduction

      const newIntroduction = await this.introductionRepository.createIntroduction();

      //create new User

      const newUser = await this.endUserRepository.createEndUser(
        {
          id: uuid.v4(),
          contact_number: contact_number,
          name: full_name,
          password: hashedPassword,
          address: address,
          settings_id: newSettings.id,
          introduction_id: newIntroduction.id,
          card_id: newCard.id,
        }
      );

      const hyphenatedStr = full_name.toLowerCase().replace(/\s+/g, '-');

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);

      // Hash the phone number using bcrypt and the salt
    
      const hash = bcrypt.hashSync(contact_number + salt, SALT_ROUNDS);

      const profileUrl = hyphenatedStr + '-' + hash.slice(0, 8);

      const publicProfile = await this.publicProfileRepository.createPublicProfile(

        {
          id: uuid.v4(),
          public_url: profileUrl,
          end_user_id: newUser.id,
        }
      );

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
