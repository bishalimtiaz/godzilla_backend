const { Role } = require('../models');
const { NotFoundError } = require('../exceptions');

class RoleRepositoryImpl extends RoleRepository {
  async createRole(role) {
    const createdRole = await Role.create(role);
    return createdRole;
  }

  async getRoleById(roleId) {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new NotFoundError('Role not found.');
    }
    return role;
  }

  async updateRole(roleId, updates) {
    const role = await this.getRoleById(roleId);
    await role.update(updates);
    return role;
  }

  async deleteRole(roleId) {
    const role = await this.getRoleById(roleId);
    await role.destroy();
  }

  async findAll() {
    const roles = await Role.findAll();
    return roles;
  }
}

module.exports = RoleRepositoryImpl;

