class UserRepository {
    async createUser(user) {
      throw new NotImplementedError('createUser');
    }
  
    async getUserById(userId) {
      throw new NotImplementedError('getUserById');
    }
  
    async updateUser(userId, updates) {
      throw new NotImplementedError('updateUser');
    }
  
    async deleteUser(userId) {
      throw new NotImplementedError('deleteUser');
    }
  
    async assignUserRole(userId, roleId) {
      throw new NotImplementedError('assignUserRole');
    }
  
    async removeUserRole(userId, roleId) {
      throw new NotImplementedError('removeUserRole');
    }
  
    async findByEmail(email) {
      throw new NotImplementedError('findByEmail');
    }
  
    async findAll() {
      throw new NotImplementedError('findAll');
    }
  }
  
  module.exports = UserRepository;
  