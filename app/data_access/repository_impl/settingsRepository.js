const db = require('../index');
const NotFoundError = require('../../domain/exceptions/notFoundError');

class SettingsRepository {
    // async createRole(role) {
    //   throw new NotImplementedError('createRole');
    // }

    // async getRoleById(roleId) {
    //   throw new NotImplementedError('getRoleById');
    // }

    // async updateRole(roleId, updates) {
    //   throw new NotImplementedError('updateRole');
    // }

    // async deleteRole(roleId) {
    //   throw new NotImplementedError('deleteRole');
    // }

    // async findAll() {
    //   throw new NotImplementedError('findAll');
    // }

    async findAllBackgroundSettings() {
        const backgroundSettings = await db.Background.findAll();
        return backgroundSettings;
    }

    async findAllForegroundSettings() {
        const foregroundSettings = await db.Foreground.findAll();
        return foregroundSettings;
    }
}

module.exports = SettingsRepository;

