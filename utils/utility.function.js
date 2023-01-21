const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT } = require('../config/jwt.config')

const checkOtp = (otp, hashedOTP) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(otp, hashedOTP, (err, validOTP) => {
            if (err) {
                reject(err)
            }

            resolve(validOTP)
        })
    })
}

const checkPassword = (password, passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                reject(err)
            }

            resolve(same)
        })
    })
}

const newToken = user => {
    return jwt.sign({ id: user._id }, JWT.jwt, {
        expiresIn: JWT.jwtExp,
    })
}

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, JWT.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

module.exports = { checkOtp, checkPassword, newToken, verifyToken }