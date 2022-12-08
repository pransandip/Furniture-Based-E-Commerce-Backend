const User = require('../models/User')
const Order = require('../models/Order')
const Product = require('../models/Product')
const { sendResponseError } = require('../middleware/middleware')

const getAdmin = async (req, res) => {
    const { email, firstName, lastName } = req.user
    try {
        const totalUser = await User.estimatedDocumentCount();
        const totalProduct = await Product.estimatedDocumentCount();
        const totalOrder = await Order.estimatedDocumentCount();
        const totalOrderDelivered = await Order.countDocuments({ isDelivered: true });
        const totalRevenue = await Product.aggregate([{ $group: { _id: null, price: { $sum: "$price" } } }])
        const data = {
            email: email,
            Name: `${firstName} ${lastName}`,
            totalUser: totalUser,
            totalProduct: totalProduct,
            totalOrder: totalOrder,
            totalOrderDelivered: totalOrderDelivered,
            totalRevenue: totalRevenue[0].price,
        }

        res.status(200).send({ status: 'Ok', data })

    } catch (err) {
        console.log(err)
        sendResponseError(500, `Something wrong please try again ${err}`, res)
    }
}

module.exports = { getAdmin }