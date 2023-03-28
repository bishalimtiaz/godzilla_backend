const NotFoundError = require('../../domain/exceptions/notFoundError');
const PortfolioCategoryRepository = require('../../domain/repository/portfolioCategoryRepository');
const db = require('../index');

class PortfolioCategoryRepositoryImpl extends PortfolioCategoryRepository {
  async createPortfolioCategory(portfolioCategory) {
    try {
      const createdPortfolioCategory = await db.PortfolioCategory.create(portfolioCategory);
      return createdPortfolioCategory;
    } catch (error) {
      throw error;
    }
  }

  async getPortfolioCategoryById(portfolioCategoryId) {
    const portfolioCategory = await db.PortfolioCategory.findByPk(portfolioCategoryId);
    if (!portfolioCategory) {
      throw new NotFoundError('Portfolio category not found.');
    }
    return portfolioCategory;
  }

  async updatePortfolioCategory(portfolioCategoryId, updates) {
    try {
      const portfolioCategory = await this.getPortfolioCategoryById(portfolioCategoryId);
      await portfolioCategory.update(updates);
      return portfolioCategory;
    } catch (error) {
      throw error;
    }
  }

  async deletePortfolioCategory(portfolioCategoryId) {
    try {
      const portfolioCategory = await this.getPortfolioCategoryById(portfolioCategoryId);
      await portfolioCategory.destroy();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const portfolioCategories = await db.PortfolioCategory.findAll();
    return portfolioCategories;
  }

  async getPortfolioCategoryByName(name) {
    const portfolioCategory = await db.PortfolioCategory.findOne({
      where: {
        name: name,
      },
    });
    if (!portfolioCategory) {
      throw new NotFoundError(`Portfolio category with name ${name} not found.`);
    }
    return portfolioCategory;
  }
}

module.exports = PortfolioCategoryRepositoryImpl;