const NotFoundError = require('../../domain/exceptions/notFoundError');
const db = require('../../data_access/index');

class PublicProfileRespository {

  async createPublicProfile(publicProfile) {
    try {
      const createdPublicProfile = await db.PublicProfile.create(publicProfile);
      return createdPublicProfile;
    } catch (error) {
      throw error;
    }
  }

  async findPublicProfileByUserId(end_user_id) {
    const publicProfile = await db.PublicProfile.findOne({ where: { end_user_id: end_user_id } });
    return publicProfile;
  }

  async findPublicProfileById(id) {
    const publicProfile = await db.PublicProfile.findOne({ where: { id: id } });
    return publicProfile;
  }
}

module.exports = PublicProfileRespository;
