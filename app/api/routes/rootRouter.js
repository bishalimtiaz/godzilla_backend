const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');
const infoRouter = require('./infoRouter');
const roleRouter = require('./roleRouter');
const loginRouter = require('./loginRouter');



const express = require('express');
const router = express.Router();


router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/info',infoRouter);
router.use('/role',roleRouter);
router.use('/login',loginRouter);




module.exports = router;