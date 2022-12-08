const Cart = require('../models/Cart')
const {sendResponseError} = require('../middleware/middleware')

const getCartProducts = async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.user._id }).populate('productId')
        // console.log(carts)
        res.status(200).send({ status: 'Ok', carts })
    } catch (err) {
        console.log(err)
        sendResponseError(500, `Error with Auth and error is ${err}`, res)
    }
}

const addProductInCart = async (req, res) => {
    const { productId, count } = req.body
    try {
        const cart = await Cart.findOneAndUpdate(
            { productId },
            { productId, count, userId: req.user._id },
            { new: true, upsert: true },
        )

        res.status(201).send({ status: 'Ok', cart })
    } catch (err) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}


const deleteProductInCart = async (req, res) => {
    try {
        console.log(req.params.id)
        await Cart.findByIdAndRemove(req.params.id)
        res.status(200).send({ status: 'Ok' })
    } catch (e) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}

module.exports = { addProductInCart, deleteProductInCart, getCartProducts }