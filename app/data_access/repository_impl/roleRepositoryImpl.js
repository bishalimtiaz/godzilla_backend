const NotFoundError = require('../../domain/exceptions/notFoundError');
const RoleRepository = require('../../domain/repository/roleRepository');
const db = require('../../data_access/index');

class RoleRepositoryImpl extends RoleRepository {
  async createRole(role) {
    try {
      const createdRole = await db.Role.create(role);
      return createdRole;
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(roleId) {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new NotFoundError('Role not found.');
    }
    return role;
  }

  async updateRole(roleId, updates) {
    try {
      const role = await this.getRoleById(roleId);
      await role.update(updates);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(roleId) {
    try {
      const role = await this.getRoleById(roleId);
      await role.destroy();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const roles = await db.Role.findAll();
    return roles;
  }
}

module.exports = RoleRepositoryImpl;
