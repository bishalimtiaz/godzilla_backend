const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter.js');
const infoRouter = require('./infoRouter.js');
const roleRouter = require('./roleRouter.js');


const express = require('express');
const router = express.Router();


router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/info',infoRouter);
router.use('/role',roleRouter);



module.exports = router;