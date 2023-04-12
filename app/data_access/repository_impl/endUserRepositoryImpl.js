const NotFoundError = require('../../domain/exceptions/notFoundError');
const EndUserRepository = require('../../domain/repository/endUserRepository');
const db = require('..//index');

class EndUserRepositoryImpl extends EndUserRepository {
  async createEndUser(endUser) {
    try {
      const createdEndUser = await db.EndUser.create(endUser);
      return createdEndUser;
    } catch (error) {
      throw error;
    }
  }

  async getEndUserById(endUserId) {
    const endUser = await db.EndUser.findByPk(endUserId, {
      include: {
        model: db.Portfolio,
        include: {
          model: db.DefaultPortfolio,
          include: {
            model: db.PortfolioCategory,
          },
        },
      },
    });
    if (!endUser) {
      throw new NotFoundError('End user not found.');
    }
    return endUser;
  }

  async updateEndUser(endUserId, updates) {
    try {
      const endUser = await this.getEndUserById(endUserId);
      await endUser.update(updates);
      return endUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteEndUser(endUserId) {
    try {
      const endUser = await this.getEndUserById(endUserId);
      await endUser.destroy();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const endUsers = await db.EndUser.findAll({
      include: {
        model: db.Portfolio,
        include: {
          model: db.DefaultPortfolio,
          include: {
            model: db.PortfolioCategory,
          },
        },
      },
    });
    return endUsers;
  }

  async findEndUserByConatNumber(contact_number) {
    const endUser = await db.EndUser.findOne({ where: { contact_number: contact_number } });
    return endUser;
  }

  async getBasicProfileDetails(end_user_id) {
    try {
      const endUser = await db.EndUser.findOne({
        where: { id: end_user_id },
        include: [
          {
            model: db.Introduction,
            attributes: ['profession', 'profile_image', 'description'],
          },
          {
            model: db.UserSocialNetworks,
            include: {
              model: db.SocialNetwork,
              attributes: ['sn_name', 'sn_logo', 'base_url'],
            },
          },
        ],
      });
      return endUser;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = EndUserRepositoryImpl;
