const NotFoundError = require('../../domain/exceptions/notFoundError');
const PortfolioRepository = require('../../domain/repository/portfolioRepository');
const db = require('../index');

class PortfolioRepositoryImpl extends PortfolioRepository {
    async createPortfolio(portfolio) {
        try {
            const createdPortfolio = await db.Portfolio.create(portfolio);
            return createdPortfolio;
        } catch (error) {
            throw error;
        }
    }

    async getPortfolioById(portfolioId) {
        const portfolio = await db.Portfolio.findByPk(portfolioId, {
            include: [
                {
                    model: db.EndUser,
                    include: [
                        {
                            model: db.Card,
                        },
                        {
                            model: db.PortfolioCategory,
                        },
                    ],
                },
                {
                    model: db.DefaultPortfolio,
                },
            ],
        });
        if (!portfolio) {
            throw new NotFoundError('Portfolio not found.');
        }
        return portfolio;
    }

    async updatePortfolio(portfolioId, updates) {
        try {
            const portfolio = await this.getPortfolioById(portfolioId);
            await portfolio.update(updates);
            return portfolio;
        } catch (error) {
            throw error;
        }
    }

    async deletePortfolio(portfolioId) {
        try {
            const portfolio = await this.getPortfolioById(portfolioId);
            await portfolio.destroy();
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        const portfolios = await db.Portfolio.findAll({
            include: [
                {
                    model: db.EndUser,
                    include: [
                        {
                            model: db.Card,
                        },
                        {
                            model: db.PortfolioCategory,
                        },
                    ],
                },
                {
                    model: db.DefaultPortfolio,
                },
            ],
        });
        return portfolios;
    }
}

module.exports = PortfolioRepositoryImpl;
