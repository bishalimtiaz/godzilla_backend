const NotFoundError = require('../../domain/exceptions/notFoundError');
const ValidationError = require('../../domain/exceptions/validationError');

const  RoleRepositoryImpl = require('../../data_access/repository_impl/roleRepositoryImpl');
const { Role } = require('../models/role');

class RoleService {

  roleRepository = new RoleRepositoryImpl();


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
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}


module.exports = RoleService;
