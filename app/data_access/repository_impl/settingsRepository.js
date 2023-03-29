const db = require('../index');
const NotFoundError = require('../../domain/exceptions/notFoundError');

class SettingsRepository {
    async findBackgroundSettingsByBackgroundName(background_name) {
        try {
            const backgroundSettings = await db.Background.findOne({
                where: { background_name },
            });
            return backgroundSettings;

        } catch (error) {
            throw error;
        }
    }

    async findForegroundSettingsByColorScheme(color_scheme) {
        try {
            const foregroundSettings = await db.Foreground.findOne({
                where: { color_scheme },
            });
            return foregroundSettings;
        } catch (error) {
            throw error;
        }
    }


    async findAllBackgroundSettings() {
        try {
            const backgroundSettings = await db.Background.findAll();
            return backgroundSettings;

        } catch (error) {
            throw error;

        }
    }

    async findAllForegroundSettings() {
        try {
            const foregroundSettings = await db.Foreground.findAll();
            return foregroundSettings;

        } catch (error) {
            throw error;

        }
    }

    async createSettings(req){

        try {
            const settings = await db.Settings.create(req);
            return settings;
          } catch (error) {
            throw error;
          }

    }
}

module.exports = SettingsRepository;

