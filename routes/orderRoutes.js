const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middleware/middleware')
const { getOrderedProducts, createOrder, deleteOrder } = require('../controller/order.controller')

router
    .route('/')
    .get([verifyUser], getOrderedProducts)
    .post([verifyUser], createOrder)

router.route('/:id').delete([verifyUser], deleteOrder)

module.exports = router