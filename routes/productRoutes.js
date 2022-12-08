const express = require("express");
const router = express.Router()
const { getProducts, getProductById, addProduct, deleteProduct } = require("../controller/product.controller");
const { verifyUser, checkAdmin, checkLogin } = require('../middleware/middleware')
const { upload } = require('../utils/upload.function')


router
    .route('/')
    .get(getProducts)
    .post([verifyUser], checkAdmin, checkLogin, upload.single('imageUrl'), addProduct)

router.get("/:id", getProductById);

router.route('/:id').delete([verifyUser], checkAdmin, checkLogin, deleteProduct)


module.exports = router;