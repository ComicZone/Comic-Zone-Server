const { Router } = require('express')
const { signup, login } = require('../controllers/auth.signin') 
const logout = require('../controllers/auth.signout') 
const { validateUserInputsToCreate } = require('../middlewares/validation')

const router = Router()

router.post('/login', login)

router.post('/signup', validateUserInputsToCreate, signup)

router.post('/logout', logout)

module.exports = router;