const RoleRepositoryImpl = require('../repository_impl/RoleRepositoryImpl');
const { NotFoundError } = require('../exceptions');

class RoleService {
  constructor(roleRepository = new RoleRepositoryImpl()) {
    this.roleRepository = roleRepository;
  }

  async createRole(role) {
    const createdRole = await this.roleRepository.createRole(role);
    return createdRole;
  }

  async getRoleById(roleId) {
    const role = await this.roleRepository.getRoleById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found.');
    }
    return role;
  }

  async updateRole(roleId, updates) {
    const updatedRole = await this.roleRepository.updateRole(roleId, updates);
    return updatedRole;
  }

  async deleteRole(roleId) {
    await this.roleRepository.deleteRole(roleId);
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}

module.exports = RoleService;

