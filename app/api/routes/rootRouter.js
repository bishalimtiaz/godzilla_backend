const authRouter = require('./authRouter.js');
const userRouter = require('./userRouter.js');
const infoRouter = require('./infoRouter.js');

const express = require('express');
const router = express.Router();


router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/info',infoRouter);


module.exports = router;