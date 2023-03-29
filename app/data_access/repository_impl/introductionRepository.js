const db = require('../index');
const NotFoundError = require('../../domain/exceptions/notFoundError');


class IntroductionRepository {

    async createIntroduction() {
        try {
          const introduction = await db.Introduction.create();
          return introduction;
        } catch (error) {
          throw error;
        }
      }

}

module.exports = IntroductionRepository;
