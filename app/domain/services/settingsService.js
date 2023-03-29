const SettingsRepository = require('../../data_access/repository_impl/settingsRepository');
const NotFoundError = require('../../domain/exceptions/notFoundError');
const ValidationError = require('../../domain/exceptions/validationError');

class SettingsService {

    settingsRespository = new SettingsRepository();

    async findAllBackgroundSettings() {
        return await this.settingsRespository.findAllBackgroundSettings();
    }

    async findAllForegroundSettings() {
        return await this.settingsRespository.findAllForegroundSettings();
    }

}
module.exports = SettingsService;