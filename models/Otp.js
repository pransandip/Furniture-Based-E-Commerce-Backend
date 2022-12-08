const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        otp: {
            type: String,
        },
        createdAt: Date,
        expiresAt: Date,
    },
)

const Otp = mongoose.model('otp', otpSchema)
module.exports = Otp