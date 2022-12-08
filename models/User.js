const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        firstName: String,
        lastName: String,
        phone: String,
    },
    {
        timestamps: true,
    },
)

const User = mongoose.model('user', userSchema)
module.exports = User