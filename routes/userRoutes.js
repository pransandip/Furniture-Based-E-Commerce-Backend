const express = require('express')
const router = express.Router()
const { signUpUser, signInUser, logOutUser, getUser } = require('../controller/user.controller')
const { forgotPassword, resetPassword } = require('../controller/passwordReset.controller')
const {verifyUser, checkLogin} = require('../middleware/middleware')



router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.get('/logout', logOutUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.route('/me').get([verifyUser], checkLogin, getUser)

module.exports = router