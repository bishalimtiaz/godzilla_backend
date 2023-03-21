class EndUserRepository {
    async createEndUser(endUser) {}
    async getEndUserById(endUserId) {}
    async updateEndUser(endUserId, updates) {}
    async deleteEndUser(endUserId) {}
    async findAll() {}
    async findEndUserByConatNumber(contactNumber) {
      throw new Error('Method not implemented.');
    }
  }
  
  module.exports = EndUserRepository;
  