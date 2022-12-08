const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middleware/middleware')
const { addProductInCart, deleteProductInCart, getCartProducts } = require('../controller/cart.controller')

router
    .route('/')
    .get([verifyUser], getCartProducts)
    .post([verifyUser], addProductInCart)

router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router