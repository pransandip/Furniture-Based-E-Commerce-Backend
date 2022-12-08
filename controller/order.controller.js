const Order = require('../models/Order')
const { sendResponseError } = require('../middleware/middleware')

const getOrderedProducts = async (req, res) => {
    try {
        const order = await Order.find({ userId: req.user._id }).populate('productId').populate('userId')
        const orders = [...order, order[0].userId.password='']
        res.status(200).send({ status: 'Ok', orders })
    } catch (err) {
        console.log(err)
        sendResponseError(500, `Error with Auth or error is ${err}`, res)
    }
}

const createOrder = async (req, res) => {
    const { productId } = req.body
    try {
        const newOrder = await Order.findOneAndUpdate(
            { productId },
            { ...req.body, userId: req.user._id },
            { new: true, upsert: true },
        )

        res.status(201).send({ status: 'Ok', newOrder })
    } catch (err) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}

const deleteOrder = async (req, res) => {
    try {
        console.log(req.params.id)
        await Order.findByIdAndRemove(req.params.id)
        res.status(200).send({ status: 'Ok' })
    } catch (e) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}

module.exports = { getOrderedProducts, createOrder, deleteOrder}