const express = require('express');
const handleRequest  = require('../middlewares/requestHandlerMiddleware');
const ProfileController = require('../controllers/profileController');


const router = express.Router();

const profileController = new ProfileController();


router.get(
    '/basic',
    profileController.getBasicProfile.bind(profileController),
);


module.exports = router;