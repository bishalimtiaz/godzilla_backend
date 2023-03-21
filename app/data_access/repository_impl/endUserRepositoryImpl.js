const NotFoundError = require('../../domain/exceptions/notFoundError');
const EndUserRepository = require('../../domain/repository/endUserRepository');
const db = require('../../data_access/models/index');

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
}

module.exports = EndUserRepositoryImpl;
