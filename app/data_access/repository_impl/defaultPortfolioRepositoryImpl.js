const NotFoundError = require('../../domain/exceptions/notFoundError');
const DefaultPortfolioRepository = require('../../domain/repository/defaultPortfolioRepository');
const db = require('../../data_access/models/index');

class DefaultPortfolioRepositoryImpl extends DefaultPortfolioRepository {
  async createDefaultPortfolio(defaultPortfolio) {
    try {
      const createdDefaultPortfolio = await db.DefaultPortfolio.create(defaultPortfolio);
      return createdDefaultPortfolio;
    } catch (error) {
      throw error;
    }
  }

  async getDefaultPortfolioById(defaultPortfolioId) {
    const defaultPortfolio = await db.DefaultPortfolio.findByPk(defaultPortfolioId);
    if (!defaultPortfolio) {
      throw new NotFoundError('Default portfolio not found.');
    }
    return defaultPortfolio;
  }

  async updateDefaultPortfolio(defaultPortfolioId, updates) {
    try {
      const defaultPortfolio = await this.getDefaultPortfolioById(defaultPortfolioId);
      await defaultPortfolio.update(updates);
      return defaultPortfolio;
    } catch (error) {
      throw error;
    }
  }

  async deleteDefaultPortfolio(defaultPortfolioId) {
    try {
      const defaultPortfolio = await this.getDefaultPortfolioById(defaultPortfolioId);
      await defaultPortfolio.destroy();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const defaultPortfolios = await db.DefaultPortfolio.findAll();
    return defaultPortfolios;
  }
}

module.exports = DefaultPortfolioRepositoryImpl;

