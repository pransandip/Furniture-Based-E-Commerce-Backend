const User = require('../models/User')
const { verifyToken } = require('../utils/utility.function')

const sendResponseError = (statusCode, msg, res) => {
    res.status(statusCode || 400).send({ message: !!msg ? msg : 'Invalid input !!' })
}

const verifyUser = async (req, res, next) => {
    const { authorization } = req.headers
    console.log('authorization->', authorization)
    if (!authorization) {
        sendResponseError(400, 'You are not authorized', res)
        return
    } else if (!authorization.startsWith('Bearer ')) {
        sendResponseError(400, 'You are not authorized', res)
        return
    }

    try {
        const payload = await verifyToken(authorization.split(' ')[1])
        console.log(payload)
        if (payload) {
            const user = await User.findById(payload.id, { password: 0 })

            req['user'] = user

            next()
        } else {
            sendResponseError(400, `you are not authorizeed`, res)
        }
    } catch (err) {
        console.log('Error ', err)
        sendResponseError(400, `Error ${err}`, res)
    }
}


const checkAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ akg: 0, message: 'Admin Token is not valid.' });
    }
};


const checkLogin = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.status(200).send({ akg: 0, message: 'Please login to view this page!' });
    }
}

module.exports = {
    sendResponseError,
    verifyUser,
    checkAdmin,
    checkLogin,
}
