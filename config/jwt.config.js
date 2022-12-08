require('dotenv').config()
const JWT = {
    jwt: process.env.JWT_SECRET || '12345-55555-09876-54321',
    jwtExp: '100d',
}
module.exports = { JWT }