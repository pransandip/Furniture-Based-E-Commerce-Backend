const express = require('express')
const router = express.Router()
const { signUpUser, signInUser, logOutUser, getUser } = require('../controller/user.controller')
const {verifyUser, checkLogin} = require('../middleware/middleware')



router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.get('/logout', logOutUser)

router.route('/me').get([verifyUser], checkLogin, getUser)

module.exports = router