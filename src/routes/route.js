const { Router } = require('express')
const authRouter = require('./auth.route')
const userRouter = require('./user.route')

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router;