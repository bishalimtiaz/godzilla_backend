const NotFoundError = require('../../domain/exceptions/notFoundError');
const CardRepository = require('../../domain/repository/cardRepository');
const db = require('../index');

class CardRepositoryImpl extends CardRepository {
  async createCard(card) {
    try {
      const createdCard = await db.Card.create(card);
      return createdCard;
    } catch (error) {
      throw error;
    }
  }

  async getCardById(cardId) {
    const card = await db.Card.findByPk(cardId);
    if (!card) {
      throw new NotFoundError('Card not found.');
    }
    return card;
  }

  async updateCard(cardId, updates) {
    try {
      const card = await this.getCardById(cardId);
      await card.update(updates);
      return card;
    } catch (error) {
      throw error;
    }
  }

  async deleteCard(cardId) {
    try {
      const card = await this.getCardById(cardId);
      await card.destroy();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const cards = await db.Card.findAll();
    return cards;
  }
}

module.exports = CardRepositoryImpl;