const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        totalAmont: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
        },
        paid: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        orderedDate: {
            type: Date
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Order = mongoose.model('order', orderSchema)
module.exports = Order