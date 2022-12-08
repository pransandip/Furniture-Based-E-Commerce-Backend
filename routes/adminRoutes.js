const express = require('express')
const router = express.Router()
const { getAdmin } = require('../controller/admin.controller')
const { verifyUser, checkAdmin, checkLogin } = require('../middleware/middleware') 


router
    .route('/')
    .get([verifyUser], checkAdmin, checkLogin, getAdmin)


module.exports = router