const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middleware/middleware')
const { sendOTPVerificationEmail, verifyOtp } = require('../controller/otp.controller')

router
    .route('/sendOTP')
    .post([verifyUser], sendOTPVerificationEmail)

router
    .route('/verifyOTP')
    .post([verifyUser], verifyOtp)


module.exports = router