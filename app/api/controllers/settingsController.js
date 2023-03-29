const { BackgroundResponse, ForegroundResponse } = require('../../domain/models/settings');
const SettingsService = require('../../domain/services/settingsService');


class SettingsController{
    settingsService = new SettingsService();

    async getBackgroundSettings(req, res, next) {
        try {
          const backgroundSettings = await this.settingsService.findAllBackgroundSettings();
          const response = backgroundSettings.map((background) => new BackgroundResponse(background.id,background.background_name));
          res.json(response);
        } catch (error) {
          next(error);
        }
      }

      async getForegroundSettings(req, res, next) {
        try {
          const foregroundSettings = await this.settingsService.findAllForegroundSettings();
          const response = foregroundSettings.map((foreground) => new ForegroundResponse(foreground.id, foreground.color_scheme));
          res.json(response);
        } catch (error) {
          next(error);
        }
      }
}

module.exports = SettingsController;