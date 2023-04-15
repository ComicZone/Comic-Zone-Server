const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const comicRoute = require('./comic.route');
const categoryRoute = require('./category.route');

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/comics', comicRoute);
router.use('/categorys', categoryRoute);

module.exports = router