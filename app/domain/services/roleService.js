const { NotFoundError, ValidationError } = require('../exceptions');
const { injectable, inject } = require('inversify');
const { RoleRepository } = require('../../domain/repository/roleRepository');
const { Role } = require('../models/role');
const TYPES = require('../../app/di/types');

@injectable()
class RoleService {
  constructor(@inject(TYPES.RoleRepository) roleRepository) {
    this.roleRepository = roleRepository;
  }

  async createRole(roleRequest) {
    const role = new Role(null, roleRequest.name, roleRequest.description);
    const createdRole = await this.roleRepository.createRole(role);
    return new Role(createdRole.id, createdRole.name, createdRole.description);
  }

  async getRoleById(roleId) {
    const role = await this.roleRepository.getRoleById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found.');
    }
    return new Role(role.id, role.name, role.description);
  }

  async updateRole(roleId, roleRequest) {
    const updates = {};
    if (roleRequest.name) {
      updates.name = roleRequest.name;
    }
    if (roleRequest.description) {
      updates.description = roleRequest.description;
    }
    const updatedRole = await this.roleRepository.updateRole(roleId, updates);
    return new Role(updatedRole.id, updatedRole.name, updatedRole.description);
  }

  async deleteRole(roleId) {
    await this.roleRepository.deleteRole(roleId);
  }

  async getAllRoles() {
    const roles = await this.roleRepository.getAllRoles();
    return roles.map(role => new Role(role.id, role.name, role.description));
  }
}

module.exports = RoleService;
