
const express = require('express');
const SettingsController = require('../controllers/settingsController');

const settingsController = new SettingsController();

const router = express.Router();


router.get(
    '/background',
    settingsController.getBackgroundSettings.bind(settingsController),
);

router.get(
    '/foreground',
    settingsController.getForegroundSettings.bind(settingsController),
);


module.exports = router;